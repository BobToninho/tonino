---
title: 1 small tip to improve your code readability
date: 2021-12-10
description: Describing a helpful method to write cleaner code.
layout: ../../layouts/PostLayout.astro
---

<!-- ([Kevin Du](https://www.pexels.com/it-it/@kevin-ku-92347) photo on [Pexels](https://www.pexels.com/)) -->

Code readability is important.

When you find yourself in situations like this one:

```javascript
function doSomething() {
  // some code...
  let needToDoALotOfThings = /* test */

  if (needToDoALotOfThings) {
    /*

       A good amount of code

    */
  }
}
```

you can refactor it in this way:

```javascript
function doSomething() {
  // some code...
  let needToDoALotOfThings = /* test */

  if (!needToDoALotOfThings) return

  /*

     A good amount of code

  */

}
```

or, even better:

```javascript
function doSomething() {
  // some code...
  let needToDoALotOfThings = /* test */

  if (!needToDoALotOfThings) throw new Error(/* error message */)

  /*

     A good amount of code

  */

}
```

The difference is **slight** but **significant**. By using this approach, you will have (at least) 2 advantages:

1. 1 less indentation level, that is always good;
2. Your condition is shrinked in 1 line of code, making the code easier to read in future reviews.

You obviously can't use this approach everywhere, it depends on the situation (as always), but it's a small correction that can save a bit of brain cells to the person that will read that snippet of code in the future.
