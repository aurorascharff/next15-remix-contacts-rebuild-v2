# Migrating elements to React 19

## Starting point

- Next.js 15 with React 19
- Contacts App from React Router tutorial remake in Next.js
- Simple cases without any libraries, that's what we're now able to replace, libraries can still be relevant
- Quick demo open contact, new contact, update contact (errors then success), delete contact, favorite contact
- Highlight problems with UX: mismatched pending states, loading new contacts every time

## Fetch async data, suspense, and use()

- ContactPage: make component async "contactPage", move await with fetch and response.json instead of usEffect (or React Query), use suspense for loading state with loading.tsx
- Can take use of Next.js caching since we are using the server components
- Hover type:any, now use db function directly instead of fetch since we are already on the server. Automatic type safety without tRPC etc, hover type contact

## Use Server Functions and transitions (Actions)

- DeleteButton: use server function instead of API endpoint, revalidatePath inside, automatic serialization and type safety, hover type
- This can throw errors on its own, remove the !res.ok, remove res = await, remove router.push since this on the server
- Switch from manual isLoading to a async transition, creating an Action + Server Action, use pending state, no unstable state
- Vise error boundary can catch errors since we use action, it didn't work before

## Use forms for buttons and add useFormStatus()

- NewContactButton: Showcase, go to layout, replace with form and server function and SubmitButton, delete NewContactButton
- SubmitButton: add useFormStatus() to show loading state even from the server
- SearchStatus: showcase useFormStatus() to show loading state from a form with the default form behavior

## Migrate from onSubmit to form action with useActionState()

- ContactForm: Showcase boilerplate code, no type safety, loading states, etc
- Use useActionState() "contactActionState" with a server function, put updateContactAction on form
- Returned value replaces form values with cmd + d
- Remove isLoading useState and from submitButton since it uses useFormStatus(), reuse composable component

## Simplify optimistic updates with useOptimistic()

- Favorite: Use form with action, direct access to a specific server function, automatic serialization and type safety
- Remove useState for the value
- Automatically Form Server Action wrapped in transition, can call optimistic update inside

## Review and remove unnecessary code

- Delete API layer, we don't like this anyways since it's not type safe
- Second demo
- Check diffs
- Less boilerplate, cleaner code, no flickering pending states, error boundaries, and loading states, everything is type safe by default
- In many cases we can now survive without React Query, tRPC, React Hook Form, but we can also use them if we want to
