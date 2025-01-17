/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */
import commander from "commander";
import { v4 as uuid } from "uuid";

import { AzureClient } from "@fluidframework/azure-client";
import { SharedMap } from "@fluidframework/map";
import { PerformanceEvent } from "@fluidframework/telemetry-utils";
import { timeoutPromise } from "@fluidframework/test-utils";

import { ContainerFactorySchema } from "./interface";
import { getLogger } from "./logger";
import { createAzureClient, delay, loadInitialObjSchema } from "./utils";

const eventMap = new Map([
	[
		"fluid:telemetry:RouterliciousDriver:FetchOrdererToken",
		"scenario:runner:DocLoader:Load:FetchOrdererToken",
	],
	[
		"fluid:telemetry:RouterliciousDriver:DiscoverSession",
		"scenario:runner:DocLoader:Load:DiscoverSession",
	],
	[
		"fluid:telemetry:RouterliciousDriver:FetchStorageToken",
		"scenario:runner:DocLoader:Load:FetchStorageToken",
	],
	[
		"fluid:telemetry:RouterliciousDriver:getWholeFlatSummary",
		"scenario:runner:DocLoader:Load:GetSummary",
	],
	["fluid:telemetry:RouterliciousDriver:GetDeltas", "scenario:runner:DocLoader:Load:GetDeltas"],
	["fluid:telemetry:Container:Request", "scenario:runner:DocLoader:Load:RequestDataObject"],
	[
		"fluid:telemetry:RouterliciousDriver:GetDeltaStreamToken",
		"scenario:runner:DocLoader:Connection:GetDeltaStreamToken",
	],
	[
		"fluid:telemetry:RouterliciousDriver:ConnectToDeltaStream",
		"scenario:runner:DocLoader:Connection:ConnectToDeltaStream",
	],
	[
		"fluid:telemetry:Container:ConnectionStateChange",
		"scenario:runner:DocLoader:Connection:ConnectionStateChange",
	],
]);

export interface MapTrafficRunnerConfig {
	runId: string;
	scenarioName: string;
	childId: number;
	docId: string;
	writeRatePerMin: number;
	totalWriteCount: number;
	sharedMapKey: string;
	connType: string;
	connEndpoint: string;
	region?: string;
}

async function main() {
	const parseIntArg = (value: any): number => {
		if (isNaN(parseInt(value, 10))) {
			throw new commander.InvalidArgumentError("Not a number.");
		}
		return parseInt(value, 10);
	};
	commander
		.version("0.0.1")
		.requiredOption("-d, --docId <docId>", "Document ID to target")
		.requiredOption("-s, --schema <schema>", "Container Schema")
		.requiredOption("-r, --runId <runId>", "orchestrator run id.")
		.requiredOption("-s, --scenarioName <scenarioName>", "scenario name.")
		.requiredOption("-c, --childId <childId>", "id of this node client.", parseIntArg)
		.requiredOption("-wr, --writeRatePerMin <writeRatePerMin>", "Rate of writes", parseIntArg)
		.requiredOption(
			"-wc, --totalWriteCount <totalWriteCount>",
			"Total write count",
			parseIntArg,
		)
		.requiredOption("-k, --sharedMapKey <sharedMapKey>", "Shared map location")
		.requiredOption("-ct, --connType <connType>", "Connection type")
		.option("-ce, --connEndpoint <connEndpoint>", "Connection endpoint")
		.option("-ti, --tenantId <tenantId>", "Tenant ID")
		.option("-tk, --tenantKey <tenantKey>", "Tenant Key")
		.option("-furl, --functionUrl <functionUrl>", "Azure Function URL")
		.option("-st, --secureTokenProvider", "Enable use of secure token provider")
		.option("-rg, --region <region>", "Alias of Azure region where the tenant is running from")
		.option(
			"-l, --log <filter>",
			"Filter debug logging. If not provided, uses DEBUG env variable.",
		)
		.requiredOption("-v, --verbose", "Enables verbose logging")
		.parse(process.argv);

	const config = {
		runId: commander.runId,
		scenarioName: commander.scenarioName,
		childId: commander.childId,
		docId: commander.docId,
		writeRatePerMin: commander.writeRatePerMin,
		totalWriteCount: commander.totalWriteCount,
		sharedMapKey: commander.sharedMapKey,
		connType: commander.connType,
		connEndpoint: commander.connEndpoint ?? process.env.azure__fluid__relay__service__endpoint,
		tenantId: commander.tenantId ?? process.env.azure__fluid__relay__service__tenantId,
		tenantKey: commander.tenantKey ?? process.env.azure__fluid__relay__service__tenantKey,
		functionUrl:
			commander.functionUrl ?? process.env.azure__fluid__relay__service__function__url,
		secureTokenProvider: commander.secureTokenProvider,
		region: commander.region ?? process.env.azure__fluid__relay__service__region,
	};

	if (commander.log !== undefined) {
		process.env.DEBUG = commander.log;
	}

	if (config.docId === undefined) {
		console.error("Missing --docId argument needed to run child process");
		process.exit(-1);
	}

	const logger = await getLogger(
		{
			runId: config.runId,
			scenarioName: config.scenarioName,
			endpoint: config.connEndpoint,
			region: config.region,
		},
		["scenario:runner"],
		eventMap,
	);

	const ac = await createAzureClient({
		userId: "testUserId",
		userName: "testUserName",
		connType: config.connType,
		connEndpoint: config.connEndpoint,
		tenantId: config.tenantId,
		tenantKey: config.tenantKey,
		functionUrl: config.functionUrl,
		secureTokenProvider: config.secureTokenProvider,
		logger,
	});

	await execRun(ac, config);
	process.exit(0);
}

async function execRun(ac: AzureClient, config: MapTrafficRunnerConfig): Promise<void> {
	const msBetweenWrites = 60000 / config.writeRatePerMin;
	const logger = await getLogger(
		{
			runId: config.runId,
			scenarioName: config.scenarioName,
			namespace: "scenario:runner:MapTraffic",
			endpoint: config.connEndpoint,
			region: config.region,
		},
		["scenario:runner"],
		eventMap,
	);

	const s = loadInitialObjSchema(JSON.parse(commander.schema) as ContainerFactorySchema);
	const { container } = await PerformanceEvent.timedExecAsync(
		logger,
		{ eventName: "ContainerLoad", clientId: config.childId },
		async (_event) => {
			return ac.getContainer(config.docId, s);
		},
		{ start: true, end: true, cancel: "generic" },
	);

	const initialObjectsCreate = container.initialObjects;
	const map = initialObjectsCreate[config.sharedMapKey] as SharedMap;

	for (let i = 0; i < config.totalWriteCount; i++) {
		await delay(msBetweenWrites);
		// console.log(`Simulating write ${i} for client ${config.runId}`)
		map.set(uuid(), "test-value");
	}

	await PerformanceEvent.timedExecAsync(
		logger,
		{ eventName: "Catchup", clientId: config.childId },
		async (_event) => {
			await timeoutPromise((resolve) => container.once("saved", () => resolve()), {
				durationMs: 20000,
				errorMsg: "datastoreSaveAfterAttach timeout",
			});
		},
		{ start: true, end: true, cancel: "generic" },
	);
}

main().catch((error) => {
	console.error(error);
	process.exit(-1);
});
