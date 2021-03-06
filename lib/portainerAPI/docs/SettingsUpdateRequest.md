# PortainerApi.SettingsUpdateRequest

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**templatesURL** | **String** | URL to the templates that will be displayed in the UI when navigating to App Templates | 
**logoURL** | **String** | URL to a logo that will be displayed on the login page as well as on top of the sidebar. Will use default Portainer logo when value is empty string | [optional] 
**blackListedLabels** | [**[SettingsBlackListedLabels]**](SettingsBlackListedLabels.md) | A list of label name &amp; value that will be used to hide containers when querying containers | [optional] 
**displayExternalContributors** | **Boolean** | Whether to display or not external templates contributions as sub-menus in the UI. | [optional] 
**authenticationMethod** | **Number** | Active authentication method for the Portainer instance. Valid values are: 1 for managed or 2 for LDAP. | 
**lDAPSettings** | [**LDAPSettings**](LDAPSettings.md) |  | [optional] 
**allowBindMountsForRegularUsers** | **Boolean** | Whether non-administrator users should be able to use bind mounts when creating containers | [optional] 
**allowPrivilegedModeForRegularUsers** | **Boolean** | Whether non-administrator users should be able to use privileged mode when creating containers | [optional] 


