# What I Learned
 
Notes from the Git CLI workshop and the number guessing game project.
 
## Git
 
| Task | Command |
|------|---------|
| Rename the unborn branch after `git init` | `git switch -c main` |
| Rename an existing branch | `git branch -M main` |
| Start a repo on `main` | `git init -b main` |
| Fix the last commit message | `git commit --amend -m "Initial commit"` |
| Reword or squash older commits | `git rebase -i HEAD~3` (or `--root`) |
| Replay my branch on top of `main` | `git rebase main` |
| Continue after fixing a conflict | `git add <file>` then `git rebase --continue` |
 
- Commit messages follow a convention: `feat:`, `fix:`, `refactor:`, `chore:`, `test:`.
- Before finishing: `git status` is clean, I'm on `main`, and `git log --oneline` looks right.
- Amending or rebasing rewrites history, which is fine locally but needs `--force-with-lease` if already pushed.
## Bash
 
- Random number from 1 to 1000: `$(( RANDOM % 1000 + 1 ))`
- Validate an integer with a regex: `[[ $GUESS =~ ^[0-9]+$ ]]`, and check this before comparing numbers.
- Compare numbers with `-eq`, `-gt`, `-lt`, not string comparison.
- An empty `else` block is a syntax error, so use `:` as a placeholder.
- Print exactly what the spec says. Extra banners, blank lines, or leftover debug `echo`s can fail output checks.
## PostgreSQL
 
- Store users and their game results in separate tables (`users`, `games`) so stats can be computed with `COUNT(*)` and `MIN(guesses)`.
- `VARCHAR(22) UNIQUE` handles the 22-character username requirement.
- `psql ... -t --no-align -c "..."` returns clean output that can be assigned to a variable.
- Reset test data with `TRUNCATE users, games RESTART IDENTITY;`.
## Reading requirements
 
Assignments often imply things they don't say. For every placeholder in an output message (like `<games_played>`), ask where that data comes from and where it's stored.