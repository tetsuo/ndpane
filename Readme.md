# ndpane

turn an ndarray into a splitpane

# example

```
var nx = 4, ny = 4;
var arr = ndarray(new Uint8Array(nx * ny), [nx, ny]);
pane = ndpane(arr);
pane.split(); // split horizontally into two leafs
pane.leafs[1].split(true); // split bottom half vertically
```

Resulting 2d array:

```
[1, 1,  1,  1],
[1, 1,  1,  1],
[9, 9, 11, 11],
[9, 9, 11, 11],
```

# api

## .split()

Split horizontally

## .split(true)

Split vertically

## .merge()

Merge leafs
