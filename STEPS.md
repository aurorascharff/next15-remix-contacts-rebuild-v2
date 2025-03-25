# Using features of React 19

## Server Components

- Next.js 15 with React 19
- Remake of remix contacts app
- ContactPage: Typisk useffect, many ways to write this, which is a also a problem. Make component async "contactPage", move await with fetch and response.json instead of usEffect (or React Query), use suspense for loading state with loading.tsx and error thrown from server with error.tsx (could be errorboundary). We don't actually need a lib anymore.
- Code getContact
- Remove use client, we'll learn in a sec why i needed this before!
- Hover type:any, now use db function directly instead of fetch since we are already on the server. Automatic type safety without tRPC etc, hover type contact
- Hent data i edit også, samme logikk

## Client Components

- Comment inn DeleteContactButton, needs browser api and state, get error, add use client!

## Server Functions

- DeleteContactButton: just using router.refresh since we don't have any lib here, use server function instead of API endpoint
- Code deleteContact, revalidatePath inside. Show its failing, legg til "use server" to turn them into endpoints! Works! Automatic serialization and type safety, hover type, show type.
- Tilbake i client-side innebygd confirm modal kan vi kalle deleteContact server function som en vanlig funksjon og slette noe fra databasen. Dette er ganske magisk - noen synes det er litt for magisk.

## Cache

- Lets say i want metadata, now I'm fetching twice
- Add cache around getContact since it's being used twice per page for metadata

## Actions

- DeleteContactButton: This can throw errors on its own, remove the !res.ok, remove res = await, remove router.push since this on the server
- Switch from manual isLoading to a async transition, creating an Action + Server Action, use pending state, no unstable state
- Samme eksempel som før, men denne gangen har vi lagt på en transition rundt deleteContact, det vil si at vi nå lager en action, som gir oss en automtisk pending state som vi kan bruke for å se en loading spinner på Knappen mens den utfører.
- Vise error boundary can catch errors since we use action, it didn't work before!

## Forms

- Bruk form isteden for bare button, remove pending state
- Her lager jeg knapper med forms istedenfor onclicks, bound til en server function som opretter kontakten og redirecter. Direkte I en server component og trenger ikke use client her. Trenger ikke preventDefault.
- NewContactButton: Showcase, go to layout, replace with form and server function and SubmitButton, delete NewContactButton

## useFormStatus()

- SubmitButton: add useFormStatus() to show loading state even from the server, demo delete and new contact
- Vi er faktisk på serveren her, men SubmitButton med useFormStatus håndterer alt av interaktivitet, composability.

## useActionState()

- ContactForm: Showcase boilerplate code, no type safety, loading states, etc
- Preventing default, avoiding the web platform.
- Use useActionState() "contactActionState" with a server function, put updateContactAction on form
- Returned value replaces form values with cmd + d
- Remove isLoading useState and from submitButton since it uses useFormStatus(), reuse composable component
- Uses built in formData()!
- Engages the web platform, no need to prevent default, native forms
- Her I denne demo-appen bruker jeg UseActionState til å returnere for eksempel valideringsfeil fra en Action, og knytte den til et skjema med action={} propertien, som kan erstatte form-libraries som React Hook Form I noen tilfeller.
- Can throw errors again

## useOptimistic()

- Små ting som her, som dere ser er knappetrykket instant selvom det litt mer tid, synlig ved at sidebaren oppdateres senere. Men da får man god opplevelse for brukeren.
- Favorite: Use form with action, direct access to a specific server function, automatic serialization and type safety
- Remove useState for the value
- Automatically Form Server Action wrapped in transition, can call optimistic update inside
- Legg merke til aat jeg bruker et skjema igje fordi det automaatisk lager actions som man trenger for optimistic updates.
- Can throw errors again

## use()

- View delayed page load because fetching in layout

## Review

- Clean up and delete unused code
- Delete API layer, we don't like this anyways since it's not type safe
- Review diffs
- Less boilerplate, cleaner code, no flickering pending states, error boundaries, and loading states, everything is type safe by default and automatically serialized
- In many cases we can now survive without React Query, tRPC, React Hook Form, but we can also use them if we want to
- Additions to our toolkit
