var test = require('tap').test;
var ndpane = require('..');
var ndarray = require('ndarray');
var unpack = require('ndarray-unpack');

var ROWS = 4, COLS = 4;

test('merge', function (t) {
  t.plan(3);
  var arr = ndarray(new Uint8Array(ROWS * COLS), [ROWS, COLS]);
  var pane = ndpane(arr);
  pane.split(true);
  pane.leafs[1].split();
  pane.leafs[1].leafs[0].split(true);

  pane.leafs[1].leafs[0].merge();
  t.deepEqual(unpack(arr), 
    [
      [1, 1,  3,  3],
      [1, 1,  3,  3],
      [1, 1, 11, 11],
      [1, 1, 11, 11]
    ]
  );

  pane.leafs[1].merge();
  t.deepEqual(unpack(arr), 
    [
      [1, 1, 3, 3],
      [1, 1, 3, 3],
      [1, 1, 3, 3],
      [1, 1, 3, 3]
    ]
  );

  pane.merge();
  t.deepEqual(unpack(arr), 
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]
  );
});
