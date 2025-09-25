async function asyncParallel(asyncTasks, callback) {
  const results = [];
  let completedTasks = 0;
  asyncTasks.forEach((asyncTask) => {
    asyncTask((value) => {
      results.push(value);
      completedTasks++;

      if (completedTasks >= asyncTasks.length) {
        callback(results);
      }
    });
  });
}

function createAsyncTask() {
  const value = Math.floor(Math.random() * 10);
  return function (callback) {
    setTimeout(() => {
      callback(value);
    }, value * 1000);
  };
}

asyncParallel(
  [
    createAsyncTask(),
    createAsyncTask(),
    createAsyncTask(),
    createAsyncTask(),
    createAsyncTask(),
    createAsyncTask(),
    createAsyncTask(),
  ],
  (results) => console.log('Results:', results),
);
