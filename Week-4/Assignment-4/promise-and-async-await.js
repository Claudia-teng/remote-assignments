// Promise
function delayedResultPromise(n1, n2, delayTime) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(n1 + n2);
    }, delayTime);
  });
}

delayedResultPromise(4, 5, 3000).then(console.log);

// async await
async function main() {
  const ans = await delayedResultPromise(-5, 10, 1000);
  console.log(ans);
}

main();
