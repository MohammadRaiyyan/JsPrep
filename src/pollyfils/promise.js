/**
 * Promise.all();
 * 1. Returns a promise
 * 2. Promise will resolve with the result of all given promises or reject with the first rejected promise
 * 3. Results will be returned in the same order they were given
 */

function task1(time) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(time);
    }, time);
  });
}

function task2(time) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (time < 3000) {
        reject('Rejected');
      } else {
        resolve(time);
      }
    }, time);
  });
}


function myPromiseAll(promises) {
  const results = new Array(promises.length);
  let resolvedCount = 0;
  return new Promise((resolve, reject) => {
    /**
     * Invoking each promise iteratively synchronously which means all the promises will get invoked, and they will resolve one by one based on their execution time.
     */
    promises.forEach((promise, index) => {
      promise
        .then((res) => {
          resolvedCount++;
          /**
           * To maintain order of the result storing result on same position
           */
          results[index] = res;
          if (resolvedCount === promises.length) {
            resolve(results);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
}

/**
 * myPromiseAll([task1(200),task1(300),task1(100)]).then(values => {
 *   console.log(values);
 * }).catch((err)=>{
 *   console.log(err);
 * });
 */

/**
 * myPromiseAll([task2(1000),task2(5000),task2(3000)]).then(values => {
 *   console.log(values);
 *
 * }).catch((err)=>{
 *   console.log(err);
 * });
 */

/**
 * Promise.any();
 * 1. Takes array of promises, returns a new promise
 * 2. If any first promise which is resolved returns that
 * 2. If all the promises are rejected returns array of object having status of each promise
 */
function myPromiseAny(promises) {
  let rejectedCount = 0;
  let rejectedResults = new Array(promises.length);

  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      promise
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejectedCount++;
          rejectedResults[index] = new Error(err);
          if (rejectedCount === promises.length) {
            reject(rejectedResults);
          }
        });
    });
  });
}

/**
 * myPromiseAny([task2(200),task2(300),task2(100)]).then(values => {
 *   console.log(values);
 * }).catch((err)=>{
 *   console.log(err);
 * });
 */

/**
 * Promise.race();
 * 1. Takes array of promises, returns a new promise
 * 2. Returns as soon as any promise gets resolved or rejected
 */
function race(promises) {
  return new Promise((resolve, reject) => {
    promises
      .forEach((promise) => {
        resolve(promise);
      })
      .catch((err) => {
        reject(err);
      });
  });
}


/**
 * race([task2(3030), task2(3050),task2(2000)])
 *   .then(function (value) {
 *     console.log(value);
 *   })
 *   .catch(function (err) {
 *     console.log(err);
 *   });
 */

