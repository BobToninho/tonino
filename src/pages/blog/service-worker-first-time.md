---
title: 'Service Worker does not work intuitively during the first page load'
date: 2023-05-10
pubDate: 2023-05-10
description: Service Worker does not work intuitively during the first page load
layout: ../../layouts/PostLayout.astro
---

Service Workers have a strange – but logical? – behaviour the first time they get loaded in the page. The [Service Worker lifecycle](https://web.dev/service-worker-lifecycle/) can be less than intuitive sometimes.

Let's go back to my (and my collaborator) app requirements. We need to load a page and cache all the assets that are loaded on that page (`.html`, `.css`, `.js` but also `.png`, `jpg`, etc... files), in order to make them available offline if the internet connection magically disappears and the user needs to reload the page. A specialty of our app is that there is a root login page that redirects to a subfolder once the user has correctly logged in. In each subfolder lies a different web app. Actually, the apps are very similar, but just because a lot of code is shared.

This last bit of information prevents us to precache our files as it would not be possible to put the generated hash into the service worker file, being it in the login page. We tried then to fool the service worker, but it turns out he won.

Turns out one can get all the loaded resources by using the [Performance API](https://developer.mozilla.org/en-US/docs/Web/API/Performance/getEntriesByType). We decided to get all the loaded resources in the page after the `load` event is fired, filter them and finally cache them. To keep things together and not spread them in different web apps, we wanted to do all the caching stuff in the service worker file. So we tried to use the [`postMessage` method](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorker/postMessage) to send the loaded resources URLs to the service worker and cache them. But the **first time the page loaded** the `message` event listener would not get called. Bummer.
