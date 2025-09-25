
(function () {
    //Debounce function
    function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
        let timerId: ReturnType<typeof setTimeout>;
        return function (this: any, ...args: Parameters<T>) {
            clearTimeout(timerId);
            timerId = setTimeout(() => fn.apply(this, args), delay);
        };
    }
    //Create blocks and append in wrapper
    (function createBlocks() {
        const wrapper = document.querySelector(".wrapper") as HTMLDivElement;
        const blocks = Array.from({ length: 64 }, (_, i) => {
            const block = document.createElement("div");
            block.className = "block";
            block.textContent = `${i}`;
            return block;
        });
        wrapper.append(...blocks);
    })()
    //Check if block is in view
    function isInViewPort(block: HTMLDivElement) {
        const rect = block?.getBoundingClientRect();
        return rect?.top >= 0 && rect?.left >= 0 && rect.bottom <= document.documentElement.clientHeight && rect.right <= document.documentElement.clientWidth
    }
    //Detect blocks in view and print
    function detect() {
        const results: string[] = [];
        document.querySelectorAll<HTMLDivElement>(".block")
            .forEach(block => {
                if (isInViewPort(block)) {
                    results.push(block.textContent || "");
                }
            });
        console.log("Items In View: ", results);
    }

    const debounceScroll = debounce(detect, 500);

    window.addEventListener("scroll", debounceScroll, false);
})()