import { GraphQLClient } from "graphql-request";
import { clearAdminSecret, getAdminSecret } from "../adminSecret";

const configuredEndpoint =
	import.meta.env.VITE_HASURA_GRAPHQL_ENDPOINT ?? "/v1/graphql";
const endpoint = new URL(configuredEndpoint, window.location.origin);
if (
	!(["http:", "https:"] as const).includes(
		endpoint.protocol as "http:" | "https:",
	)
) {
	throw new Error("VITE_HASURA_GRAPHQL_ENDPOINT must use HTTP or HTTPS");
}

function isInvalidSecret(response: Response, body: string): boolean {
	return (
		response.status === 401 ||
		response.status === 403 ||
		/invalid x-hasura-admin-secret/i.test(body)
	);
}

const authenticatedFetch: typeof fetch = async (input, init) => {
	let requestUrl: URL;
	try {
		requestUrl = new URL(
			typeof input === "string" || input instanceof URL ? input : input.url,
		);
	} catch {
		throw new Error("Refusing GraphQL request with an invalid endpoint");
	}
	if (requestUrl.href !== endpoint.href) {
		throw new Error("Refusing GraphQL request to an unexpected endpoint");
	}

	const secret = getAdminSecret();
	const headers = new Headers(init?.headers);
	if (secret) headers.set("x-hasura-admin-secret", secret);

	const response = await window.fetch(endpoint, { ...init, headers });
	const body = await response.clone().text();
	if (isInvalidSecret(response, body)) {
		clearAdminSecret();
		window.dispatchEvent(new Event("admin-secret-invalid"));
	}
	return response;
};

export const graphQLClient = new GraphQLClient(endpoint.href, {
	fetch: authenticatedFetch,
});
