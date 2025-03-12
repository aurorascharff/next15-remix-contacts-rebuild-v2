# Migrating elements to React 19

## Starting point

- Next.js 15 with React 19
- Contacts App from React Router tutorial remake in Next.js
- Simple cases without any libraries, that's what we're now able to replace, libraries can still be relevant

## Fetch async data, suspense, and use()

- ContactPage: use await with fetch instead of usEffect (or React Query), use suspense for loading state with loading.tsx
- ContactPage: use db function directly instead of fetch since we are already on the server. Automatic type safety without tRPC etc
- Layout: add "use" in layout for better performance for loading state and suspense

## Use Server Functions and transitions (Actions)

- DeleteButton: use server function instead of API endpoint, revalidatePath inside, automatic serialization and type safety
- DeleteButton: switch from manual isLoading to a transition, creating an Action + Server Action, use pending state, no unstable state
- DeleteButton: Vise error boundary can catch errors since we use action, it didn't work before

## Use forms for buttons and add useFormStatus()

- NewContactButton: Showcase, go to layout, replace with form and server function and SubmitButton (snippet), delete NewContactButton
- SubmitButton: use useFormStatus() to show loading state even from the server
- SearchStatus: use useFormStatus() to show loading state from another form

## Migrate from onSubmit to form action with useActionState()

- ContactForm: Showcase boilerplate code, no type safety, loading states, etc
- Use useActionState() (snippet) with a server function, returned value replaces form values
- Remove isLoading prop from submitButton, reuse composable component

## Simplify optimistic updates with useOptimistic()

- Use form with action, direct access to a specific server function, automatic serialization and type safety
- Automatically Form Action wrapped in transition, can call optimistic update inside

## Review and remove unnecessary code

- Delete API layer, we don't like this anyways since it's not type safe
- Check diffs
- Less boilerplate, cleaner code, no flickering pending states, error boundaries, and loading states, everything is type safe by default
- In many cases we can now survive without React Query, tRPC, React Hook Form, but we can also use them if we want to
