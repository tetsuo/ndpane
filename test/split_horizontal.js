var test = require('tap').test;
var ndpane = require('..');
var ndarray = require('ndarray');
var unpack = require('ndarray-unpack');

var ROWS = 4, COLS = 4;

test('split horizontally', function (t) {
  t.plan(1);
  var arr = ndarray(new Uint8Array(ROWS * COLS), [ROWS, COLS]);
  var pane = ndpane(arr);
  pane.split();
  var actual = unpack(arr);
  var expected = [
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [9, 9, 9, 9],
    [9, 9, 9, 9]
  ];
  t.deepEqual(actual, expected);
});
