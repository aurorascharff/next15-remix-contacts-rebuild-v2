# Using features of React 19

## Server Components: ContactPage

- Next.js 15 with React 19
- Remake of remix contacts app
- ContactPage: Typisk useffect, many ways to write this, which is a also a problem. No types. Usually you would use a lib (React Query), let's try to survive without that.
- Remove use client, we'll learn in a sec why i needed this before!
- Make component async "contactPage", add await prisma query and delete useEffect.
- We have alot of states, use suspense for loading state with loading.tsx and error thrown from server with error.tsx (could be errorboundary).
- Hover type:any, now use db function directly instead of fetch since we are already on the server. Automatic type safety without tRPC etc, hover type contact.
- Replace with getContact function data access layer. We don't actually need a lib anymore.

## Client Components: layout.tsx

- layout.tsx: Comment inn DeleteContactButton, needs browser api and state, get error, add use client!

## Server Functions: DeleteContactButton

- DeleteContactButton: bruker fetch without types, just using router.refresh since we don't have any lib here, lets call a function instead of API endpoint. Add deleteContact.
- Code deleteContact, slow + revalidatePath inside.
- Remove router.refresh og res.ok, use try catch rather.
- Show its failing, legg til "use server" to turn them into endpoints! Works! Automatic serialization and type safety, hover type, show type.
- Tilbake i client-side innebygd confirm modal kan vi kalle deleteContact server function som en vanlig funksjon og slette noe fra databasen. Dette er ganske magisk.

## Cache: ContactPage

- ContactPage: Lets say i want metadata, now I'm fetching twice, showcase console.log
- Add cache around getContact since it's being used twice per page for metadata
- Showcase console.log

## Actions: DeleteContactButton

- DeleteContactButton: Showcase I can't catch errors by adding throw error from function
- Switch from manual isLoading to a async transition, creating an Action + Server Action, use pending state, no unstable state
- This can throw errors on its own, remove try catch
- Vise error boundary can catch errors since we use action, it didn't work before!

## Forms: DeleteContactButton, NewContactButton

- DeleteContactButton: Bruk form isteden for bare button, remove pending state
- Her lager jeg knapper med forms istedenfor onclicks, bound til en server function som opretter kontakten og redirecter. Direkte I en server component og trenger ikke use client her. Trenger ikke preventDefault.
- NewContactButton: Showcase, go to layout, replace with form and server function and SubmitButton, delete NewContactButton

## useFormStatus(): SubmitButton, DeleteContactButton, NewContactButton

- SubmitButton: add useFormStatus() to show loading state even from the server, demo DeleteContactButton and NewContactButton
- Vi er faktisk på serveren her, men SubmitButton med useFormStatus håndterer alt av interaktivitet, composability.

## useActionState(): ContactForm

- ContactForm: Showcase boilerplate code, no type safety, loading states, etc
- Preventing default, avoiding the web platform.
- Use useActionState() "contactActionState" with a server function, put updateContactAction on form
- Returned value replaces form values with cmd + d
- Remove isLoading useState and from submitButton since it uses useFormStatus(), reuse composable component
- Uses built in formData()!
- Engages the web platform, no need to prevent default, native forms
- Her I denne demo-appen bruker jeg UseActionState til å returnere for eksempel valideringsfeil fra en Action, og knytte den til et skjema med action={} propertien, som kan erstatte form-libraries som React Hook Form I noen tilfeller.
- Can throw errors again

## useOptimistic(): Favorite

- Små ting som her, som dere ser er knappetrykket instant selvom det litt mer tid, synlig ved at sidebaren oppdateres senere. Men da får man god opplevelse for brukeren.
- Favorite: Use form with action, direct access to a specific server function, automatic serialization and type safety
- Remove useState for the value
- Automatically Form Server Action wrapped in transition, can call optimistic update inside
- Legg merke til aat jeg bruker et skjema igje fordi det automaatisk lager actions som man trenger for optimistic updates.
- Can throw errors again

## use(): layout.tsx

- View delayed page load because fetching in layout

## Review

- Clean up and delete unused code
- Delete API layer, we don't like this anyways since it's not type safe
- Review diffs
- Less boilerplate, cleaner code, no flickering pending states, error boundaries, and loading states, everything is type safe by default and automatically serialized
- In many cases we can now survive without React Query, tRPC, React Hook Form, but we can also use them if we want to
- Additions to our toolkit
