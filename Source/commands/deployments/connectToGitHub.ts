/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import type { DeploymentsTreeItem } from "@microsoft/vscode-azext-azureappservice";
import type {
	GenericTreeItem,
	IActionContext,
} from "@microsoft/vscode-azext-utils";
import { ScmType } from "../../constants";
import type { SiteTreeItem } from "../../tree/SiteTreeItem";
import { pickWebApp } from "../../utils/pickWebApp";
import { editScmType } from "./editScmType";

export async function connectToGitHub(
	context: IActionContext,
	target?: GenericTreeItem,
): Promise<void> {
	let node: SiteTreeItem | DeploymentsTreeItem;

	if (target) {
		node = <DeploymentsTreeItem>target.parent;
	} else {
		node ??= await pickWebApp(context);
	}

	await editScmType(context, node, undefined, ScmType.GitHub);
}
