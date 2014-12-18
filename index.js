var ndarray = require('ndarray');

module.exports = ndpane;

function ndpane (data) {
  if (!(this instanceof ndpane)) return new ndpane(data);
  if (Array.isArray(data)) {
    this.data = ndarray(new Uint8Array(data[0] * data[1]), data);
  } else
    this.data = data;
  this.key = 0;
  this.nx = this.data.shape[0];
  this.ny = this.data.shape[1];
  this.leafs = null;
}

ndpane.prototype.split = function (vertical) {
  var arr = this.data,
    nx = this.nx, ny = this.ny, p = [null, null];
  if (vertical) {
    ny = this.ny>>1;
    p[1] = [0, ny];
  } else {
    nx = this.nx>>1;
    p[1] = [nx, 0];
  }
  p[0] = [nx, ny];
  this.leafs = [arr.hi.apply(arr, p[0]), arr.lo.apply(arr, p[1])];
  var self = this;
  this.leafs.forEach(function (leaf, k) {
    var key = leaf.offset + 1, pane;
    for (var i = 0; i < leaf.shape[0]; ++i) {
      for (var j = 0; j < leaf.shape[1]; ++j) {
        leaf.set(i, j, key);
      }
    }
    pane = ndpane(leaf);
    pane.key = key;
    self.leafs[k] = pane;
  });
};

ndpane.prototype.merge = function () {
  this.leafs = null;
  for (var i = 0; i < this.nx; ++i) {
    for (var j = 0; j < this.ny; ++j) {
      this.data.set(i, j, this.key);
    }
  }
};
