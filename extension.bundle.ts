/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE.md in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * This is the external face of extension.bundle.js, the main webpack bundle for the extension.
 * Anything needing to be exposed outside of the extension sources must be exported from here, because
 * everything else will be in private modules in extension.bundle.js.
 */

// Exports for tests
// The tests are not packaged with the webpack bundle and therefore only have access to code exported from this file.
//
// The tests should import '../extension.bundle'. At design-time they live in tests/ and so will pick up this file (extension.bundle.ts).
// At runtime the tests live in dist/tests and will therefore pick up the main webpack bundle at dist/extension.bundle.js.
export { createGenericClient } from "@microsoft/vscode-azext-azureutils";

export * from "@microsoft/vscode-azext-utils";

export * from "./src/commands/appSettings/addAppSetting";

export * from "./src/commands/appSettings/deleteAppSettings";

export * from "./src/commands/createWebApp/createWebApp";

export * from "./src/commands/deleteWebApp";

export * from "./src/commands/deploy/deploy";

export * from "./src/commands/deployments/editScmType";

export {
	ColumnName,
	detectorResponseJSON,
	detectorTable,
	getLinuxDetectorError,
	validateTimestamp,
} from "./src/commands/postDeploy/getLinuxDetectorError";

export {
	findTableByName,
	getValuesByColumnName,
} from "./src/commands/postDeploy/parseDetectorResponse";

export { getRemoteDebugLanguage } from "./src/commands/remoteDebug/getRemoteDebugLanguage";

export * as constants from "./src/constants";
// Export activate/deactivate for main.js
export { activateInternal, deactivateInternal } from "./src/extension";

export { ext } from "./src/extensionVariables";

export { AzureAccountTreeItem } from "./src/tree/AzureAccountTreeItem";

export { SiteTreeItem } from "./src/tree/SiteTreeItem";

export * from "./src/utils/azureClients";

export { getRandomHexString } from "./src/utils/randomUtils";

export {
	getGlobalSetting,
	updateGlobalSetting,
} from "./src/vsCodeConfig/settings";

// NOTE: The auto-fix action "source.organizeImports" does weird things with this file, but there doesn't seem to be a way to disable it on a per-file basis so we'll just let it happen
