{
  "title": "@fluidframework/aqueduct Package",
  "summary": "The `aqueduct` package is a library for building Fluid objects and Fluid containers within the Fluid Framework. Its goal is to provide a thin base layer over the existing Fluid Framework interfaces that allows developers to get started quickly.",
  "kind": "Package",
  "members": {
    "Class": {
      "BaseContainerRuntimeFactory": "/docs/apis/aqueduct/basecontainerruntimefactory-class",
      "BaseContainerService": "/docs/apis/aqueduct/basecontainerservice-class",
      "ContainerRuntimeFactoryWithDefaultDataStore": "/docs/apis/aqueduct/containerruntimefactorywithdefaultdatastore-class",
      "DataObject": "/docs/apis/aqueduct/dataobject-class",
      "DataObjectFactory": "/docs/apis/aqueduct/dataobjectfactory-class",
      "PureDataObject": "/docs/apis/aqueduct/puredataobject-class",
      "PureDataObjectFactory": "/docs/apis/aqueduct/puredataobjectfactory-class"
    },
    "TypeAlias": {
      "ContainerServiceRegistryEntries": "/docs/apis/aqueduct#containerserviceregistryentries-typealias"
    },
    "Interface": {
      "DataObjectTypes": "/docs/apis/aqueduct/dataobjecttypes-interface",
      "IDataObjectProps": "/docs/apis/aqueduct/idataobjectprops-interface",
      "IRootDataObjectFactory": "/docs/apis/aqueduct/irootdataobjectfactory-interface"
    },
    "Function": {
      "defaultFluidObjectRequestHandler": "/docs/apis/aqueduct#defaultfluidobjectrequesthandler-function",
      "getDefaultObjectFromContainer": "/docs/apis/aqueduct#getdefaultobjectfromcontainer-function",
      "getObjectFromContainer": "/docs/apis/aqueduct#getobjectfromcontainer-function",
      "getObjectWithIdFromContainer": "/docs/apis/aqueduct#getobjectwithidfromcontainer-function",
      "waitForAttach": "/docs/apis/aqueduct#waitforattach-function"
    },
    "Variable": {
      "defaultRouteRequestHandler": "/docs/apis/aqueduct#defaultrouterequesthandler-variable",
      "generateContainerServicesRequestHandler": "/docs/apis/aqueduct#generatecontainerservicesrequesthandler-variable",
      "mountableViewRequestHandler": "/docs/apis/aqueduct#mountableviewrequesthandler-variable",
      "serviceRoutePathRoot": "/docs/apis/aqueduct#serviceroutepathroot-variable"
    }
  },
  "package": "@fluidframework/aqueduct",
  "unscopedPackageName": "aqueduct"
}

[//]: # (Do not edit this file. It is automatically generated by @fluidtools/api-markdown-documenter.)

[Packages](/docs/apis/_index) &gt; [@fluidframework/aqueduct](/docs/apis/aqueduct)

The `aqueduct` package is a library for building Fluid objects and Fluid containers within the Fluid Framework. Its goal is to provide a thin base layer over the existing Fluid Framework interfaces that allows developers to get started quickly.

## Remarks {#_fluidframework_aqueduct-remarks}

About the package name: An Aqueduct is a way to transport water from a source to another location. The package name was chosen because its purpose is to facilitate using lower level constructs and therefore handle 'fluid' items same as an aqueduct.

## Classes

<table class="table table-striped table-hover">
  <thead>
    <tr>
      <th scope="col">
        Class
      </th>
      <th scope="col">
        Description
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <a href='/docs/apis/aqueduct/basecontainerruntimefactory-class'>BaseContainerRuntimeFactory</a>
      </td>
      <td>
        BaseContainerRuntimeFactory produces container runtimes with a given data store and service registry, as well as given request handlers. It can be subclassed to implement a first-time initialization procedure for the containers it creates.
      </td>
    </tr>
    <tr>
      <td>
        <a href='/docs/apis/aqueduct/basecontainerservice-class'>BaseContainerService</a>
      </td>
      <td>
        This class is a simple starter class for building a Container Service. It simply provides routing
      </td>
    </tr>
    <tr>
      <td>
        <a href='/docs/apis/aqueduct/containerruntimefactorywithdefaultdatastore-class'>ContainerRuntimeFactoryWithDefaultDataStore</a>
      </td>
      <td>
        <p>A ContainerRuntimeFactory that initializes Containers with a single default data store, which can be requested from the container with an empty URL.</p><p>This factory should be exposed as fluidExport off the entry point to your module.</p>
      </td>
    </tr>
    <tr>
      <td>
        <a href='/docs/apis/aqueduct/dataobject-class'>DataObject</a>
      </td>
      <td>
        <p>DataObject is a base data store that is primed with a root directory. It ensures that it is created and ready before you can access it.</p><p>Having a single root directory allows for easier development. Instead of creating and registering channels with the runtime any new DDS that is set on the root will automatically be registered.</p>
      </td>
    </tr>
    <tr>
      <td>
        <a href='/docs/apis/aqueduct/dataobjectfactory-class'>DataObjectFactory</a>
      </td>
      <td>
        DataObjectFactory is the IFluidDataStoreFactory for use with DataObjects. It facilitates DataObject's features (such as its shared directory) by ensuring relevant shared objects etc are available to the factory.
      </td>
    </tr>
    <tr>
      <td>
        <a href='/docs/apis/aqueduct/puredataobject-class'>PureDataObject</a>
      </td>
      <td>
        This is a bare-bones base class that does basic setup and enables for factory on an initialize call. You probably don't want to inherit from this data store directly unless you are creating another base data store class
      </td>
    </tr>
    <tr>
      <td>
        <a href='/docs/apis/aqueduct/puredataobjectfactory-class'>PureDataObjectFactory</a>
      </td>
      <td>
        PureDataObjectFactory is a barebones IFluidDataStoreFactory for use with PureDataObject. Consumers should typically use DataObjectFactory instead unless creating another base data store factory.
      </td>
    </tr>
  </tbody>
</table>

## Functions

<table class="table table-striped table-hover">
  <thead>
    <tr>
      <th scope="col">
        Function
      </th>
      <th scope="col">
        Return Type
      </th>
      <th scope="col">
        Description
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <a href='/docs/apis/aqueduct#defaultfluidobjectrequesthandler-function'>defaultFluidObjectRequestHandler(fluidObject, request)</a>
      </td>
      <td>
        <a href='/docs/apis/core-interfaces/iresponse-interface'>IResponse</a>
      </td>
      <td>
        Default request handler for a Fluid object that returns the object itself if: 1. the request url is empty 2. the request url is "/" 3. the request url starts with "/" and is followed by a query param, such as /?key=value Returns a 404 error for any other url.
      </td>
    </tr>
    <tr>
      <td>
        <a href='/docs/apis/aqueduct#getdefaultobjectfromcontainer-function'>getDefaultObjectFromContainer(container)</a>
      </td>
      <td>
        Promise&lt;T&gt;
      </td>
      <td>
        <p>Helper function for getting the default Fluid Object from a Container. This function only works for Containers that support "/" request.</p><p>T - defines the type you expect to be returned</p>
      </td>
    </tr>
    <tr>
      <td>
        <a href='/docs/apis/aqueduct#getobjectfromcontainer-function'>getObjectFromContainer(path, container)</a>
      </td>
      <td>
        Promise&lt;T&gt;
      </td>
      <td>
        <p>Helper function for getting a Fluid Object from a Container given a path/url. This function only works for Containers that support getting FluidObjects via request.</p><p>T - defines the type you expect to be returned</p>
      </td>
    </tr>
    <tr>
      <td>
        <a href='/docs/apis/aqueduct#getobjectwithidfromcontainer-function'>getObjectWithIdFromContainer(id, container)</a>
      </td>
      <td>
        Promise&lt;T&gt;
      </td>
      <td>
        <p>Helper function for getting as Fluid Object from a Container given a Unique Id. This function only works for Containers that support getting FluidObjects via request.</p><p>T - defines the type you expect to be returned</p>
      </td>
    </tr>
    <tr>
      <td>
        <a href='/docs/apis/aqueduct#waitforattach-function'>waitForAttach(dataStoreRuntime)</a>
      </td>
      <td>
        Promise&lt;void&gt;
      </td>
      <td>
      </td>
    </tr>
  </tbody>
</table>

## Interfaces

<table class="table table-striped table-hover">
  <thead>
    <tr>
      <th scope="col">
        Interface
      </th>
      <th scope="col">
        Description
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <a href='/docs/apis/aqueduct/dataobjecttypes-interface'>DataObjectTypes</a>
      </td>
      <td>
        This type is used as the base generic input to DataObject and PureDataObject.
      </td>
    </tr>
    <tr>
      <td>
        <a href='/docs/apis/aqueduct/idataobjectprops-interface'>IDataObjectProps</a>
      </td>
      <td>
      </td>
    </tr>
    <tr>
      <td>
        <a href='/docs/apis/aqueduct/irootdataobjectfactory-interface'>IRootDataObjectFactory</a>
      </td>
      <td>
      </td>
    </tr>
  </tbody>
</table>

## Variables

<table class="table table-striped table-hover">
  <thead>
    <tr>
      <th scope="col">
        Variable
      </th>
      <th scope="col">
        Description
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <a href='/docs/apis/aqueduct#defaultrouterequesthandler-variable'>defaultRouteRequestHandler</a>
      </td>
      <td>
        Pipe through container request into internal request. If request is empty and default url is provided, redirect request to such default url.
      </td>
    </tr>
    <tr>
      <td>
        <a href='/docs/apis/aqueduct#generatecontainerservicesrequesthandler-variable'>generateContainerServicesRequestHandler</a>
      </td>
      <td>
        Given a collection of IContainerServices will produce a RequestHandler for them all
      </td>
    </tr>
    <tr>
      <td>
        <a href='/docs/apis/aqueduct#mountableviewrequesthandler-variable'>mountableViewRequestHandler</a>
      </td>
      <td>
        <p>A mountable view is only required if the view needs to be mounted across a bundle boundary. Mounting across bundle boundaries breaks some frameworks, so the mountable view is used to ensure the mounting is done within the same bundle as the view. For example, React hooks don't work if mounted across bundles since there will be two React instances, breaking the Rules of Hooks. When cross-bundle mounting isn't required, the mountable view isn't necessary.</p><p>When a request is received with a mountableView: true header, this request handler will reissue the request without the header, and respond with a mountable view of the given class using the response.</p>
      </td>
    </tr>
    <tr>
      <td>
        <a href='/docs/apis/aqueduct#serviceroutepathroot-variable'>serviceRoutePathRoot</a>
      </td>
      <td>
      </td>
    </tr>
  </tbody>
</table>

## Types

<table class="table table-striped table-hover">
  <thead>
    <tr>
      <th scope="col">
        TypeAlias
      </th>
      <th scope="col">
        Description
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <a href='/docs/apis/aqueduct#containerserviceregistryentries-typealias'>ContainerServiceRegistryEntries</a>
      </td>
      <td>
      </td>
    </tr>
  </tbody>
</table>

## Function Details

### defaultFluidObjectRequestHandler {#defaultfluidobjectrequesthandler-function}

Default request handler for a Fluid object that returns the object itself if: 1. the request url is empty 2. the request url is "/" 3. the request url starts with "/" and is followed by a query param, such as /?key=value Returns a 404 error for any other url.

#### Signature {#defaultfluidobjectrequesthandler-signature}

```typescript
export declare function defaultFluidObjectRequestHandler(fluidObject: FluidObject, request: IRequest): IResponse;
```

#### Parameters {#defaultfluidobjectrequesthandler-parameters}

<table class="table table-striped table-hover">
  <thead>
    <tr>
      <th scope="col">
        Parameter
      </th>
      <th scope="col">
        Type
      </th>
      <th scope="col">
        Description
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        fluidObject
      </td>
      <td>
        <a href='/docs/apis/core-interfaces#fluidobject-typealias'>FluidObject</a>
      </td>
      <td>
      </td>
    </tr>
    <tr>
      <td>
        request
      </td>
      <td>
        <a href='/docs/apis/core-interfaces/irequest-interface'>IRequest</a>
      </td>
      <td>
      </td>
    </tr>
  </tbody>
</table>

### getDefaultObjectFromContainer {#getdefaultobjectfromcontainer-function}

Helper function for getting the default Fluid Object from a Container. This function only works for Containers that support "/" request.

T - defines the type you expect to be returned

#### Signature {#getdefaultobjectfromcontainer-signature}

```typescript
export declare function getDefaultObjectFromContainer<T = FluidObject>(container: IContainer): Promise<T>;
```

#### Parameters {#getdefaultobjectfromcontainer-parameters}

<table class="table table-striped table-hover">
  <thead>
    <tr>
      <th scope="col">
        Parameter
      </th>
      <th scope="col">
        Type
      </th>
      <th scope="col">
        Description
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        container
      </td>
      <td>
        IContainer
      </td>
      <td>
        Container you're attempting to get the object from
      </td>
    </tr>
  </tbody>
</table>

### getObjectFromContainer {#getobjectfromcontainer-function}

Helper function for getting a Fluid Object from a Container given a path/url. This function only works for Containers that support getting FluidObjects via request.

T - defines the type you expect to be returned

#### Signature {#getobjectfromcontainer-signature}

```typescript
export declare function getObjectFromContainer<T = FluidObject>(path: string, container: IContainer): Promise<T>;
```

#### Parameters {#getobjectfromcontainer-parameters}

<table class="table table-striped table-hover">
  <thead>
    <tr>
      <th scope="col">
        Parameter
      </th>
      <th scope="col">
        Type
      </th>
      <th scope="col">
        Description
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        path
      </td>
      <td>
        string
      </td>
      <td>
        Unique path/url of the FluidObject
      </td>
    </tr>
    <tr>
      <td>
        container
      </td>
      <td>
        IContainer
      </td>
      <td>
        Container you're attempting to get the object from
      </td>
    </tr>
  </tbody>
</table>

### getObjectWithIdFromContainer {#getobjectwithidfromcontainer-function}

Helper function for getting as Fluid Object from a Container given a Unique Id. This function only works for Containers that support getting FluidObjects via request.

T - defines the type you expect to be returned

#### Signature {#getobjectwithidfromcontainer-signature}

```typescript
export declare function getObjectWithIdFromContainer<T = FluidObject>(id: string, container: IContainer): Promise<T>;
```

#### Parameters {#getobjectwithidfromcontainer-parameters}

<table class="table table-striped table-hover">
  <thead>
    <tr>
      <th scope="col">
        Parameter
      </th>
      <th scope="col">
        Type
      </th>
      <th scope="col">
        Description
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        id
      </td>
      <td>
        string
      </td>
      <td>
        Unique id of the FluidObject
      </td>
    </tr>
    <tr>
      <td>
        container
      </td>
      <td>
        IContainer
      </td>
      <td>
        Container you're attempting to get the object from
      </td>
    </tr>
  </tbody>
</table>

### waitForAttach {#waitforattach-function}

#### Signature {#waitforattach-signature}

```typescript
export declare function waitForAttach(dataStoreRuntime: IFluidDataStoreRuntime): Promise<void>;
```

#### Parameters {#waitforattach-parameters}

<table class="table table-striped table-hover">
  <thead>
    <tr>
      <th scope="col">
        Parameter
      </th>
      <th scope="col">
        Type
      </th>
      <th scope="col">
        Description
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        dataStoreRuntime
      </td>
      <td>
        <a href='/docs/apis/datastore-definitions/ifluiddatastoreruntime-interface'>IFluidDataStoreRuntime</a>
      </td>
      <td>
      </td>
    </tr>
  </tbody>
</table>

## Variable Details

### defaultRouteRequestHandler {#defaultrouterequesthandler-variable}

Pipe through container request into internal request. If request is empty and default url is provided, redirect request to such default url.

#### Signature {#defaultrouterequesthandler-signature}

```typescript
defaultRouteRequestHandler: (defaultRootId: string) => (request: IRequest, runtime: IContainerRuntime) => Promise<IResponse | undefined>
```

### generateContainerServicesRequestHandler {#generatecontainerservicesrequesthandler-variable}

Given a collection of IContainerServices will produce a RequestHandler for them all

#### Signature {#generatecontainerservicesrequesthandler-signature}

```typescript
generateContainerServicesRequestHandler: (serviceRegistry: ContainerServiceRegistryEntries) => RuntimeRequestHandler
```

### mountableViewRequestHandler {#mountableviewrequesthandler-variable}

A mountable view is only required if the view needs to be mounted across a bundle boundary. Mounting across bundle boundaries breaks some frameworks, so the mountable view is used to ensure the mounting is done within the same bundle as the view. For example, React hooks don't work if mounted across bundles since there will be two React instances, breaking the Rules of Hooks. When cross-bundle mounting isn't required, the mountable view isn't necessary.

When a request is received with a mountableView: true header, this request handler will reissue the request without the header, and respond with a mountable view of the given class using the response.

#### Signature {#mountableviewrequesthandler-signature}

```typescript
mountableViewRequestHandler: (MountableViewClass: IFluidMountableViewClass, handlers: RuntimeRequestHandler[]) => (request: RequestParser, runtime: IContainerRuntime) => Promise<IResponse>
```

### serviceRoutePathRoot {#serviceroutepathroot-variable}

#### Signature {#serviceroutepathroot-signature}

```typescript
serviceRoutePathRoot = "_services"
```

## Type Details

### ContainerServiceRegistryEntries {#containerserviceregistryentries-typealias}

#### Signature {#containerserviceregistryentries-signature}

```typescript
export declare type ContainerServiceRegistryEntries = Iterable<[
    string,
    (runtime: IContainerRuntime) => Promise<FluidObject>
]>;
```