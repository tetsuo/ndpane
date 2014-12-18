var ndarray = require('ndarray');

module.exports = ndpane;

function ndpane (data, key) {
  if (!(this instanceof ndpane)) return new ndpane(data, key);
  this.data = data;
  this.nx = data.shape[0];
  this.ny = data.shape[1];
  this.leafs = null;
  this.key = key || 0;
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
    key = leaf.offset + 1;
    for (var i = 0; i < leaf.shape[0]; ++i) {
      for (var j = 0; j < leaf.shape[1]; ++j) {
        leaf.set(i, j, key);
      }
    }
    self.leafs[k] = ndpane(leaf, key);
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
