
type Executor = (resolve: (val: unknown) => void, reject: (reason: unknown) => void) => void

enum state {
    PENDING = "pending",
    FULFILLED = "fulfilled",
    REJECTED = "rejected"
}

type Handlers = {
    onFulfilled: (value: unknown) => void,
    onRejected: (reason: unknown) => void,
    resolve: (value: unknown) => void,
    reject: (reason: unknown) => void
}

class MyPromise {
    #state: state;
    #value: unknown;
    #handlers: Array<Handlers>

    constructor(
        executor: Executor
    ) {
        this.#state = state.PENDING;
        this.#value = undefined;
        this.#handlers = [];

        const resolve = (value: unknown) => {
            if (this.#state !== state.PENDING) return;
            this.#state = state.FULFILLED;
            this.#value = value;
            this.#runHandlers();
        };

        const reject = (reason: unknown) => {
            if (this.#state !== state.PENDING) return;
            this.#state = state.REJECTED;
            this.#value = reason;
            this.#runHandlers();
        };

        try {
            executor(resolve, reject);
        } catch (err) {
            reject(err);
        }
    }

    #runHandlers() {
        queueMicrotask(() => {
            this.#handlers.forEach(({ onFulfilled, onRejected, resolve, reject }) => {
                try {
                    if (this.#state === state.FULFILLED) {
                        if (onFulfilled) {
                            resolve(onFulfilled(this.#value));
                        } else {
                            resolve(this.#value);
                        }
                    } else {
                        if (onRejected) {
                            resolve(onRejected(this.#value));
                        } else {
                            reject(this.#value);
                        }
                    }
                } catch (err) {
                    reject(err);
                }
            });
        });
    }

    then(onFulfilled: Handlers["onFulfilled"], onRejected: Handlers["onRejected"]) {
        return new MyPromise((resolve, reject) => {
            this.#handlers.push({ onFulfilled, onRejected, resolve, reject });
            if (this.#state !== state.PENDING) {
                this.#runHandlers();
            }
        });
    }
}

let p = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        if (Math.random() * 10 > 5) {
            resolve("Resolved")
        } else {
            reject("Rejected")
        }

    }, 2000)
});

p.then(
    (value) => {
        console.log("Value:", value)
    },
    (error) => {
        console.log("Error:", error)
    }
)