export async function sleep(ms: number) {
  return new Promise(res => setTimeout(res, ms));
}

export async function typeText(text: string, delay = 5) {
  for (const char of text) {
    process.stdout.write(char);
    await new Promise(res => setTimeout(res, delay));
  }
  console.log();
}
