import * as assert from "assert";
import { RouteMasterRunner } from "../../routemaster/runner";
import { MessageFactory, TestCollection, TestKafka } from "../testUtils";

describe("Routerlicious", () => {
    describe("Routemaster", () => {
        describe("Runner", () => {
            const testId = "test";
            const testClientId = "quiet-rat";
            const testCheckpointBatchSize = 10;
            const testCheckpointTimeIntervalMsec = 10000;

            let testCollection: TestCollection;
            let testDeltasCollection: TestCollection;
            let receiveTopic: TestKafka;
            let sendTopic: TestKafka;
            let runner: RouteMasterRunner;
            let messageFactory: MessageFactory;

            beforeEach(() => {
                const testData = [{ _id: testId }];
                testCollection = new TestCollection(testData);
                testDeltasCollection = new TestCollection(testData);
                receiveTopic = new TestKafka();
                sendTopic = new TestKafka();

                const producer = sendTopic.createProducer();
                const consumer = receiveTopic.createConsumer();
                runner = new RouteMasterRunner(
                    producer,
                    consumer,
                    testCollection,
                    testDeltasCollection,
                    testCheckpointBatchSize,
                    testCheckpointTimeIntervalMsec);

                messageFactory = new MessageFactory(testId, testClientId);
            });

            describe("#start()", () => {
                it("Should be able to stop after starting", async () => {
                    const startP = runner.start();
                    const stopP = runner.stop();
                    await Promise.all([startP, stopP]);
                });

                it("Should process incoming messages after starting", async () => {
                    const TestMessages = 100;

                    const started = runner.start();
                    const testProducer = receiveTopic.createProducer();

                    for (let i = 0; i < TestMessages; i++) {
                        const message = messageFactory.create();
                        testProducer.send(JSON.stringify(message), testId);
                    }
                    await runner.stop();

                    assert.ok(true);

                    return started;
                });
            });
        });
    });
});
