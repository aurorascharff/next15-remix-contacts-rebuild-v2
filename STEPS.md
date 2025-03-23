# Migrating elements to React 19

## Starting point

- Fullscreen app
- Next.js 15 with React 19
- Contacts App from React Router tutorial remake in Next.js
- Quick demo open contact, new contact, update contact (errors then success), delete contact, favorite contact
- Highlight problems with UX: mismatched pending states, loading new contacts every time
- Simple cases without any libraries, that's what we're now able to replace, libraries can still be relevant

## Fetch async data, suspense

- Fullscreen code
- ContactPage: Typisk useffect, many ways to write this, which is a also a problem. Make component async "contactPage", move await with fetch and response.json instead of usEffect (or React Query), use suspense for loading state with loading.tsx and error thrown from server with error.tsx (could be errorboundary). We don't actually need a lib anymore.
- Hover type:any, now use db function directly instead of fetch since we are already on the server. Automatic type safety without tRPC etc, hover type contact

## Use Server Functions and transitions (Actions)

- DeleteContactButton: just using router.refresh since we don't have any lib here, use server function instead of API endpoint, revalidatePath inside, automatic serialization and type safety, hover type
- This can throw errors on its own, remove the !res.ok, remove res = await, remove router.push since this on the server
- Switch from manual isLoading to a async transition, creating an Action + Server Action, use pending state, no unstable state
- Vise error boundary can catch errors since we use action, it didn't work before!

## Use forms for buttons and add useFormStatus()

- NewContactButton: Showcase, go to layout, replace with form and server function and SubmitButton, delete NewContactButton
- SubmitButton: add useFormStatus() to show loading state even from the server
- SearchStatus: showcase useFormStatus() to show loading state from a form with the default form behavior

## Migrate from onSubmit to form action with useActionState()

- ContactForm: Showcase boilerplate code, no type safety, loading states, etc
- Use useActionState() "contactActionState" with a server function, put updateContactAction on form
- Returned value replaces form values with cmd + d
- Remove isLoading useState and from submitButton since it uses useFormStatus(), reuse composable component
- Can throw errors again

## Simplify optimistic updates with useOptimistic()

- Favorite: Use form with action, direct access to a specific server function, automatic serialization and type safety
- Remove useState for the value
- Automatically Form Server Action wrapped in transition, can call optimistic update inside
- Can throw errors again

## Review and remove unnecessary code

- Delete API layer, we don't like this anyways since it's not type safe
- Check diffs
- Second demo fullscreen app: open contact (click back and forth nextjs caching), new contact, update contact (errors then success), delete contact, favorite contact, search spinner
- Less boilerplate, cleaner code, no flickering pending states, error boundaries, and loading states, everything is type safe by default and automatically serialized
- In many cases we can now survive without React Query, tRPC, React Hook Form, but we can also use them if we want to
