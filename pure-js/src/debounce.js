function debounce(fn, delay = 200) {
  let timerId;
  return function (...args) {
    console.log('Calling inner function');
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      console.log('Calling timeout function');
      fn.apply(this, args);
    }, delay);
  };
}

function debounceWithoutLastArgs(fn, delay = 300, options = { leading: true }) {
  let timerId;
  let leadingExecuted = false;

  return function (...args) {
    const context = this;

    const callLeading = options.leading && !leadingExecuted;

    if (timerId) clearTimeout(timerId);

    if (callLeading) {
      fn.apply(context, args); // Leading call
      leadingExecuted = true;
    }

    timerId = setTimeout(() => {
      // ❌ uses the args of THIS call, not necessarily the final one
      fn.apply(context, args);
      leadingExecuted = false;
    }, delay);
  };
}

function debounceWithLastArgs(fn, delay = 300, options = { leading: true }) {
  let timerId;
  let lastArgs;
  let leadingExecuted = false;

  return function (...args) {
    const context = this;
    lastArgs = args; // ✅ always remember latest args

    const callLeading = options.leading && !leadingExecuted;

    if (timerId) clearTimeout(timerId);

    if (callLeading) {
      fn.apply(context, args);
      leadingExecuted = true;
    }

    timerId = setTimeout(() => {
      if (!options.leading || lastArgs) {
        fn.apply(context, lastArgs); // ✅ always latest
      }
      leadingExecuted = false;
      lastArgs = null;
    }, delay);
  };
}

(function () {
  //   function search(query) {
  //     console.log('query:', query);
  //   }

  //   const debounceSearch = debounce(search, 500);

  //   let count = 0;
  //   const intervalId = setInterval(() => {
  //     debounceSearch(count);
  //     count++;
  //     if (count > 10) {
  //       clearInterval(intervalId);
  //     }
  //   }, 100);
  //   const log = debounceWithoutLastArgs(
  //     (val) => {
  //       console.log('Executed with:', val, 'at', Date.now());
  //     },
  //     500,
  //     { leading: true },
  //   );

  const log = debounceWithLastArgs(
    (val) => {
      console.log('Executed with:', val, 'at', Date.now());
    },
    500,
    { leading: true },
  );

  let count = 0;
  const intervalId = setInterval(() => {
    log(count);
    count++;
    if (count > 3) clearInterval(intervalId);
  }, 200);
})();
