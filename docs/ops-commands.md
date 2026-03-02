# Ops Commands

## Local development

```bash
npm ci
npm run dev
```

## Quality checks

```bash
npm run lint
npm run build
```

## Git workflow (PR-first)

```bash
git checkout -b site/<task>-$(date +%Y%m%d)
git add <files>
git commit -m "<why-focused message>"
git push -u origin HEAD
gh pr create --title "<title>" --body "<body>"
```

## Useful checks

```bash
git status
git diff
git log --oneline -n 10
```

## Deployment notes

- GitHub Pages deploy is handled by `.github/workflows/deploy.yml`
- Workflow builds static output and deploys `./out`
- Merges to `main` trigger deployment
