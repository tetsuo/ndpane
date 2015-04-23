var test = require('tape');
var ndpane = require('..');
var unpack = require('ndarray-unpack');

test('constraints', function (t) {
  t.plan(7);
  var tree = ndpane(2);
  t.deepEqual(unpack(tree.data),
    [
      [0, 0],
      [0, 0]
    ]
  );
  tree = tree.split().leafs[0];
  t.deepEqual(unpack(tree.data),
    [
      [0, 0]
    ]
  );
  t.throws(tree.split.bind(tree));
  t.doesNotThrow(tree.split.bind(tree, true));
  tree = tree.split(true).leafs[0];
  t.deepEqual(unpack(tree.data),
    [
      [0]
    ]
  );
  t.throws(tree.split.bind(tree));
  t.throws(tree.split.bind(tree, true));
});
