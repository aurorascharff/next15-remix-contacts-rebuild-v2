# Using features of React 19

## Server Components: ContactPage

- Next.js 15 with React 19
- Remake of remix contacts app
- ContactPage: Typisk useffect, many ways to write this, which is a also a problem. No types. Usually you would use a lib (React Query), let's try to survive without that. Loading and error state.
- Make component async "contactPage", add await prisma query and delete useEffect.
- We have alot of states, use suspense for loading state with loading.tsx and error thrown from server with error.tsx (could be errorboundary).
- Hover type:any, now use db function directly instead of fetch since we are already on the server. Automatic type safety without tRPC etc, hover type contact.
- Replace with getContact function data access layer.

## Client Components: layout.tsx

- layout.tsx: Comment inn DeleteContactButton, needs browser api and state, get error, add use client! Now we can access the built-in confirm modal.

## Server Functions: DeleteContactButton

- DeleteContactButton: bruker fetch without types, just using router.refresh since we don't have any lib here, lets call a function instead of API endpoint. Add deleteContact function, showcase it can do a redirect after mutation.
- Remove router.refresh og res.ok, this can throw on its own.
- Show its failing, legg til "use server" to turn them into endpoints! Works! Automatic serialization and type safety, hover type, show type.
- Tilbake i client-side innebygd confirm modal kan vi kalle deleteContact server function som en vanlig funksjon og slette noe fra databasen. Dette er ganske magisk.

## Cache: ContactPage

- ContactPage: Lets say i want metadata, now I'm fetching twice, showcase console.log. Not for components in this case but same use case.
- Add cache around getContact since it's being used twice per page for metadata
- Showcase console.log

## Actions: DeleteContactButton

- DeleteContactButton: Manually handling pending state, and showcase I can't catch errors by adding throw error from function
- Switch from manual isLoading to a async transition, creating an Action + Server Action, use pending state. Pending state is now perfectly timed with the completion of the Action.
- Vise error boundary can catch errors since we use action, it didn't work before! Remove thrown error.

## Forms: NewContactButton

- NewContactButton: Replace with form and server function and SubmitButton, move it to layout, delete NewContactButton. Direkte I en server component og trenger ikke use client her.
- Her lager jeg knapper med forms istedenfor onclicks, bound til en server function som oppretter kontakten og redirecter. Trenger ikke preventDefault.
- Foreløpig har ikke denne pending state

## useFormStatus(): SubmitButton, DeleteContactButton, NewContactButton

- SubmitButton: add useFormStatus() to show loading state even from the server, use in DeleteContactButton and NewContactButton
- - DeleteContactButton: Bruk form isteden for bare button, remove pending state. Automatic transition for throwing errors.
- Vi er faktisk på serveren her, men SubmitButton med useFormStatus håndterer alt av interaktivitet, composability.

## useActionState(): ContactForm

- ContactForm: Showcase boilerplate code, no type safety, loading states, etc. No form library. Using basic states to return errors and data from server.
- Preventing default, avoiding the web platform.
- Replace states with useActionState() "contactActionState", uses native web formData, and calls a server action, put updateContactAction on form.
- Returned value replaces form errors and data with cmd + d
- Remove isLoading useState and from submitButton since it uses useFormStatus(), reuse composable component
- Engages the web platform with action and formData, no need to prevent default, native forms
- And again, we can catch and throw errors directly

## useOptimistic(): Favorite

- A naive implementation of optimistic updates, sidebar is updated later
- First lets use some of the stuff we already learned how to use
- Favorite: Use form with action, direct access to a specific server function, automatic serialization and type safety
- Replace useState with useOptimistic
- Automatically Form Server Action wrapped in transition, can call optimistic update inside
- Optimistic updates must be called in transitions
- Can throw errors again

## use(): layout.tsx

- View delayed page load because fetching in layout
- We have to fetch on the server, but ContactList is a client component
- Add use() to layout.tsx, and wrap with "suspenseSkeleton"

## Review

- Clean up and delete unused code
- Delete API layer, we don't like this anyways since it's not type safe
- Fullscreen: Review diffs
- Less boilerplate, cleaner code, no flickering pending states, error boundaries, and loading states, everything is type safe by default and automatically serialized
- In many cases we can now survive without React Query, tRPC, React Hook Form, but we can also use them if we want to
- Additions to our toolkit
