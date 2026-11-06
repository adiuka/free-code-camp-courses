# SQL Reference JSON
 
A small JSON cheat sheet of common SQL commands, organized by what they act on: database, table, row, and column.
 
Built as a hands-on exercise in the Git CLI workshop.
 
## Structure
 
```
database
├── create / drop / rename
├── table
│   └── create / drop / rename
├── row
│   └── insert / update / delete
└── column
    └── add / drop / rename / primary_key / foreign_key
```
 
## Example
 
```json
{
  "database": {
    "row": {
      "insert": "INSERT INTO table_name(columns) VALUES(values);"
    }
  }
}
```
 
Replace placeholders like `table_name`, `column_name`, and `condition` with your own values.
 
## What I Practiced
 
Working on this file was a chance to get comfortable with the Git CLI:
 
- **Committing**: small, focused commits with clear messages
- **Rebasing**: keeping a linear history by replaying my commits on top of the latest `main`
- **Squashing**: combining work-in-progress commits into one clean commit (`git rebase -i`)
- **Resolving conflicts**: editing conflict markers by hand, then continuing the rebase or merge
## Useful Commands
 
```bash
git rebase -i HEAD~3      # squash or reword the last 3 commits
git rebase main           # replay my branch on top of main
git add <file>            # mark a conflict as resolved
git rebase --continue     # carry on after fixing a conflict
```