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
    define(['ApiClient', 'model/Pair', 'model/TemplateEnv', 'model/TemplateRepository', 'model/TemplateVolume'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Pair'), require('./TemplateEnv'), require('./TemplateRepository'), require('./TemplateVolume'));
  } else {
    // Browser globals (root is window)
    if (!root.PortainerApi) {
      root.PortainerApi = {};
    }
    root.PortainerApi.TemplateCreateRequest = factory(root.PortainerApi.ApiClient, root.PortainerApi.Pair, root.PortainerApi.TemplateEnv, root.PortainerApi.TemplateRepository, root.PortainerApi.TemplateVolume);
  }
}(this, function(ApiClient, Pair, TemplateEnv, TemplateRepository, TemplateVolume) {
  'use strict';




  /**
   * The TemplateCreateRequest model module.
   * @module model/TemplateCreateRequest
   * @version 1.19.2
   */

  /**
   * Constructs a new <code>TemplateCreateRequest</code>.
   * @alias module:model/TemplateCreateRequest
   * @class
   * @param type {Number} Template type. Valid values are: 1 (container), 2 (Swarm stack) or 3 (Compose stack)
   * @param title {String} Title of the template
   * @param description {String} Description of the template
   */
  var exports = function(type, title, description) {
    var _this = this;

    _this['type'] = type;
    _this['title'] = title;
    _this['description'] = description;



















  };

  /**
   * Constructs a <code>TemplateCreateRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/TemplateCreateRequest} obj Optional instance to populate.
   * @return {module:model/TemplateCreateRequest} The populated <code>TemplateCreateRequest</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('type')) {
        obj['type'] = ApiClient.convertToType(data['type'], 'Number');
      }
      if (data.hasOwnProperty('title')) {
        obj['title'] = ApiClient.convertToType(data['title'], 'String');
      }
      if (data.hasOwnProperty('description')) {
        obj['description'] = ApiClient.convertToType(data['description'], 'String');
      }
      if (data.hasOwnProperty('administrator_only')) {
        obj['administrator_only'] = ApiClient.convertToType(data['administrator_only'], 'Boolean');
      }
      if (data.hasOwnProperty('image')) {
        obj['image'] = ApiClient.convertToType(data['image'], 'String');
      }
      if (data.hasOwnProperty('repository')) {
        obj['repository'] = TemplateRepository.constructFromObject(data['repository']);
      }
      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('logo')) {
        obj['logo'] = ApiClient.convertToType(data['logo'], 'String');
      }
      if (data.hasOwnProperty('env')) {
        obj['env'] = ApiClient.convertToType(data['env'], [TemplateEnv]);
      }
      if (data.hasOwnProperty('note')) {
        obj['note'] = ApiClient.convertToType(data['note'], 'String');
      }
      if (data.hasOwnProperty('platform')) {
        obj['platform'] = ApiClient.convertToType(data['platform'], 'String');
      }
      if (data.hasOwnProperty('categories')) {
        obj['categories'] = ApiClient.convertToType(data['categories'], ['String']);
      }
      if (data.hasOwnProperty('registry')) {
        obj['registry'] = ApiClient.convertToType(data['registry'], 'String');
      }
      if (data.hasOwnProperty('command')) {
        obj['command'] = ApiClient.convertToType(data['command'], 'String');
      }
      if (data.hasOwnProperty('network')) {
        obj['network'] = ApiClient.convertToType(data['network'], 'String');
      }
      if (data.hasOwnProperty('volumes')) {
        obj['volumes'] = ApiClient.convertToType(data['volumes'], [TemplateVolume]);
      }
      if (data.hasOwnProperty('ports')) {
        obj['ports'] = ApiClient.convertToType(data['ports'], ['String']);
      }
      if (data.hasOwnProperty('labels')) {
        obj['labels'] = ApiClient.convertToType(data['labels'], [Pair]);
      }
      if (data.hasOwnProperty('privileged')) {
        obj['privileged'] = ApiClient.convertToType(data['privileged'], 'Boolean');
      }
      if (data.hasOwnProperty('interactive')) {
        obj['interactive'] = ApiClient.convertToType(data['interactive'], 'Boolean');
      }
      if (data.hasOwnProperty('restart_policy')) {
        obj['restart_policy'] = ApiClient.convertToType(data['restart_policy'], 'String');
      }
      if (data.hasOwnProperty('hostname')) {
        obj['hostname'] = ApiClient.convertToType(data['hostname'], 'String');
      }
    }
    return obj;
  }

  /**
   * Template type. Valid values are: 1 (container), 2 (Swarm stack) or 3 (Compose stack)
   * @member {Number} type
   */
  exports.prototype['type'] = undefined;
  /**
   * Title of the template
   * @member {String} title
   */
  exports.prototype['title'] = undefined;
  /**
   * Description of the template
   * @member {String} description
   */
  exports.prototype['description'] = undefined;
  /**
   * Whether the template should be available to administrators only
   * @member {Boolean} administrator_only
   */
  exports.prototype['administrator_only'] = undefined;
  /**
   * Image associated to a container template. Mandatory for a container template
   * @member {String} image
   */
  exports.prototype['image'] = undefined;
  /**
   * @member {module:model/TemplateRepository} repository
   */
  exports.prototype['repository'] = undefined;
  /**
   * Default name for the stack/container to be used on deployment
   * @member {String} name
   */
  exports.prototype['name'] = undefined;
  /**
   * URL of the template's logo
   * @member {String} logo
   */
  exports.prototype['logo'] = undefined;
  /**
   * A list of environment variables used during the template deployment
   * @member {Array.<module:model/TemplateEnv>} env
   */
  exports.prototype['env'] = undefined;
  /**
   * A note that will be displayed in the UI. Supports HTML content
   * @member {String} note
   */
  exports.prototype['note'] = undefined;
  /**
   * Platform associated to the template. Valid values are: 'linux', 'windows' or leave empty for multi-platform
   * @member {String} platform
   */
  exports.prototype['platform'] = undefined;
  /**
   * A list of categories associated to the template
   * @member {Array.<String>} categories
   */
  exports.prototype['categories'] = undefined;
  /**
   * The URL of a registry associated to the image for a container template
   * @member {String} registry
   */
  exports.prototype['registry'] = undefined;
  /**
   * The command that will be executed in a container template
   * @member {String} command
   */
  exports.prototype['command'] = undefined;
  /**
   * Name of a network that will be used on container deployment if it exists inside the environment
   * @member {String} network
   */
  exports.prototype['network'] = undefined;
  /**
   * A list of volumes used during the container template deployment
   * @member {Array.<module:model/TemplateVolume>} volumes
   */
  exports.prototype['volumes'] = undefined;
  /**
   * A list of ports exposed by the container
   * @member {Array.<String>} ports
   */
  exports.prototype['ports'] = undefined;
  /**
   * Container labels
   * @member {Array.<module:model/Pair>} labels
   */
  exports.prototype['labels'] = undefined;
  /**
   * Whether the container should be started in privileged mode
   * @member {Boolean} privileged
   */
  exports.prototype['privileged'] = undefined;
  /**
   * Whether the container should be started in interactive mode (-i -t equivalent on the CLI)
   * @member {Boolean} interactive
   */
  exports.prototype['interactive'] = undefined;
  /**
   * Container restart policy
   * @member {String} restart_policy
   */
  exports.prototype['restart_policy'] = undefined;
  /**
   * Container hostname
   * @member {String} hostname
   */
  exports.prototype['hostname'] = undefined;



  return exports;
}));


