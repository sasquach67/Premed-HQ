# Versioning and Safe-Revert Workflow

## Core rule

Before every substantial Codex change, preserve the current working project as a versioned snapshot.

## Version numbers

Use this simplified semantic-versioning model:

- `v0.1.1` for bug fixes and small corrections
- `v0.2.0` for a page redesign or new feature
- `v1.0.0` only for a major architecture or storage-model change

## Before asking Codex to modify the project

1. Confirm the current version in `VERSION.md`.
2. Copy or zip the project into `versions/` using the current version number.
3. Add the planned work under `[Unreleased]` in `CHANGELOG.md`.
4. Give Codex the relevant specification from `docs/codex/` or the issue IDs from `BUG_FIXES.md`.
5. Explicitly tell Codex not to erase localStorage data or break JSON backup compatibility.

## After Codex finishes

1. Open the app and perform the manual tests requested in the prompt.
2. Check the browser console for errors.
3. Export a JSON backup from the app and confirm it downloads.
4. Reload the page and confirm persisted data remains.
5. Update `VERSION.md` to the new version.
6. Move completed work from `[Unreleased]` into a dated version section in `CHANGELOG.md`.
7. Create a new snapshot in `versions/`.

## How to revert

### Simple file-based revert

1. Preserve the broken/current copy separately.
2. Extract the desired snapshot from `versions/`.
3. Replace the active project files with that snapshot.
4. Restore a matching application JSON backup if the state schema changed.

### Recommended Git workflow

When the project is opened locally, initialize Git once:

```bash
git init
git add .
git commit -m "v0.1.0 baseline"
git tag v0.1.0
```

Before a Codex pass:

```bash
git checkout -b feature/overview-redesign
git add .
git commit -m "Checkpoint before overview redesign"
```

After reviewing a successful change:

```bash
git add .
git commit -m "Implement overview redesign"
git tag v0.2.0
```

To return to a prior version without destroying history:

```bash
git switch -c restore-v0.1.0 v0.1.0
```

Do not use destructive commands such as `git reset --hard` unless the consequences are fully understood.

## Codex instruction header

Add this header to future Codex prompts:

```md
Version safety requirements:
- Read VERSION.md, CHANGELOG.md, VERSIONING_WORKFLOW.md, and BUG_FIXES.md first.
- Do not modify files outside the requested scope.
- Preserve localStorage and JSON import/export compatibility.
- Report every changed file.
- Do not update the version number until implementation and testing are complete.
```
