# Migrating elements to React 19

## Starting point

- Next.js 15 with React 19
- Contacts App from React Router tutorial remake in Next.js
- Simple cases without any libraries, that's what we're now able to replace, libraries can still be relevant
- Quick demo all features and it's problems

## Fetch async data, suspense, and use()

- ContactPage: make component async "contactpage", move await with fetch and response.json instead of usEffect (or React Query), use suspense for loading state with loading.tsx
- ContactPage: hover type:any, now use db function directly instead of fetch since we are already on the server. Automatic type safety without tRPC etc, hover type contact

## Use Server Functions and transitions (Actions)

- DeleteButton: use server function instead of API endpoint, revalidatePath inside, automatic serialization and type safety, hover type
- DeleteButton: This can throw errors on its own, remove the !res.ok, remove res = await, remove router.push since this on the server
- DeleteButton: switch from manual isLoading to a async transition, creating an Action + Server Action, use pending state, no unstable state
- DeleteButton: Vise error boundary can catch errors since we use action, it didn't work before

## Use forms for buttons and add useFormStatus()

- NewContactButton: Showcase, go to layout, replace with form and server function and SubmitButton, delete NewContactButton
- SubmitButton: add useFormStatus() to show loading state even from the server
- SearchStatus: showcase useFormStatus() to show loading state from a form with the default form behavior

## Migrate from onSubmit to form action with useActionState()

- ContactForm: Showcase boilerplate code, no type safety, loading states, etc
- Use useActionState() (snippet) with a server function, returned value replaces form values
- Remove isLoading prop from submitButton, reuse composable component

## Simplify optimistic updates with useOptimistic()

- Use form with action, direct access to a specific server function, automatic serialization and type safety
- Automatically Form Action wrapped in transition, can call optimistic update inside

## Review and remove unnecessary code

- Delete API layer, we don't like this anyways since it's not type safe
- Final demo
- Check diffs
- Less boilerplate, cleaner code, no flickering pending states, error boundaries, and loading states, everything is type safe by default
- In many cases we can now survive without React Query, tRPC, React Hook Form, but we can also use them if we want to
