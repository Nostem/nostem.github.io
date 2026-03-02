# Publish Checklist (PR-first)

Use this checklist for every website change.

## 1) Branch

- [ ] Create feature branch: `site/<task>-<yyyymmdd>`
- [ ] Confirm not on `main`

## 2) Implementation scope

- [ ] Change only files relevant to the request
- [ ] Preserve existing design system and component patterns
- [ ] Avoid unrelated refactors

## 3) Validation

Run:

```bash
npm run lint
npm run build
```

Checklist:

- [ ] Lint passes
- [ ] Build passes

If UI/routes changed, also verify:

- [ ] `/`
- [ ] `/books/`
- [ ] `/writing/`
- [ ] Any changed/new route

## 4) Pull request

- [ ] Push branch to origin
- [ ] Open PR (never direct push to `main`)
- [ ] Include summary, changed files, and validation evidence
- [ ] Attach screenshots for UI changes

## 5) Rollback note

- [ ] Include a rollback path in PR body (revert commit(s) or close PR)
