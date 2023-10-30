import { Site } from "@azure/arm-appservice";
import { uiUtils } from "@microsoft/vscode-azext-azureutils";
import {
	IActionContext,
	ISubscriptionContext,
	callWithTelemetryAndErrorHandling,
	nonNullProp,
	nonNullValue,
} from "@microsoft/vscode-azext-utils";
import {
	AppResource,
	AppResourceResolver,
} from "@microsoft/vscode-azext-utils/hostapi";
import { ResolvedWebAppResource } from "./tree/ResolvedWebAppResource";
import { createWebSiteClient } from "./utils/azureClients";

export class WebAppResolver implements AppResourceResolver {
	private siteCacheLastUpdated = 0;
	private siteCache: Map<string, Site> = new Map<string, Site>();

	public async resolveResource(
		subContext: ISubscriptionContext,
		resource: AppResource
	): Promise<ResolvedWebAppResource | undefined> {
		return await callWithTelemetryAndErrorHandling(
			"resolveResource",
			async (context: IActionContext) => {
				const client = await createWebSiteClient({
					...context,
					...subContext,
				});

				if (this.siteCacheLastUpdated < Date.now() - 1000 * 3) {
					this.siteCache.clear();
					const sites = await uiUtils.listAllIterator(
						client.webApps.list()
					);
					sites.forEach((site) =>
						this.siteCache.set(
							nonNullProp(site, "id").toLowerCase(),
							site
						)
					);
					this.siteCacheLastUpdated = Date.now();
				}

				const site = this.siteCache.get(
					nonNullProp(resource, "id").toLowerCase()
				);
				return new ResolvedWebAppResource(
					subContext,
					nonNullValue(site)
				);
			}
		);
	}

	public matchesResource(resource: AppResource): boolean {
		return (
			resource.type.toLowerCase() === "microsoft.web/sites" &&
			!resource.kind?.includes("functionapp")
		);
	}
}
