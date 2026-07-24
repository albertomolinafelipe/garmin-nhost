import { beforeEach, describe, expect, it, vi } from "vitest";
import {
	clearAdminSecret,
	getAdminSecret,
	setAdminSecret,
} from "../adminSecret";
import { graphQLClient } from "./client";

describe("admin-secret GraphQL client", () => {
	beforeEach(() => {
		clearAdminSecret();
		vi.restoreAllMocks();
	});

	it("stores the secret in sessionStorage and injects it into requests", async () => {
		setAdminSecret("test-secret");
		const fetchMock = vi
			.spyOn(window, "fetch")
			.mockResolvedValue(
				new Response(JSON.stringify({ data: { __typename: "query_root" } }), {
					status: 200,
					headers: { "content-type": "application/json" },
				}),
			);

		await graphQLClient.request("query { __typename }");

		expect(getAdminSecret()).toBe("test-secret");
		const headers = new Headers(fetchMock.mock.calls[0]?.[1]?.headers);
		expect(headers.get("x-hasura-admin-secret")).toBe("test-secret");
		expect(localStorage.length).toBe(0);
	});

	it("clears the secret when Hasura rejects it", async () => {
		setAdminSecret("invalid-secret");
		vi.spyOn(window, "fetch").mockResolvedValue(
			new Response(
				JSON.stringify({
					errors: [{ message: "invalid x-hasura-admin-secret" }],
				}),
				{ status: 200, headers: { "content-type": "application/json" } },
			),
		);

		await expect(
			graphQLClient.request("query { __typename }"),
		).rejects.toThrow();

		expect(getAdminSecret()).toBeNull();
	});
});
