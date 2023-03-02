---
title: Sintassi delle funzioni Typescript
date: 2021-12-08
pubDate: 2021-12-08
description: La sintassi per varie funzioni e tipi di funzioni in TypeScript con l'aggiunta di semplici esempi.
lang: it-it
categories:
  - typescript
meta:
  keywords:
    - typescript
    - functions
    - type definitions
    - type declarations
    - function type annotations
layout: ../../layouts/PostLayout.astro
---

_Nota 1: questo articolo è stato tradotto dall'aricolo originale "[TypeScript Function Syntaxes](https://kentcdodds.com/blog/typescript-function-syntaxes)" di [Kent C. Dodds](https://twitter.com/kentcdodds)._

_Nota 2: gli snippet di codice non vengono tradotti, in quanto considero lo scrivere codice in italiano una bad practice :)_

In JavaScript esistono molti modi di scrivere le funzioni. Aggiungici TypeScript e improvvisamente avrai ancora di puù a cui pensare. Con l'aiuto di [qualche](https://gist.github.com/kentcdodds/61176c067ec5250b5bd3c7fe57a0120d)
[amico](https://twitter.com/kentcdodds/status/1365046763892084736), ho messo insieme questa lista di comuni tipologie di funzioni che potranno servirti, insieme a dei semplici esempi.

Tieni a mente che ci sono MOLTISSIME combinazioni di sintassi differenti. Includerò soltanto le combinazioni meno ovvie o in qualche maniera uniche.

Prima di tutto, la confusione più grande che ho per quanto riguarda la sintassi è dove mettere il _return type_ della funzione. Quando devo usare `:` e quando devo usare `=>`? Di seguito trovi un paio di esempi veloci che potrebbero velocizzarti il lavoro se stai usando questo post come reference:

```ts
// Semplice tipo per una funzione, usa =>
type FnType = (arg: ArgType) => ReturnType

// Qualsiasi altra volta, usa :
type FnAsObjType = {
	(arg: ArgType): ReturnType
}
interface InterfaceWithFn {
	fn(arg: ArgType): ReturnType
}

const fnImplementation = (arg: ArgType): ReturnType => {
	/* implementazione */
}
```

Penso che questa fosse una delle maggiori fonti di confusione per me. Avendolo scritto, ora so che l'unica volta che uso `=> ReturnType` è quando sto definendo un _function type_ come tipo indipendente. In qualsiasi altro caso, è bene usare `: ReturnType`.

Continua a leggere e troverai qualche esempio su come questo entra in gioco in esempi tipici di codice.

## Function declarations (dichiarazioni di funzioni)

```ts
// return type inferito
function sum(a: number, b: number) {
	return a + b
}
```

```ts
// return type definito
function sum(a: number, b: number): number {
	return a + b
}
```

Nei seguenti esempio, useremo _return types_ specifici, ma tecnicamente non è necessario specificarli.

## Function Expression (espressione di funzione)

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
// l'implicit return di un oggetto richiede le parentesi tonde per disambiguare le parentesti graffe
const sum = (a: number, b: number): { result: number } => ({ result: a + b })
```

Puoi anche aggiungere le _type annotations_ vicino alla variabile, così facendo la funzione prenderà quei tipi:

```ts
const sum: (a: number, b: number) => number = (a, b) => a + b
```

Puoi anche estrarre quel tipo:

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

Ciò può essere fatto anche con un'interfaccia:

```ts
interface MathFn {
	(a: number, b: number): number
	operator: string
}
const sum: MathFn = (a, b) => a + b
sum.operator = '+'
```

Ci sono poi `declare function` e `declare namespace` che vogliono dire: "Hey, esiste una variabile con questo nome e questo tipo". Possiamo usarli per creare il tipo e poi utilizzare `typeof` per assegnare quel tipo alla nostra funzione. Troverai usato spesso `declare` nei file `.d.ts` per dichiarare i tipi delle librerie.

```ts
declare function MathFn(a: number, b: number): number
declare namespace MathFn {
	let operator: '+'
}
const sum: typeof MathFn = (a, b) => a + b
sum.operator = '+'
```

Se dovessi scegliere tra `type`, `interface`, e `declare function`, personalmente sceglierei `type`, a meno che non abbia bisogno dell'estensibilità offertami da `interface`. Userei `declare` soltanto se volessi _per davvero_ comunicare al compilatore che qualcosa esiste e del quale lui non ne è a conoscenza (come ad esempio una libreria).

## Parametri opzionali / di default

Parametro opzionale:

```ts
const sum = (a: number, b?: number): number => a + (b ?? 0)
```

Nota che l'ordine qui è importante. Se rendi un parametro opzionale, tutti i parametri seguenti **devono** essere opzionali. Questo accade perché è possibile chiamare `sum(1)` ma non `sum(, 2)`. Tuttavia, è possibile chiamare `sum(undefined, 2)` e se è quello che vuoi rendere possibile, allora puoi farlo:

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
	},
}
```

Proprietà come una _function expression_:

```ts
const math = {
	sum: function sum(a: number, b: number): number {
		return a + b
	},
}
```

Proprietà come una _arrow function expression_ (con return implicito):

```ts
const math = {
	sum: (a: number, b: number): number => a + b,
}
```

Sfortunatamente, per estrarre quel tipo non puoi tipizzare la funzione stessa, ma devi tipizzare l'oggetto. Non puoi annotare la funzione con un tipo quando è definita in un _object literal_.

```ts
type MathFn = (a: number, b: number) => number

const math: { sum: MathFn } = {
	sum: (a, b) => a + b,
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

Curiosamente, sembra che tu debba comunque definire i tipi per la funzione, nonstante siamo parte dell'interfaccia che dovrebbe implementare 🤔 🤷‍♂️

Una nota finale. In TypeScript, puoi anche usare `public`, `private`, e
`protected`. Personalmente non uso classi così spesso e non mi piace utilizzare queste specifiche feature di TypeScript. JavaScript otterrà presto una sintassi dedicata ai membri `private`, il che è ottimo.
([Approfondsci qui](https://github.com/tc39/proposal-class-fields)).

## Moduli

Importare ed esportare definizioni di funzioni funziona allo stesso modo di tutto il resto. Le cose diventano uniche per quanto riguarda TypeScript se vuoi scrivere un file `.d.ts` con una _module declaration_. Prendiamo come esempio la nostra funzione `sum`:

```ts
const sum = (a: number, b: number): number => a + b
sum.operator = '+'
```

Questo è quello che faremmo, assumendo che l'export sia default:

```ts
declare const sum: {
	(a: number, b: number): number
	operator: string
}
export default sum
```

E se vogliamo che sia un _named export_:

```ts
declare const sum: {
	(a: number, b: number): number
	operator: string
}
export { sum }
```

## Overload

Ho scritto specificatamente di questo e puoi leggerlo:
[Define function overload types with TypeScript](https://kentcdodds.com/blog/define-function-overload-types-with-type-script).
Qui sotto troviamo l'esempio in quel post:

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

In pratica quello che fai è definire la funzione più volte e implementarla soltanto l'ultima volta. È importante che i tipi dell'implementazione supportino tutti i tipi che vengono sovrascritti, che è il motivo per il quale `cb` qua sopra è opzionale.

## Generatori

Non ho mai usato un generatore in codice rilasciato in produzione... Ma quando ci ho giocato un po' nel playground di TypeScript non c'era molto da dire per il caso semplice:

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

TypeScript inferisce correttamente che `iterator.next()` ritorna un oggetto della seguente forma:

```ts
type IteratorNextType = {
	value: number | void
	done: boolean
}
```

Se vuoi _type safety_ per il valore di completamento dell'espressione `yield`, aggiungi una _type annotation_ alla variabile a cui lo assegni:

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

E ora se provi ad invocare `iterator.next('3')` invece di `iterator.next(3)` avrai un errore di compilazione 🎉

## Async

Le funzioni `async/await` in TypeScript funzionano esattamente come in JavaScript e l'_unica_ differenza nella loro tipizzazione è che il _return type_ sarà sempre un _generic_ di una `Promise`.

```ts
const sum = async (a: number, b: number): Promise<number> => a + b
```

```ts
async function sum(a: number, b: number): Promise<number> {
	return a + b
}
```

## Generic

Con una dichiarazione di funzione:

```ts
function arrayify2<Type>(a: Type): Array<Type> {
	return [a]
}
```

Sfortunatamente, con un'_arrow function_ (quando TypeScript è configurato per usare JSX), l'iniziale `<` della funzione è ambiguo per il compilatore. "È una sintassi per un generic? Oppure è JSX?" Devi quindi aggiungere qualcosa per aiutarlo nella disambiguazione. Penso che la soluzione più semplice sia usare `extends unknown`:

```ts
const arrayify = <Type extends unknown>(a: Type): Array<Type> => [a]
```

Che mostra in modo conveniente la sintessi per `extends` nei _generic_.

## Type Guard

Una _type guard_ è un meccanismo per fare _type narrowing_. Per esempio, ti permette di restringere qualcosa che è `string | number` in qualcosa che sia `string` oppure `number`. Ci sono meccanismi builtin per ciò (come `typeof x === 'string'`), ma puoi anche crearne uno tuo. Qui trovi uno dei miei preferiti (alzo il cappello al
[mio amico Peter](https://twitter.com/aprillion0042) che me l'ha mostrato):

Hai un array con dei tipi _falsy_ e vuoi che se ne vadano:

```ts
// Array<number | undefined>
const arrayWithFalsyValues = [1, undefined, 0, 2]
```

In JavaScript normale puoi fare:

```ts
// Array<number | undefined>
const arrayWithoutFalsyValues = arrayWithFalsyValues.filter(Boolean)
```

Sfortunatamente, TypeScript non considera questa una _type narrowing guard_, dunque il tipo rimane `Array<number | undefined>` (nessun _narrowing_ applicato).

Possiamo quindi scrivere la nostra funzione e dire al compilatore che ritorna `true`/`false` se l'argomento è di un tipo specifico. Per noi, diremo che la nostra funzione ritorna `true` se il tipo dell'argomento non è incluso in uno dei tipi falsy.

```ts
type FalsyType = false | null | undefined | '' | 0
function typedBoolean<ValueType>(value: ValueType): value is Exclude<ValueType, FalsyType> {
	return Boolean(value)
}
```

E con esso possiamo fare questo:

```ts
// Array<number>
const arrayWithoutFalsyValues = arrayWithFalsyValues.filter(typedBoolean)
```

Woo!

## Assertion function

Hai present come ogni tanto fai dei controlli a runtime per essere super sicuro di qualcosa? Ad esempio, quando un oggetto può avere una proprietà con valore `null` vuoi controllare se è `null` e in caso _throware_ un errore se è `null`. Qua si vede come potresti fare una cosa del genere:

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

A TypeScript va bene `user.displayName.toUpperCase()` perché l'`if` è una _type guard_ che capisce. Ora, supponiamo che si voglia prendere quell'`if` e metterlo in una funzione:

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

Ora, TypeScript non è più content perché la chiamata a `assertDisplayName` non è una _type guard_ sufficiente. Sosterrei che questa è una limitazione lato TypeScript. Hey, nessuna tecnologia perfetta. In qualunque caso, possiamo aiutare TypeScript un pochino dicendogli che la nostra funzione fa un'asserzione:

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

E questo è un altro modo per trasformare la nostra funzione in una funzione di _type narrowing_!

## Conclusioni

Questo non è sicuramente tutto, ma è buona parte della sitassi che mi trovo a scrivere tutti i giorni riguardo le funzioni in TypeScript. Spero che ti sia stato d'aiuto! Aggiungi questi ai segnalibri e condividilo con i tuoi amici 😘
