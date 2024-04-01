---
title: "Updating the `classnames` package for 2021"
date: 2021-01-08
tags:
  - "javascript"
  - "web"
---

I was recently using the invaluable [`classnames`](https://www.npmjs.com/package/classnames) tool in a project and thought to myself, what’s under the hood? Well here it is:

```
(function () {
  'use strict';

  var hasOwn = {}.hasOwnProperty;

  function classNames() {
    var classes = [];
    for (var i = 0; i < arguments.length; i++) {
      var arg = arguments[i];
      if (!arg) continue;
      var argType = typeof arg;
      if (argType === 'string' || argType === 'number') {
        classes.push(arg);
      } else if (Array.isArray(arg)) {
        if (arg.length) {
          var inner = classNames.apply(null, arg);
          if (inner) {
            classes.push(inner);
          }
        }
      } else if (argType === 'object') {
        if (arg.toString !== Object.prototype.toString) {
          classes.push(arg.toString());
        } else {
          for (var key in arg) {
            if (hasOwn.call(arg, key) && arg[key]) {
              classes.push(key);
            }
          }
        }
      }
    }

    return classes.join(' ');
  }

  if (typeof module !== 'undefined' && module.exports) {
    classNames.default = classNames;
    module.exports = classNames;
  } else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
    // register as 'classnames', consistent with npm package name
    define('classnames', [], function () {
      return classNames;
    });
  } else {
    window.classNames = classNames;
  }
}());
```

By looking at it, I'm guessing this code is ES3 compatible. This is on purpose and means without transpilation, the code can be run in just about any browser since IE 8. `Array.isArray` is the only reason it doesn’t run in anything older (and that can be polyfilled). But here is the thing, we’ve had a lot of cool additions to JavaScript since ES3, what would it look like in modern JavaScript? I wondered that myself, so here you go:

```
export function classNames(...args) {
  const classes = args.reduce((acc, arg) => {
    if (!arg) return acc;

    const argType = typeof arg;
    if (argType === "string" || argType === 'number') {
      acc.push(arg);
    } else if (Array.isArray(arg) && arg.length) {
      const inner = classNames(...arg);
      if (inner) acc.push(inner);
    } else if (argType === "object") {
      if (arg.toString !== Object.prototype.toString) {
        classes.push(arg.toString());
      } else {
        for (const [key, value] of Object.entries(arg)) {
          if (value) acc.push(key);
        }
      }
    }

    return acc
  }, [])

  return classes.join(' ');
}
```

I’ve reduced that code from 48 lines to 27 or 1310 characters to 726. That’s nearly half the size. Yay! Functionality should be identical, it’s all semantics that changed.

This got me thinking. Given the JS eco system is going through a migration to ES6 modules currently, I think it’s time there was a version of `classnames` that supported ES Modules. But because only modern browsers only support ES Modules that means this new code would be supported (or mostly). Modern JS **might** also perform better. So I’ll be looking into offering a PR to `classnames` that adds module support, and modernize the JavaScript for better performance and less bytes over the wire.

## UPDATE: Performance Benchmarks

They didn't go well. I'm using the [benchmarks](https://github.com/lukeed/clsx/tree/master/bench) in the `clsx` repository. `clsx` is an alternative to `classNames`. I'm just running these on my personal laptop with node `v14.15.4`. After Running tests I found 4 areas for improvement. I'll cover all the performance improvements below and the end with all the benchmarks.

### `array.join(' ')`

We're already iterating through the args once with the reduce...this join does so a second time. Instead We can modify our reducer to be a accumulator to be a string and append args. This significantly improves performance.

```
function append(acc, arg) {
  return acc + arg + " "
}

exports.noJoin = function classNames(...args) {
  return args.reduce((acc, arg) => {
    if (!arg) return acc;

    const argType = typeof arg;
    if (argType === "string" || argType === 'number') {
      acc = append(acc, arg);
    } else if (Array.isArray(arg) && arg.length) {
      const inner = classNames(...arg);
      if (inner) acc = append(acc, inner);
    } else if (argType === "object") {
      if (arg.toString !== Object.prototype.toString) {
        acc = append(acc, arg.toString());
      } else {
        for (const [key, value] of Object.entries(arg)) {
          if (value) acc = append(acc, key);
        }
      }
    }

    return acc
  }, '')
}
```

### `array.reduce(...)`

I was curious if a for loop would be faster...sure enough, it was again a measurable improvement.

```
exports.noReduce = function classNames(...args) {
  let classes = ""

  for (const arg of args) {
    if (!arg) continue;
    const argType = typeof arg;
    if (argType === "string" || argType === 'number') {
      classes = append(classes, arg);
    } else if (Array.isArray(arg) && arg.length) {
      const inner = classNames(...arg);
      if (inner) classes = append(classes, inner);
    } else if (argType === "object") {
      if (arg.toString !== Object.prototype.toString) {
        classes = append(classes, arg.toString());
      } else {
        for (const [key, value] of Object.entries(arg)) {
          if (value) classes = append(classes, key);
        }
      }
    }
  }

  return classes
}
```

### `arg.toString !== Object.prototype.toString`

I don't know why this line of code exists in the `classNames` library. I left it in my update cause I thought it may matter and it was a better direct comparison.

My guess is somewhere someone added a custom `toString` to their `Object` prototype. This allowed that custom `toString` to be called instead of the object being handled in the "normal" way.

Now I'm curious if `git blame` can help with this. BRB...Yup, I was correct... [https://github.com/JedWatson/classnames/pull/170](https://github.com/JedWatson/classnames/pull/170). Maybe there's a use case but at least `clsx` doesn't handles this situation so I'm not to worried about it.

### CLSX advantages

The one test `clsx` clearly beat out my updates is in `objects`. But I know why and I think `clsx` has a bug. When handling `objects` specifically they uses a `for...in` loop instead of `for...of` with `Object.entities()`. This means key's that are part of the `object` can get included...not something you want randomly added to your classes. Calling `Object.entities()` creates just enough overhead `clsx` performs better, but may have a bug.

## Results

I'm very happy with these results. I quite easily matched or beat `classnames` results. While other libraries often outperform my updates that wasn't my original goal. There is some room for improvement but considering this code is shorter and way more readable compared to `[clsx](https://github.com/lukeed/clsx/blob/master/src/index.js)` I'm happy with the results.

Here are the results:

```
# Strings
  classcat*       x 6,186,310 ops/sec ±0.67% (89 runs sampled)
  classnames      x 3,501,755 ops/sec ±0.88% (93 runs sampled)
  clsx (prev)     x 7,233,993 ops/sec ±0.30% (91 runs sampled)
  clsx            x 8,111,636 ops/sec ±0.25% (96 runs sampled)
  mine-original   x 2,799,886 ops/sec ±0.39% (96 runs sampled)
  mine-noJoin     x 6,779,248 ops/sec ±0.44% (95 runs sampled)
  mine-noReduce   x 7,078,812 ops/sec ±0.30% (94 runs sampled)
  mine-noObjCheck x 6,965,877 ops/sec ±0.36% (93 runs sampled)

# Objects
  classcat*       x 5,510,322 ops/sec ±0.45% (93 runs sampled)
  classnames      x 3,419,268 ops/sec ±0.23% (94 runs sampled)
  clsx (prev)     x 4,153,895 ops/sec ±0.67% (88 runs sampled)
  clsx            x 5,765,054 ops/sec ±0.87% (91 runs sampled)
  mine-original   x 2,141,475 ops/sec ±0.76% (95 runs sampled)
  mine-noJoin     x 3,146,063 ops/sec ±0.41% (95 runs sampled)
  mine-noReduce   x 3,519,887 ops/sec ±0.50% (93 runs sampled)
  mine-noObjCheck x 3,553,842 ops/sec ±0.44% (91 runs sampled)

# Arrays
  classcat*       x 5,234,652 ops/sec ±0.53% (92 runs sampled)
  classnames      x 1,753,297 ops/sec ±0.46% (98 runs sampled)
  clsx (prev)     x 5,168,463 ops/sec ±0.79% (91 runs sampled)
  clsx            x 5,778,139 ops/sec ±1.06% (93 runs sampled)
  mine-original   x 1,344,179 ops/sec ±0.76% (89 runs sampled)
  mine-noJoin     x 3,850,240 ops/sec ±0.47% (94 runs sampled)
  mine-noReduce   x 3,863,943 ops/sec ±1.19% (89 runs sampled)
  mine-noObjCheck x 3,835,394 ops/sec ±0.94% (89 runs sampled)

# Nested Arrays
  classcat*       x 4,201,828 ops/sec ±0.92% (90 runs sampled)
  classnames      x 1,052,590 ops/sec ±0.53% (90 runs sampled)
  clsx (prev)     x 4,216,418 ops/sec ±0.36% (94 runs sampled)
  clsx            x 4,572,854 ops/sec ±0.34% (94 runs sampled)
  mine-original   x 759,297 ops/sec ±0.37% (94 runs sampled)
  mine-noJoin     x 2,301,710 ops/sec ±0.27% (90 runs sampled)
  mine-noReduce   x 2,619,063 ops/sec ±0.25% (96 runs sampled)
  mine-noObjCheck x 2,610,460 ops/sec ±0.28% (93 runs sampled)

# Nested Arrays w/ Objects
  classcat*       x 4,368,391 ops/sec ±0.72% (91 runs sampled)
  classnames      x 1,647,880 ops/sec ±0.34% (89 runs sampled)
  clsx (prev)     x 4,051,660 ops/sec ±0.37% (97 runs sampled)
  clsx            x 4,778,679 ops/sec ±0.27% (92 runs sampled)
  mine-original   x 1,116,337 ops/sec ±0.22% (92 runs sampled)
  mine-noJoin     x 2,420,024 ops/sec ±0.80% (92 runs sampled)
  mine-noReduce   x 2,710,329 ops/sec ±0.30% (98 runs sampled)
  mine-noObjCheck x 2,688,791 ops/sec ±0.84% (92 runs sampled)

# Mixed
  classcat*       x 4,442,229 ops/sec ±0.79% (90 runs sampled)
  classnames      x 2,052,068 ops/sec ±0.45% (92 runs sampled)
  clsx (prev)     x 4,337,904 ops/sec ±0.47% (94 runs sampled)
  clsx            x 5,130,340 ops/sec ±0.47% (93 runs sampled)
  mine-original   x 1,402,928 ops/sec ±0.30% (96 runs sampled)
  mine-noJoin     x 2,850,388 ops/sec ±0.32% (91 runs sampled)
  mine-noReduce   x 3,226,104 ops/sec ±0.54% (94 runs sampled)
  mine-noObjCheck x 3,143,698 ops/sec ±0.26% (97 runs sampled)

# Mixed (Bad Data)
  classcat*       x 1,364,445 ops/sec ±0.71% (90 runs sampled)
  classnames      x 1,052,648 ops/sec ±0.47% (92 runs sampled)
  clsx (prev)     x 1,669,767 ops/sec ±0.40% (92 runs sampled)
  clsx            x 1,884,248 ops/sec ±0.51% (91 runs sampled)
  mine-original   x 665,626 ops/sec ±0.35% (95 runs sampled)
  mine-noJoin     x 879,206 ops/sec ±0.56% (93 runs sampled)
  mine-noReduce   x 980,827 ops/sec ±0.40% (96 runs sampled)
  mine-noObjCheck x 1,033,283 ops/sec ±0.41% (92 runs sampled)
```

If you'd like to see any of the code or run benchmarks yourself you can find them at [https://github.com/moonmeister/clsx/tree/mybenchmarks/bench](https://github.com/moonmeister/clsx/tree/mybenchmarks/bench)
