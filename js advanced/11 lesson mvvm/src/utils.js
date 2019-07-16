export function assert(exp, msg) {
    if (!exp) throw  new Error(msg || "assert error");
}

export function getDom(selector) {
    assert(selector);
    if (selector instanceof HTMLElement) return selector;
    if (typeof selector === "string") return document.querySelector(selector);
    assert(false, "invalid selector");
}