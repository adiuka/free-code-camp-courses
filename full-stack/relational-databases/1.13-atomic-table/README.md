# Periodic Table Project: What I Learned
 
## PostgreSQL
 
**Strip trailing zeros from a numeric column**
```sql
ALTER TABLE properties ALTER COLUMN atomic_mass TYPE DECIMAL;
UPDATE properties SET atomic_mass = TRIM(TRAILING '0' FROM atomic_mass::TEXT)::DECIMAL;
```
A bare `DECIMAL` has no fixed scale, so `6.940000` becomes `6.94`.
 
**Delete in foreign key order**
Delete from the child table (`properties`) before the parent (`elements`).
```sql
DELETE FROM properties WHERE atomic_number = 1000;
DELETE FROM elements WHERE atomic_number = 1000;
```
 
**Fix typos with UPDATE**
```sql
UPDATE elements SET name = 'Fluorine' WHERE atomic_number = 9;
```
Checkers compare exact strings, so spelling matters (`Flourine` vs `Fluorine`).
 
**Remove a redundant column**
```sql
ALTER TABLE properties DROP COLUMN type;
```
This also fixes the `column reference "type" is ambiguous` error when joining with `types`. Otherwise, qualify it as `types.type`.
 
**Back up the database** (run in bash, not psql)
```bash
pg_dump -cC --inserts -U freecodecamp periodic_table > periodic_table.sql
```
 
## Git
 
```bash
git init
git branch -M main        # rename the current branch to main
git add .
git commit -m "Initial commit"
```
- A branch only truly exists after the first commit.
- Later commit messages must start with `fix:`, `feat:`, `refactor:`, `chore:` or `test:`.
## Bash script (`element.sh`)
 
- Check for a missing argument with `[[ -z $1 ]]`, not `read`. Avoid `echo -e` and extra `\n`, since the output must match exactly.
- Use `chmod +x element.sh` to make it executable.
- Use one query for all input types by comparing as text:
```sql
  WHERE atomic_number::TEXT = '$1' OR symbol = '$1' OR name = '$1'
```
  Without the `::TEXT` cast, comparing `atomic_number = 'H'` throws an error.
- Use `psql ... -t --no-align -c` for clean, headerless output like `1|Hydrogen|H|...`.
- Split the result into variables with `IFS="|" read A B C <<< "$RESULT"`.
- If `$RESULT` is empty, print `I could not find that element in the database.`
## Takeaways
 
- Read the exact expected output and match it character for character.
- Order matters with foreign keys: insert parents first, delete children first.
- Clean up leftover columns and rows from earlier steps, since they can break later queries.