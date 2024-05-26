/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { DeploymentTreeItem } from "@microsoft/vscode-azext-azureappservice";
import type { IActionContext } from "@microsoft/vscode-azext-utils";
import { webAppFilter } from "../../constants";
import { ext } from "../../extensionVariables";

export async function viewDeploymentLogs(
	context: IActionContext,
	node?: DeploymentTreeItem,
): Promise<void> {
	if (!node) {
		node = await ext.rgApi.pickAppResource<DeploymentTreeItem>(
			{ ...context, suppressCreatePick: true },
			{
				filter: webAppFilter,
				expectedChildContextValue: DeploymentTreeItem.contextValue,
			},
		);
	}
	await node.viewDeploymentLogs(context);
}
