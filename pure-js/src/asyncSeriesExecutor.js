//Execute promises in chain one after other
//Approach 1: Using async / await
async function asyncSeriesExecutor(promises) {
  for (const promise of promises) {
    try {
      const result = await promise;
      console.log(`Result: `, result);
    } catch (error) {
      console.log('Error: ', error);
    }
  }
}

const asyncTask = function (i) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(`Completing ${i}`), 100 * i);
  });
};

// asyncSeriesExecutor([asyncTask(3), asyncTask(4), asyncTask(1), asyncTask(7)]);

//Approach 2: Using recursion

async function asyncSeriesExecutorRecursive(promises) {
  const promise = promises.shift();
  const response = await promise;
  console.log('Response: ', response);
  if (promises.length > 0) {
    asyncSeriesExecutorRecursive(promises);
  }
}
// asyncSeriesExecutorRecursive([
//   asyncTask(3),
//   asyncTask(4),
//   asyncTask(1),
//   asyncTask(7),
// ]);

//Approach 3: Using reduce method
async function asyncSeriesExecutorReduce(promises) {
  promises.reduce((acc, curr) => {
    return acc.then(() => {
      return curr.then((response) => console.log('Response: ', response));
    });
  }, Promise.resolve());
}
asyncSeriesExecutorReduce([
  asyncTask(3),
  asyncTask(4),
  asyncTask(1),
  asyncTask(7),
]);
