// Copyright 2018-2025 the Deno authors. MIT license.
// deno-lint-ignore-file no-console no-process-global

const queueMicrotask = globalThis.queueMicrotask || process.nextTick;
let [total, count] = typeof Deno !== "undefined"
  ? Deno.args
  : [process.argv[2], process.argv[3]];

total = total ? parseInt(total, 0) : 50;
count = count ? parseInt(count, 10) : 10000;

async function bench(fun) {
  const start = Date.now();
  for (let i = 0; i < count; i++) await fun();
  const elapsed = Date.now() - start;
  const rate = Math.floor(count / (elapsed / 1000));
  console.log(`time ${elapsed} ms rate ${rate}`);
  if (--total) queueMicrotask(() => bench(fun));
}

bench(() => Deno.writeFile("/dev/null", new Uint8Array(10)));
// const fs = require("fs").promises;
// bench(() => fs.writeFile("/dev/null", new Uint8Array(10)));
