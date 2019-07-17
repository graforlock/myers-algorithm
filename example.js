// @flow

import tracePath from './dist/index-es6.js'

var nodeA = document.querySelector('#node-1')
var nodeB = document.querySelector('#node-2')

var oldChildren = nodeA ? nodeA.childNodes : []
var newChildren = nodeB ? nodeB.childNodes : []
var diffPath = []

function applyDiff (parent, a, b, diff, update) {
  var offsetA = 0
  var offsetB = 0
  for (var i = 0; i < diff.length; i++) {
    if (diff[i] === 'DELETE') {
      parent.removeChild(a[i + offsetA])
      --offsetA
      --offsetB
    } else if (diff[i] === 'INSERT') {
      parent.insertBefore(b[i + offsetB], a[i + offsetA])
      --offsetB
    } else {
      update(a[i + offsetA], b[i + offsetB])
    }
  }
}

function canPatch (nodeA, nodeB) {
  if (nodeA.nodeName === nodeB.nodeName) return true

  return false
}

if(nodeA !== null) {
  tracePath(oldChildren, newChildren, function (px, py, x, y) {
    if (x === px) {
      diffPath.unshift('INSERT')
    } else if (y === py) {
      diffPath.unshift('DELETE')
    } else {
      diffPath.unshift('UPDATE')
    }
  }, canPatch)
  
  applyDiff(nodeA, oldChildren, newChildren, diffPath, function (a, b) {
    a.textContent = b.textContent
  })
  
}

window.tracePath = tracePath;


