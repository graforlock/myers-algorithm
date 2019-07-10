// @flow

interface Enumerable<T> {
  length: number;
  [number]: T;
}

type Callback = (x1: number, y1: number, x2: number, y2: number) => void;

type Comparator<T> = (x: T, y: T) => boolean;

type Matrix = Array<Array<number>>;

function diff<T> (a: Enumerable<T>, b: Enumerable<T>, cmp: Comparator<T>): Matrix  {
  cmp = cmp || function (a, b) { return a === b }
  var n = a.length
  var m = b.length
  var max = n + m
  var v = Array(2 * max + 1)
  var len = v.length
  var trace = []
  var k, x, y, addK, remK, _k
  v[1] = 0

  for (var d = 0; d <= max; d++) {
    trace.push(v.slice(0))
    for (k = -d; k <= d; k += 2) {
      addK = k + 1 < 0 ? len - Math.abs(k + 1) : k + 1
      remK = k - 1 < 0 ? len - Math.abs(k - 1) : k - 1
      _k = k < 0 ? len - Math.abs(k) : k

      if (k === -d || (k !== d && (v[remK] < v[addK]))) {
        x = v[addK]
      } else {
        x = v[remK] + 1
      }

      y = x - k

      while (x < n && y < m && cmp(a[x], b[y])) {
        x = x + 1
        y = y + 1
      }

      v[_k] = x

      if (x >= n && y >= m) return trace
    }
  }

  return trace
}

function tracePath<T> (a: Enumerable<T>, b: Enumerable<T>, cb: Callback, cmp: Comparator<T>) {
  var x: number = a.length
  var y: number = b.length
  var k, addK, remK, prevX, prevY, prevK, _prevK

  var shortestEdit: Matrix = diff(a, b, cmp)

  for (var d = shortestEdit.length - 1; d >= 0; d--) {
    var v: Array<number> = shortestEdit[d]
    var len = v.length

    k = x - y

    addK = k + 1 < 0 ? len - Math.abs(k + 1) : k + 1
    remK = k - 1 < 0 ? len - Math.abs(k - 1) : k - 1

    if (k === -d || (k !== d && (v[remK] < v[addK]))) {
      prevK = k + 1
      _prevK = addK
    } else {
      prevK = k - 1
      _prevK = remK
    }

    prevX = v[_prevK]
    prevY = prevX - prevK

    while (x > prevX && y > prevY) {
      cb(x - 1, y - 1, x, y)
      x = x - 1
      y = y - 1
    }

    if (d > 0) cb(prevX, prevY, x, y)

    x = prevX
    y = prevY
  }
}

export default tracePath
