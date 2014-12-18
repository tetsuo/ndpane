var test = require('tap').test;
var ndpane = require('..');
var ndarray = require('ndarray');
var unpack = require('ndarray-unpack');

var ROWS = 4, COLS = 4;

test('split leafs', function (t) {
  t.plan(4);
  var arr = ndarray(new Uint8Array(ROWS * COLS), [ROWS, COLS]);
  var pane = ndpane(arr);
  pane.split(true);

  pane.leafs[0].split();
  t.deepEqual(unpack(arr), 
    [
      [1, 1, 3, 3],
      [1, 1, 3, 3],
      [9, 9, 3, 3],
      [9, 9, 3, 3]
    ]
  );

  pane.leafs[1].split(true);
  t.deepEqual(unpack(arr), 
    [
      [1, 1, 3, 4],
      [1, 1, 3, 4],
      [9, 9, 3, 4],
      [9, 9, 3, 4]
    ]
  );

  pane.leafs[1].leafs[0].split();
  t.deepEqual(unpack(arr), 
    [
      [1, 1,  3, 4],
      [1, 1,  3, 4],
      [9, 9, 11, 4],
      [9, 9, 11, 4]
    ]
  );

  pane.leafs[0].leafs[1].split();
  t.deepEqual(unpack(arr), 
    [
      [1,   1,  3, 4],
      [1,   1,  3, 4],
      [9,   9, 11, 4],
      [13, 13, 11, 4]
    ]
  );

});
