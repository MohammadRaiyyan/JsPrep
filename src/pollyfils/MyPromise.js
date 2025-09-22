"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _MyPromise_instances, _MyPromise_state, _MyPromise_value, _MyPromise_handlers, _MyPromise_runHandlers;
var state;
(function (state) {
    state["PENDING"] = "pending";
    state["FULFILLED"] = "fulfilled";
    state["REJECTED"] = "rejected";
})(state || (state = {}));
class MyPromise {
    constructor(executor) {
        _MyPromise_instances.add(this);
        _MyPromise_state.set(this, void 0);
        _MyPromise_value.set(this, void 0);
        _MyPromise_handlers.set(this, void 0);
        __classPrivateFieldSet(this, _MyPromise_state, state.PENDING, "f");
        __classPrivateFieldSet(this, _MyPromise_value, undefined, "f");
        __classPrivateFieldSet(this, _MyPromise_handlers, [], "f");
        const resolve = (value) => {
            if (__classPrivateFieldGet(this, _MyPromise_state, "f") !== state.PENDING)
                return;
            __classPrivateFieldSet(this, _MyPromise_state, state.FULFILLED, "f");
            __classPrivateFieldSet(this, _MyPromise_value, value, "f");
            __classPrivateFieldGet(this, _MyPromise_instances, "m", _MyPromise_runHandlers).call(this);
        };
        const reject = (reason) => {
            if (__classPrivateFieldGet(this, _MyPromise_state, "f") !== state.PENDING)
                return;
            __classPrivateFieldSet(this, _MyPromise_state, state.REJECTED, "f");
            __classPrivateFieldSet(this, _MyPromise_value, reason, "f");
            __classPrivateFieldGet(this, _MyPromise_instances, "m", _MyPromise_runHandlers).call(this);
        };
        try {
            executor(resolve, reject);
        }
        catch (err) {
            reject(err);
        }
    }
    then(onFulfilled, onRejected) {
        return new MyPromise((resolve, reject) => {
            __classPrivateFieldGet(this, _MyPromise_handlers, "f").push({ onFulfilled, onRejected, resolve, reject });
            if (__classPrivateFieldGet(this, _MyPromise_state, "f") !== state.PENDING) {
                __classPrivateFieldGet(this, _MyPromise_instances, "m", _MyPromise_runHandlers).call(this);
            }
        });
    }
}
_MyPromise_state = new WeakMap(), _MyPromise_value = new WeakMap(), _MyPromise_handlers = new WeakMap(), _MyPromise_instances = new WeakSet(), _MyPromise_runHandlers = function _MyPromise_runHandlers() {
    queueMicrotask(() => {
        __classPrivateFieldGet(this, _MyPromise_handlers, "f").forEach(({ onFulfilled, onRejected, resolve, reject }) => {
            try {
                if (__classPrivateFieldGet(this, _MyPromise_state, "f") === state.FULFILLED) {
                    if (onFulfilled) {
                        resolve(onFulfilled(__classPrivateFieldGet(this, _MyPromise_value, "f")));
                    }
                    else {
                        resolve(__classPrivateFieldGet(this, _MyPromise_value, "f"));
                    }
                }
                else {
                    if (onRejected) {
                        resolve(onRejected(__classPrivateFieldGet(this, _MyPromise_value, "f")));
                    }
                    else {
                        reject(__classPrivateFieldGet(this, _MyPromise_value, "f"));
                    }
                }
            }
            catch (err) {
                reject(err);
            }
        });
    });
};
let p = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        if (Math.random() * 10 > 5) {
            resolve("Resolved");
        }
        else {
            reject("Rejected");
        }
    }, 2000);
});
p.then((value) => {
    console.log("Value:", value);
}, (error) => {
    console.log("Error:", error);
});
