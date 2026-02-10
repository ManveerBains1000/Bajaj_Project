
function isPrime(value) {
  if (!Number.isInteger(value) || value <= 1) return false;

  if (value <= 3) return true;

  if (value % 2 === 0 || value % 3 === 0) return false;

  for (let i = 5; i * i <= value; i += 6) {
    if (value % i === 0 || value % (i + 2) === 0) return false;
  }

  return true;
}

function fibonacci(n) {
  if (!Number.isInteger(n) || n <= 0) return [];

  const series = [];
  for (let i = 0; i < n; i++) {
    if (i === 0) series.push(0);
    else if (i === 1) series.push(1);
    else series.push(series[i - 1] + series[i - 2]);
  }
  return series;
}
function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}


function hcf(arr) {
  return arr.reduce((acc, val) => gcd(acc, val));
}

function lcmOfTwo(a, b) {
  return Math.abs(a * b) / gcd(a, b);
}

function lcm(arr) {
  return arr.reduce((acc, val) => lcmOfTwo(acc, val));
}

module.exports = { fibonacci, lcm, hcf,isPrime };
