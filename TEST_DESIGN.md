# Test Design Explanation

## Approach

Playwright was chosen because it gives one framework, one config, and
one reporter for both API and UI testing. Only one API test 
and one UI test are actually implemented. Everything else is deliberately 
scoped out and listed under "Additional scenarios" below, in priority order.

## What was implemented

### API — `/pet` (Swagger Petstore)

**Implemented scenario**
- Creates a pet via `POST /pet` then the test verifies the response returns 
the submitted `id`, `name`, `photoUrls`, and `status`. It then proceeds to do 
a GET request via `GET /pet/{id}`  to proves it was actually persisted and independently retrievable.

**Scenarios to implement with more time**
Three more API scenarios are stubbed out in `pet.spec.ts` with
`test.fixme(...)` rather than fully implemented — each has a `// TODO`
comment with its **Approach** and **Rationale**.

- Test to ensure pet status can be updated via`PUT /pet` to change an existing pet's `status`, then confirm via `GET`.
- Test to validate that id must be entered via `GET /pet/{id}` with an id that doesn't exist → expect `404`
- Test to ensure pet name is entered `POST /pet` without the required `name` field.

### UI — Sauce Demo checkout

**Implemented scenario**
- `standard_user` adds an item and completes checkout. This covers the primary
  revenue generating user journey end to end.

**Scenarios to implement with more time**
Two more UI scenarios are stubbed out in `check-out.spec.ts` with
`test.fixme(...)` rather than fully implemented — each has a `// TODO`
comment with its **Approach** and **Rationale**.

- Log in with an invalid username/password and expect an error message as credentials are not valid.
- Log in as `locked_out_user`, expect error message as the user is locked.
## Additional scenarios (not implemented, in priority order)

**Prioritisation of implemting additional tests**:
Negative paths come first because they help protect data integrity.
Authentication and edge cases/boundary testing come next, as they cover real risks but are generally less common.