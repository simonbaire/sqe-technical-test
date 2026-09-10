# Test Design Explanation

## Approach

Playwright was chosen because it gives one framework, one config, and
one reporter for both API and UI testing. Only one API test 
and one UI test are actually implemented. Everything else is deliberately 
scoped out and listed under "Additional scenarios" below, in priority order.

## What was implemented

### API: `/pet` (Swagger Petstore)

**Implemented scenario**
- Creates a pet via `POST /pet` then the test verifies the response returns 
the submitted `id`, `name`, `photoUrls`, and `status`. It then proceeds to do 
a GET request via `GET /pet/{id}`  to proves it was actually persisted and independently retrievable.

**Scenarios to implement with more time**

Three more API scenarios are stubbed out in `pet.spec.ts` with
`test.fixme(...)` rather than fully implemented. Each has a `// TODO` comment 
with its **Approach** and **Rationale**.

In addition to these tests the following would also be critical additions:

- Reject `POST /pet` when the submitted `id` already belongs to an existing
  pet (currently the API silently overwrites it). This is a data integrity
  risk: two clients could unintentionally overwrite each other's record, so
  the expected behaviour (reject with a conflict, or whatever the API owner
  intends) needs clarifying and then asserting on.

- Make the `buildPet` factory configurable by accepting an optional partial
  `Pet` to override individual fields (e.g. `buildPet({ id: 0 })`), falling
  back to random Faker values for anything not overridden. It currently outputs 
  entirely randomized data. Consequently, targeting specific fields with predefined 
  values requires manual payload configuration. This is a prerequisite for 
  the boundary tests below.

- Boundary tests built on the configurable factory above for example `id` set to `0`,
  negative values, `name` as an empty string and as a very long string, `photoUrls` as an empty
  array. Each asserts whether the API accepts or rejects the value, so
  validation gaps get caught deliberately rather than by accident.

- Broaden status code assertions beyond `200` and `404` to cover the full range
  `/pet` can return (e.g. `400` for malformed input, `405` for unsupported
  methods) so error-handling regressions are caught, not just the
  happy-path status.

- Longer term, performance/load testing to confirm the API enforces a rate
  limit (`429`) under sustained load. This sits outside Playwright's
  functional scope and would need a dedicated performance/load testing tool (e.g. k6 or
  Artillery).

### UI: Sauce Demo checkout

**Implemented scenario**
- `standard_user` adds an item and completes checkout. This covers the primary
  revenue generating user journey end to end.

**Scenarios to implement with more time**

Two more UI scenarios are stubbed out in `check-out.spec.ts` with
`test.fixme(...)` rather than fully implemented. Each has a `// TODO`
comment with its **Approach** and **Rationale**.

The API tests are where the functional/business-logic coverage lives
(pricing, persistence, validation rules), so the UI tests should be kept light.
The job of the UI tests is to check what a user actually sees and interacts
with, not to reprove logic the API tests already cover. With this in mind the following
UI example test additions would need to be implemented:

- Checkout form validation: submit with `firstName`, `lastName`, `postalCode`
  left empty and expect Sauce Demo's inline error banner (e.g. "Error:
  First Name is required") rather than proceeding to the next step. Confirms
  client-side validation feedback actually reaches the user.

- Cart badge stays in sync with cart contents: removing an item updates (or
  clears). A mismatch here is the kind of thing a real user would notice immediately.

- Checkout is blocked from an empty cart: with nothing added, selecting checkout should 
  not lead to a completable checkout.

- Order summary total matches the sum of the item prices added to cart, as
  shown to the user on the checkout overview step. A visible correctness
  check, not a repeat of an API level price assertion.

Longer term, the direction is to lean further into this split. To grow the API
suite as the primary source of functional coverage, and keep the UI pack
scoped to genuine UX/visual checks like the above. That keeps UI test flake
and maintenance cost down without losing confidence in the checkout
experience.

