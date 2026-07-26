import { act, renderHook } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createElement, type ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useAnnotationSave } from "./use-annotation-save";

const mutateAsync = vi.fn();
vi.mock("@/graphql/hooks", () => ({
	useUpdateActivityMutation: () => ({ mutateAsync }),
}));
vi.mock("sonner", () => ({ toast: { error: vi.fn() } }));
const deferred = <T,>() => {
	let resolve!: (value: T) => void;
	let reject!: (error: unknown) => void;
	const promise = new Promise<T>((res, rej) => {
		resolve = res;
		reject = rej;
	});
	return { promise, resolve, reject };
};

describe("useAnnotationSave", () => {
	let client: QueryClient;
	beforeEach(() => {
		mutateAsync.mockReset();
		client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
	});
	const wrapper = ({ children }: { children: ReactNode }) =>
		createElement(QueryClientProvider, { client }, children);
	it("serializes rapid patches and skips empty writes", async () => {
		const first = deferred<any>();
		const second = deferred<any>();
		mutateAsync
			.mockReturnValueOnce(first.promise)
			.mockReturnValueOnce(second.promise);
		const { result } = renderHook(() => useAnnotationSave("1"), { wrapper });
		const one = result.current({ feeling: 1 });
		const two = result.current({ feeling: 2 });
		expect(mutateAsync).toHaveBeenCalledTimes(0);
		await act(async () => {
			await Promise.resolve();
		});
		expect(mutateAsync).toHaveBeenCalledTimes(1);
		first.resolve({ update_activities_by_pk: { id: "1", feeling: 1 } });
		await act(async () => {
			await one;
		});
		expect(mutateAsync).toHaveBeenCalledTimes(2);
		second.resolve({ update_activities_by_pk: { id: "1", feeling: 2 } });
		await act(async () => {
			await two;
			expect(await result.current({ distance_m: 3 } as any)).toBe(true);
		});
		expect(mutateAsync).toHaveBeenCalledTimes(2);
	});
	it("continues after a failure and retains a failed result", async () => {
		mutateAsync
			.mockRejectedValueOnce(new Error("no"))
			.mockResolvedValueOnce({
				update_activities_by_pk: { id: "1", notes: "later" },
			});
		const { result } = renderHook(() => useAnnotationSave("1"), { wrapper });
		await expect(result.current({ notes: "failed" })).resolves.toBe(false);
		await expect(result.current({ notes: "later" })).resolves.toBe(true);
		expect(mutateAsync).toHaveBeenCalledTimes(2);
	});
	it("does not install an old activity response after the id changes", async () => {
		const pending = deferred<any>();
		mutateAsync.mockReturnValue(pending.promise);
		const spy = vi.spyOn(client, "setQueryData");
		const { result, rerender, unmount } = renderHook(
			({ id }) => useAnnotationSave(id),
			{ initialProps: { id: "1" }, wrapper },
		);
		const save = result.current({ feeling: 1 });
		rerender({ id: "2" });
		unmount();
		pending.resolve({ update_activities_by_pk: { id: "1", feeling: 1 } });
		await save;
		expect(spy).not.toHaveBeenCalled();
	});
});
