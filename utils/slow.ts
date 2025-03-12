export async function slow(ms: number = 1000) {
  await new Promise(resolve => {
    return setTimeout(resolve, ms);
  });
}
