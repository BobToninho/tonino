# How to fix express-js CORS requests that use req.session.id

[comment]: <> (# How to fix express-js CORS requests that use req.session.id)

I had a problem: I had an express-js server serving the frontend by directly serving an HTML page.
For the frontend development, I was using a dev script which, using Rollup, bundled js (and css and imgs and etc...)
in a single file. I decided to switch to Vite js for better developer experience, but I faced a problem I didn't
expect: when setting up CORS permissions (by using express' middleware), the frontend did not work properly. I will
not go into details of the code.

The problem was that the server used, for some requests, the `req.session.id`
string as a common ground for storing some (important!) information. In the previous setting, this string remained
unique among all the requests coming from the frontend, but at this point it was not the case anymore.

To resolve this problem, it was simply necessary to add the following option when calling the `fetch` function (to
all of them):

```js
fetch('endpoint', {
	credentials: 'include',
})
```

(And obviously enabling credentials in the CORS middleware:)

```js
app.use(
	cors({
		credentials: true,
	}),
)
```

This fix, in some way that I'm still not 100% sure, helps keeping the same `req.session.id` by passing in the HTTP
headers the necessary cookies.
