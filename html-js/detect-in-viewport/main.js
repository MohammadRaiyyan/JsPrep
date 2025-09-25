(function () {
    //Debounce function
    function debounce(fn, delay) {
        var timerId;
        return function () {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            clearTimeout(timerId);
            timerId = setTimeout(function () { return fn.apply(_this, args); }, delay);
        };
    }
    //Create blocks and append in wrapper
    (function createBlocks() {
        var wrapper = document.querySelector(".wrapper");
        var blocks = Array.from({ length: 64 }, function (_, i) {
            var block = document.createElement("div");
            block.className = "block";
            block.textContent = "".concat(i);
            return block;
        });
        wrapper.append.apply(wrapper, blocks);
    })();
    //Check if block is in view
    function isInViewPort(block) {
        var rect = block === null || block === void 0 ? void 0 : block.getBoundingClientRect();
        return (rect === null || rect === void 0 ? void 0 : rect.top) >= 0 && (rect === null || rect === void 0 ? void 0 : rect.left) >= 0 && rect.bottom <= document.documentElement.clientHeight && rect.right <= document.documentElement.clientWidth;
    }
    //Detect blocks in view and print
    function detect() {
        var results = [];
        document.querySelectorAll(".block")
            .forEach(function (block) {
            if (isInViewPort(block)) {
                results.push(block.textContent || "");
            }
        });
        console.log("Items In View: ", results);
    }
    var debounceScroll = debounce(detect, 500);
    window.addEventListener("scroll", debounceScroll, false);
})();
