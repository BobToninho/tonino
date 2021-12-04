---
title: Sintassi delle funzioni Typescript
date: 2021-02-25
description: La sintassi per varie funzioni e tipi di funzioni in TypeScript con l'aggiunta di semplici esempi.
categories:
  - typescript
meta:
  keywords:
    - typescript
    - functions
    - type definitions
    - type declarations
    - function type annotations
# bannerCloudinaryId: unsplash/photo-1488554378835-f7acf46e6c98
# bannerCredit: Photo by [hao wang](https://unsplash.com/photos/pVq6YhmDPtk)
layout: ../../layouts/PostLayout.astro
---

_Nota 1: questo articolo è stato tradotto dall'aricolo originale "[TypeScript Function Syntaxes](https://kentcdodds.com/blog/typescript-function-syntaxes)" di [Kent C. Dodds](https://twitter.com/kentcdodds)._

_Nota 2: gli snippet di codice non vengono tradotti, in quanto considero lo scrivere codice in italiano una bad practice :)_

In JavaScript esistono molti modi di scrivere le funzioni. Aggiungici TypeScript e all'improvviso c'è molto a cui pensare. Dunque, con l'aiuto di [qualche](https://gist.github.com/kentcdodds/61176c067ec5250b5bd3c7fe57a0120d)
[amico](https://twitter.com/kentcdodds/status/1365046763892084736), ho messo insieme questa lista di varie forme di funzioni che solitamente ti serviranno, insieme a semplici esempi.

Tieni a mente che ci sono MOLTISSIME combinazioni di sintassi differenti. Includerò soltanto le combinazioni meno ovvie o in qualche maniera uniche.

Prima di tutto, la confusione più grande che ho per quanto riguarda la sintassi delle cose è dove mettere il _return type_ dalla funzione. Quando devo usare `:` e quando devo usare `=>`. Qua sotto ci sono un paio di esempi veloci che potrebbero velocizzarti se stai usando questo post come reference:

```ts
// Simple type for a function, use =>
type FnType = (arg: ArgType) => ReturnType

// Every other time, use :
type FnAsObjType = {
	(arg: ArgType): ReturnType
}
interface InterfaceWithFn {
	fn(arg: ArgType): ReturnType
}

const fnImplementation = (arg: ArgType): ReturnType => {
	/* implementation */
}
```

Penso che questa fosse una delle maggiori fonti di confusioni per me. Avendo scritto ciò, ora so che l'unica volta che uso `=> ReturnType` è quando sto definendo un _function type_ come tipo indipendente. In qualsiasi altro caso, usa `: ReturnType`.

Continua a leggere per qualche esempio su come questo entra in gioco in tipici esempi di codice.

## Function declarations (dichiarazioni di funzioni)

```ts
// inferred return type
function sum(a: number, b: number) {
	return a + b
}
```

```ts
// defined return type
function sum(a: number, b: number): number {
	return a + b
}
```

Nei seguenti esempio, useremo _return types_ specifici, ma tecnicamente non è necessario specificarli.

## Function Expression (espressioni di funzioni)

```ts
// named function expression
const sum = function sum(a: number, b: number): number {
	return a + b
}
```

```ts
// annonymous function expression
const sum = function (a: number, b: number): number {
	return a + b
}
```

```ts
// arrow function
const sum = (a: number, b: number): number => {
	return a + b
}
```

```ts
// implicit return
const sum = (a: number, b: number): number => a + b
```

```ts
// implicit return of an object requires parentheses to disambiguate the curly braces
const sum = (a: number, b: number): { result: number } => ({ result: a + b })
```

Puoi anche aggiungere le _type annotations_ vicine alla variabile, così facendo la funzione prenderà quei tipi:

```ts
const sum: (a: number, b: number) => number = (a, b) => a + b
```

E puoi estrarre quel tipo:

```ts
type MathFn = (a: number, b: number) => number
const sum: MathFn = (a, b) => a + b
```

Oppure puoi usare la _object type syntax_:

```ts
type MathFn = {
	(a: number, b: number): number
}
const sum: MathFn = (a, b) => a + b
```

Che può risultare utile se tu volessi aggiungere una proprietà tipizzata alla funzione:

```ts
type MathFn = {
	(a: number, b: number): number
	operator: string
}
const sum: MathFn = (a, b) => a + b
sum.operator = '+'
```

Ciò può essere fatto anche con un'interfaccia

```ts
interface MathFn {
	(a: number, b: number): number
	operator: string
}
const sum: MathFn = (a, b) => a + b
sum.operator = '+'
```

Ci sono poi `declare function` e `declare namespace` che vogliono dire: "Hey, esiste una variabile con questo nome e questo tipo". Possiamo usare ciò per creare il tipo e poi utilizzare `typeof` per assegnare quel tipo alla nostra funzione. Troverai usato spesso `declare` in file `.d.ts` per dichiarare i tipi delle librerie.

```ts
declare function MathFn(a: number, b: number): number
declare namespace MathFn {
	let operator: '+'
}
const sum: typeof MathFn = (a, b) => a + b
sum.operator = '+'
```

Se dovessi scegliere tra `type`, `interface`, e `declare function`, personalmente preferisco `type`, a meno che io non abbia bisogno dell'estensibilità offertami da `interface`. Userei `declare` soltanto se volessi _veramente_ comunicare al compilatore che qualcosa esiste e del quale lui non ne è a conoscenza (come ad esempio una libreria).

## Parametri opzionali / di default

Parametro opzionale:

```ts
const sum = (a: number, b?: number): number => a + (b ?? 0)
```

Nota che l'ordine qui è importante. Se rendi un parametro opzionale, tutti i parametri seguenti **devono** essere opzionali. Questo accade perché è possibile chiamare `sum(1)` ma non `sum(, 2)`. Tuttavia, è possibile chiamare `sum(undefined, 2)` e se è ciò che vuoi rendere possibile, allora puoi farlo:

```ts
const sum = (a: number | undefined, b: number): number => (a ?? 0) + b
```

**Parametri opzionali**

Mentre stavo scrivendo ciò, pensavo che fosse inutile usare parametri di default senza rendere quel parametro opzionale, ma a quanto pare quando ha un valore di default, TypeScript lo tratta come un parametro opzionale. Di conseguenza, questo funziona:

```ts
const sum = (a: number, b: number = 0): number => a + b
sum(1) // results in 1
sum(2, undefined) // results in 2
```

Di conseguenza quell'esempio è equialente a:

```ts
const sum = (a: number, b: number | undefined = 0): number => a + b
```

Oggi ho imparato qualcosa.

Curiosamente, questo significa che se vuoi che il primo argomento sia opzionale ma il secondo richiesto, puoi farlo senza utilizzare `| undefined`:

```ts
const sum = (a: number = 0, b: number): number => a + b
sum(undefined, 3) // results in 3
```

Tuttavia, quando estrai quel tipo, avrai bisogno di aggiungere `| undefined` a mano, dato che `= 0` è un _expression_, non un tipo.

```ts
type MathFn = (a: number | undefined, b: number) => number
const sum: MathFn = (a = 0, b) => a + b
```

## Rest params (parametri rest)

I parametri rest sono una feature di JavaScript che ti permette di raggruppare il "resto" degli argomenti di una chiamata di funzione in un array. Puoi usarli in qualsiasi posizione (primi, secondi, ecc...). L'unico requisito è che siano gli _ultimi_ parametri.

```ts
const sum = (a: number = 0, ...rest: Array<number>): number => {
	return rest.reduce((acc, n) => acc + n, a)
}
```

E puoi estrarre il tipo:

```ts
type MathFn = (a?: number, ...rest: Array<number>) => number
const sum: MathFn = (a = 0, ...rest) => rest.reduce((acc, n) => acc + n, a)
```

## Object properties e metodi

Object method:

```ts
const math = {
	sum(a: number, b: number): number {
		return a + b
	}
}
```

Proprietà come una _function expression_:

```ts
const math = {
	sum: function sum(a: number, b: number): number {
		return a + b
	}
}
```

Proprietà come una _arrow function expression_ (con return implicito):

```ts
const math = {
	sum: (a: number, b: number): number => a + b
}
```

Sfortunatamente, per estrarre quel tipo non puoi tipizzare la funzione stessa, ma devi tipizzare l'oggetto. Non puoi annotare la funzione con un tipo quando è definita in un _object literal_.

```ts
type MathFn = (a: number, b: number) => number

const math: { sum: MathFn } = {
	sum: (a, b) => a + b
}
```

Inoltre, se volessi aggiungere una proprietà come alcuni degli esempi precedenti, è impossibile da fare nell'_object literal_. Devi estrarre la funzione completamente:

```ts
type MathFn = {
	(a: number, b: number): number
	operator: string
}
const sum: MathFn = (a, b) => a + b
sum.operator = '+'

const math = { sum }
```

Potresti aver notato che questo semplice esempio è identico ad un altro esempio qui sopra, con la sola aggiunta di `const math = {sum}`. Quindi si, non c'è alcun modo di fare tutto questo in linea on la _object declaration_.

## Classi

Le classi sono loro stesse funzioni, ma sono speciali (devono essere invocate con `new`), ma questa sezione discuterà di come le funzioni sono definite nel corpo della classe.

Qua sotto c'è un metodo, la forma più comune di funzione nel corpo di una classe:

```ts
class MathUtils {
	sum(a: number, b: number): number {
		return a + b
	}
}

const math = new MathUtils()
math.sum(1, 2)
```

Puoi anche usare un membro della classe se vuoi che la funzione sia legata alla specifica istanza della classe:

```ts
class MathUtils {
	sum = (a: number, b: number): number => {
		return a + b
	}
}

// doing things this way this allows you to do this:
const math = new MathUtils()
const sum = math.sum
sum(1, 2)

// but it also comes at a cost that offsets any perf gains you get
// by going with a class over a regular object factor so...
```

Poi, puoi estrarre questi tipi. Questo è il risultato per la versione del metodo del primo esempio:

```ts
interface MathUtilsInterface {
	sum(a: number, b: number): number
}

class MathUtils implements MathUtilsInterface {
	sum(a: number, b: number): number {
		return a + b
	}
}
```

Interestingly, it looks like you still have to define the types for the
function, even though those are a part of the interface it's supposed to
implement 🤔 🤷‍♂️

One final note. In TypeScript, you also get `public`, `private`, and
`protected`. I personally don't use classes all that often and I don't like
using those particular TypeScript features. JavaScript will soon get special
syntax for `private` members which is neat
([learn more](https://github.com/tc39/proposal-class-fields)).

## Modules

Importing and exporting function definitions works the same way as it does with
anything else. Where things get unique for TypeScript is if you want to write a
`.d.ts` file with a module declaration. Let's take our `sum` function for
example:

```ts
const sum = (a: number, b: number): number => a + b
sum.operator = '+'
```

Here's what we'd do assuming we export it as the default:

```ts
declare const sum: {
	(a: number, b: number): number
	operator: string
}
export default sum
```

And if we want it to be a named export:

```ts
declare const sum: {
	(a: number, b: number): number
	operator: string
}
export { sum }
```

## Overloads

I've written about this especially and you can read that:
[Define function overload types with TypeScript](/blog/define-function-overload-types-with-type-script).
Here's the example from that post:

```ts
type asyncSumCb = (result: number) => void
// define all valid function signatures
function asyncSum(a: number, b: number): Promise<number>
function asyncSum(a: number, b: number, cb: asyncSumCb): void
// define the actual implementation
// notice cb is optional
// also notice that the return type is inferred, but it could be specified
// as `void | Promise<number>`
function asyncSum(a: number, b: number, cb?: asyncSumCb) {
	const result = a + b
	if (cb) return cb(result)
	else return Promise.resolve(result)
}
```

Basically what you do is define the function multiple times and only actually
implement it the last time. It's important that the types for the implementation
supports all the override types, which is why the `cb` is optional above`.

## Generators

I've not once used a generator in production code... But when I played around
with it a bit in the TypeScript playground there wasn't much to it for the
simple case:

```ts
function* generator(start: number) {
	yield start + 1
	yield start + 2
}

var iterator = generator(0)
console.log(iterator.next()) // { value: 1, done: false }
console.log(iterator.next()) // { value: 2, done: false }
console.log(iterator.next()) // { value: undefined, done: true }
```

TypeScript correctly infers that `iterator.next()` returns an object with the
following type:

```ts
type IteratorNextType = {
	value: number | void
	done: boolean
}
```

If you want type safety for the `yield` expression completion value, add a type
annotation to the variable you assign it to:

```ts [2]
function* generator(start: number) {
	const newStart: number = yield start + 1
	yield newStart + 2
}

var iterator = generator(0)
console.log(iterator.next()) // { value: 1, done: false }
console.log(iterator.next(3)) // { value: 5, done: false }
console.log(iterator.next()) // { value: undefined, done: true }
```

And now if you try to call `iterator.next('3')` instead of the
`iterator.next(3)` you'll get a compilation error 🎉

## Async

`async/await` functions in TypeScript work exactly the same as they do in
JavaScript and the _only_ difference in typing them is the return type will
_always_ be a `Promise` generic.

```ts
const sum = async (a: number, b: number): Promise<number> => a + b
```

```ts
async function sum(a: number, b: number): Promise<number> {
	return a + b
}
```

## Generics

With a function declaration:

```ts
function arrayify2<Type>(a: Type): Array<Type> {
	return [a]
}
```

Unfortunately, with an arrow function (when TypeScript is configured for JSX),
the opening `<` of the function is ambiguous to the compiler. "Is that generic
syntax? Or is that JSX?" So you have to add a little something to help it
disambiguate it. I think the most straightforward thing to do is to have it
`extends unknown`:

```ts
const arrayify = <Type extends unknown>(a: Type): Array<Type> => [a]
```

Which conveniently shows us the syntax for `extends` in generics, so there you
go.

## Type Guards

A type guard is a mechanism for doing type narrowing. For example, it allows you
to narrow something that is `string | number` down to either a `string` or a
`number`. There are built-in mechanisms for this (like `typeof x === 'string'`),
but you can make your own too. Here's one of my favorites (hat tip to
[my friend Peter](https://twitter.com/aprillion0042) who originally showed this
to me):

You have an array with some falsy values and you want those gone:

```ts
// Array<number | undefined>
const arrayWithFalsyValues = [1, undefined, 0, 2]
```

In regular JavaScript you can do:

```ts
// Array<number | undefined>
const arrayWithoutFalsyValues = arrayWithFalsyValues.filter(Boolean)
```

Unfortunately, TypeScript doesn't consider this a type narrowing guard, so the
type is still `Array<number | undefined>` (no narrowing applied).

So we can write our own function and tell the compiler that it returns
true/false for whether the given argument is a specific type. For us, we'll say
that our function returns true if the given argument's type is not included in
one of the falsy value types.

```ts
type FalsyType = false | null | undefined | '' | 0
function typedBoolean<ValueType>(value: ValueType): value is Exclude<ValueType, FalsyType> {
	return Boolean(value)
}
```

And with that we can do this:

```ts
// Array<number>
const arrayWithoutFalsyValues = arrayWithFalsyValues.filter(typedBoolean)
```

Woo!

## Assertion functions

You know how sometimes you do runtime checking to be extra-sure of something?
Like, when an object can have a property with a value or `null` you want to
check if it's `null` and maybe throw an error if it is `null`. Here's how you
might do something like that:

```ts
type User = {
	name: string
	displayName: string | null
}

function logUserDisplayNameUpper(user: User) {
	if (!user.displayName) throw new Error('Oh no, user has no displayName')
	console.log(user.displayName.toUpperCase())
}
```

TypeScript is fine with `user.displayName.toUpperCase()` because the `if`
statement is a type guard that it understands. Now, let's say you want to take
that `if` check and put it in a function:

```ts
type User = {
	name: string
	displayName: string | null
}

function assertDisplayName(user: User) {
	if (!user.displayName) throw new Error('Oh no, user has no displayName')
}

function logUserDisplayName(user: User) {
	assertDisplayName(user)
	console.log(user.displayName.toUpperCase())
}
```

Now, TypeScript is no longer happy because the call to `assertDisplayName` isn't
a sufficient type guard. I'd argue this is a limitation on TypeScript's part.
Hey, no tech is perfect. Anyway, we can help TypeScript out a bit by telling it
that our function makes an assertion:

```ts [8]
type User = {
	name: string
	displayName: string | null
}

function assertDisplayName(user: User): asserts user is User & { displayName: string } {
	if (!user.displayName) throw new Error('Oh no, user has no displayName')
}

function logUserDisplayName(user: User) {
	assertDisplayName(user)
	console.log(user.displayName.toUpperCase())
}
```

And that's another way to turn our function into a type narrowing function!

## Conclusion

That's definitely not everything, but that's a lot of the common syntax I find
myself writing when dealing with functions in TypeScript. I hope it was helpful
to you! Bookmark this and share it with your friends 😘
