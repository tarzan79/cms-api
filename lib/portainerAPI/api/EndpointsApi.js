/**
 * Portainer API
 * Portainer API is an HTTP API served by Portainer. It is used by the Portainer UI and everything you can do with the UI can be done using the HTTP API. Examples are available at https://gist.github.com/deviantony/77026d402366b4b43fa5918d41bc42f8 You can find out more about Portainer at [http://portainer.io](http://portainer.io) and get some support on [Slack](http://portainer.io/slack/).  # Authentication  Most of the API endpoints require to be authenticated as well as some level of authorization to be used. Portainer API uses JSON Web Token to manage authentication and thus requires you to provide a token in the **Authorization** header of each request with the **Bearer** authentication mechanism.  Example: ``` Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInJvbGUiOjEsImV4cCI6MTQ5OTM3NjE1NH0.NJ6vE8FY1WG6jsRQzfMqeatJ4vh2TWAeeYfDhP71YEE ```  # Security  Each API endpoint has an associated access policy, it is documented in the description of each endpoint.  Different access policies are available: * Public access * Authenticated access * Restricted access * Administrator access  ### Public access  No authentication is required to access the endpoints with this access policy.  ### Authenticated access  Authentication is required to access the endpoints with this access policy.  ### Restricted access  Authentication is required to access the endpoints with this access policy. Extra-checks might be added to ensure access to the resource is granted. Returned data might also be filtered.  ### Administrator access  Authentication as well as an administrator role are required to access the endpoints with this access policy.  # Execute Docker requests  Portainer **DO NOT** expose specific endpoints to manage your Docker resources (create a container, remove a volume, etc...).  Instead, it acts as a reverse-proxy to the Docker HTTP API. This means that you can execute Docker requests **via** the Portainer HTTP API.  To do so, you can use the `/endpoints/{id}/docker` Portainer API endpoint (which is not documented below due to Swagger limitations). This endpoint has a restricted access policy so you still need to be authenticated to be able to query this endpoint. Any query on this endpoint will be proxied to the Docker API of the associated endpoint (requests and responses objects are the same as documented in the Docker API).  **NOTE**: You can find more information on how to query the Docker API in the [Docker official documentation](https://docs.docker.com/engine/api/v1.30/) as well as in [this Portainer example](https://gist.github.com/deviantony/77026d402366b4b43fa5918d41bc42f8). 
 *
 * OpenAPI spec version: 1.19.2
 * Contact: info@portainer.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Endpoint', 'model/EndpointAccessUpdateRequest', 'model/EndpointListResponse', 'model/EndpointUpdateRequest', 'model/GenericError'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/Endpoint'), require('../model/EndpointAccessUpdateRequest'), require('../model/EndpointListResponse'), require('../model/EndpointUpdateRequest'), require('../model/GenericError'));
  } else {
    // Browser globals (root is window)
    if (!root.PortainerApi) {
      root.PortainerApi = {};
    }
    root.PortainerApi.EndpointsApi = factory(root.PortainerApi.ApiClient, root.PortainerApi.Endpoint, root.PortainerApi.EndpointAccessUpdateRequest, root.PortainerApi.EndpointListResponse, root.PortainerApi.EndpointUpdateRequest, root.PortainerApi.GenericError);
  }
}(this, function(ApiClient, Endpoint, EndpointAccessUpdateRequest, EndpointListResponse, EndpointUpdateRequest, GenericError) {
  'use strict';

  /**
   * Endpoints service.
   * @module api/EndpointsApi
   * @version 1.19.2
   */

  /**
   * Constructs a new EndpointsApi. 
   * @alias module:api/EndpointsApi
   * @class
   * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the endpointAccessUpdate operation.
     * @callback module:api/EndpointsApi~endpointAccessUpdateCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Endpoint} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Manage accesses to an endpoint
     * Manage user and team accesses to an endpoint. **Access policy**: administrator 
     * @param {Number} id Endpoint identifier
     * @param {module:model/EndpointAccessUpdateRequest} body Authorizations details
     * @param {module:api/EndpointsApi~endpointAccessUpdateCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Endpoint}
     */
    this.endpointAccessUpdate = function(id, body, callback) {
      var postBody = body;

      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling endpointAccessUpdate");
      }

      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling endpointAccessUpdate");
      }


      var pathParams = {
        'id': id
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = [];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = Endpoint;

      return this.apiClient.callApi(
        '/endpoints/{id}/access', 'PUT',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the endpointCreate operation.
     * @callback module:api/EndpointsApi~endpointCreateCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Endpoint} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Create a new endpoint
     * Create a new endpoint that will be used to manage a Docker environment. **Access policy**: administrator 
     * @param {String} name Name that will be used to identify this endpoint (example: my-endpoint)
     * @param {Number} endpointType Environment type. Value must be one of: 1 (Docker environment), 2 (Agent environment) or 3 (Azure environment)
     * @param {Object} opts Optional parameters
     * @param {String} opts.URL URL or IP address of a Docker host (example: docker.mydomain.tld:2375). Defaults to local if not specified (Linux: /var/run/docker.sock, Windows: //./pipe/docker_engine)
     * @param {String} opts.publicURL URL or IP address where exposed containers will be reachable. Defaults to URL if not specified (example: docker.mydomain.tld:2375)
     * @param {String} opts.groupID Endpoint group identifier. If not specified will default to 1 (unassigned).
     * @param {String} opts.TLS Require TLS to connect against this endpoint (example: true)
     * @param {String} opts.tLSSkipVerify Skip server verification when using TLS
     * @param {File} opts.tLSCACertFile TLS CA certificate file
     * @param {File} opts.tLSCertFile TLS client certificate file
     * @param {File} opts.tLSKeyFile TLS client key file
     * @param {String} opts.azureApplicationID Azure application ID. Required if endpoint type is set to 3
     * @param {String} opts.azureTenantID Azure tenant ID. Required if endpoint type is set to 3
     * @param {String} opts.azureAuthenticationKey Azure authentication key. Required if endpoint type is set to 3
     * @param {module:api/EndpointsApi~endpointCreateCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Endpoint}
     */
    this.endpointCreate = function(name, endpointType, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'name' is set
      if (name === undefined || name === null) {
        throw new Error("Missing the required parameter 'name' when calling endpointCreate");
      }

      // verify the required parameter 'endpointType' is set
      if (endpointType === undefined || endpointType === null) {
        throw new Error("Missing the required parameter 'endpointType' when calling endpointCreate");
      }


      var pathParams = {
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
        'Name': name,
        'EndpointType': endpointType,
        'URL': opts['URL'],
        'PublicURL': opts['publicURL'],
        'GroupID': opts['groupID'],
        'TLS': opts['TLS'],
        'TLSSkipVerify': opts['tLSSkipVerify'],
        'TLSCACertFile': opts['tLSCACertFile'],
        'TLSCertFile': opts['tLSCertFile'],
        'TLSKeyFile': opts['tLSKeyFile'],
        'AzureApplicationID': opts['azureApplicationID'],
        'AzureTenantID': opts['azureTenantID'],
        'AzureAuthenticationKey': opts['azureAuthenticationKey']
      };

      var authNames = [];
      var contentTypes = ['multipart/form-data'];
      var accepts = ['application/json'];
      var returnType = Endpoint;

      return this.apiClient.callApi(
        '/endpoints', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the endpointDelete operation.
     * @callback module:api/EndpointsApi~endpointDeleteCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Remove an endpoint
     * Remove an endpoint. **Access policy**: administrator 
     * @param {Number} id Endpoint identifier
     * @param {module:api/EndpointsApi~endpointDeleteCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.endpointDelete = function(id, callback) {
      var postBody = null;

      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling endpointDelete");
      }


      var pathParams = {
        'id': id
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = [];
      var contentTypes = [];
      var accepts = [];
      var returnType = null;

      return this.apiClient.callApi(
        '/endpoints/{id}', 'DELETE',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the endpointInspect operation.
     * @callback module:api/EndpointsApi~endpointInspectCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Endpoint} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Inspect an endpoint
     * Retrieve details abount an endpoint. **Access policy**: restricted 
     * @param {Number} id Endpoint identifier
     * @param {module:api/EndpointsApi~endpointInspectCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Endpoint}
     */
    this.endpointInspect = function(id, callback) {
      var postBody = null;

      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling endpointInspect");
      }


      var pathParams = {
        'id': id
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = [];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = Endpoint;

      return this.apiClient.callApi(
        '/endpoints/{id}', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the endpointList operation.
     * @callback module:api/EndpointsApi~endpointListCallback
     * @param {String} error Error message, if any.
     * @param {module:model/EndpointListResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List endpoints
     * List all endpoints based on the current user authorizations. Will return all endpoints if using an administrator account otherwise it will only return authorized endpoints. **Access policy**: restricted 
     * @param {module:api/EndpointsApi~endpointListCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/EndpointListResponse}
     */
    this.endpointList = function(callback) {
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = [];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = EndpointListResponse;

      return this.apiClient.callApi(
        '/endpoints', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the endpointUpdate operation.
     * @callback module:api/EndpointsApi~endpointUpdateCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update an endpoint
     * Update an endpoint. **Access policy**: administrator 
     * @param {Number} id Endpoint identifier
     * @param {module:model/EndpointUpdateRequest} body Endpoint details
     * @param {module:api/EndpointsApi~endpointUpdateCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.endpointUpdate = function(id, body, callback) {
      var postBody = body;

      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling endpointUpdate");
      }

      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling endpointUpdate");
      }


      var pathParams = {
        'id': id
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = [];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = null;

      return this.apiClient.callApi(
        '/endpoints/{id}', 'PUT',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));