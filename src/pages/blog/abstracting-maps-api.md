---
title: Abstracting a maps client like Mapbox or Google Maps
date: 2021-12-21
draft: true
description: Using abstractions to help maintain huge APIs like the maps' ones.
categories:
  - maps
  - clean code
layout: ../../layouts/PostLayout.astro
---

At work, we recently started switching from using Google Maps to Mapbox to display our products' data.

While doing the refactor, I noticed that the `mapbox` code was too tighlty coupled with the component we were building. This is exactly why the refactor took me a quite long amount of time. You need to make sure that everything behaves the same way as before, and if you have a lot of tightly coupled code this is not an easy task.

What helped me in the process was the old fashioned concept of _abstractions_. Why directly use the `mapbox` third party code in our component when we can abstract it away and use something we made?

This is exactly what I have done. We not want third party code in our main code. Third party code bad.

To solve this problem I took the following approach, which I think can be extracted and used for a lot of situations:

1. Analyze the third party code usage that is currently present
2. Note down the common patterns
3. Write **pseudo code** for the API that will be used, without too much stress on method names and stuff

At this moment you will have something like an `interface` that describes the common patterns of usage of that third party code. Note that this interface is purposely very tight to your application. The goal of this task is not make the code more reusable, but more maintainable and easy to navigate through.
