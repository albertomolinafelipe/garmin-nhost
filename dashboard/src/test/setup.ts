import "@testing-library/jest-dom/vitest";

if (!Element.prototype.hasPointerCapture) {
	Element.prototype.hasPointerCapture = () => false;
}
if (!Element.prototype.releasePointerCapture) {
	Element.prototype.releasePointerCapture = () => undefined;
}
if (!Element.prototype.scrollIntoView) {
	Element.prototype.scrollIntoView = () => undefined;
}

class ResizeObserverMock implements ResizeObserver {
	observe() {}
	unobserve() {}
	disconnect() {}
}

globalThis.ResizeObserver = ResizeObserverMock;
