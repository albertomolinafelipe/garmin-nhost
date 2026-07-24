import type { CodegenConfig } from "@graphql-codegen/cli";

const endpoint =
	process.env.HASURA_GRAPHQL_ENDPOINT ?? "http://localhost:8080/v1/graphql";
const adminSecret = process.env.HASURA_GRAPHQL_ADMIN_SECRET;

if (!adminSecret) {
	throw new Error(
		"HASURA_GRAPHQL_ADMIN_SECRET is required for schema introspection",
	);
}

const config: CodegenConfig = {
	overwrite: true,
	schema: [
		{ [endpoint]: { headers: { "x-hasura-admin-secret": adminSecret } } },
	],
	documents: "src/graphql/operations.graphql",
	generates: {
		"src/graphql/generated.ts": {
			plugins: ["typescript", "typescript-operations", "typed-document-node"],
		},
	},
};

export default config;
