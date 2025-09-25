async function wait(delay = 50) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}
//Approach 1: thenable
async function retry(
  promiseFn,
  retryCount = 4,
  delay = 50,
  failed = 'Retry Failed',
) {
  return new Promise((resolve, reject) => {
    return promiseFn()
      .then(resolve)
      .catch(async (error) => {
        if (retryCount > 0) {
          return wait(delay)
            .then(retry.bind(null, promiseFn, retryCount - 1, delay, failed))
            .then(resolve)
            .catch(reject);
        }
        return reject(failed);
      });
  });
}

const getTestFunc = () => {
  let callCounter = 0;
  return async () => {
    callCounter += 1;
    // if called less than 5 times
    // throw error
    if (callCounter < 5) {
      throw new Error('Not yet');
    }
  };
};

const test = async () => {
  await retry(getTestFunc(), 10);
  console.log('success');
  await retry(getTestFunc(), 3);
  console.log('will fail before getting here');
};

// test().catch(console.error);

// Approach 2: async/await
async function retry2(
  promiseFn,
  reties = 4,
  delay = 50,
  failed = 'Retry failed',
) {
  try {
    const response = await promiseFn();
    return response;
  } catch (error) {
    if (reties > 0) {
      await wait(delay);
      return await retry(promiseFn, reties - 1, delay, failed);
    } else {
      return Promise.reject(failed);
    }
  }
}

const test2 = async () => {
  await retry2(getTestFunc(), 10);
  console.log('success');
  await retry2(getTestFunc(), 3);
  console.log('will fail before getting here');
};

test2().catch(console.error);
