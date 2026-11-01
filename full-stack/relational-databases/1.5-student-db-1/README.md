# Student Database: Bash + PSQL Summary part 1
 
Built a `students` PostgreSQL database by loading `courses.csv` and `students.csv` with a Bash script.
 
## 1. Database Structure (from the dump)
 
| Table | Columns | Notes |
|---|---|---|
| `majors` | `major_id` (PK, serial), `major` | One row per major |
| `courses` | `course_id` (PK, serial), `course` | One row per course |
| `majors_courses` | `major_id`, `course_id` | Junction table, composite PK, both columns are FKs |
| `students` | `student_id` (PK), `first_name`, `last_name`, `major_id` (FK), `gpa` numeric(2,1) | `major_id` and `gpa` can be NULL |
 
**Key idea:** majors and courses are a **many-to-many** relationship, so they need the junction table `majors_courses`. Students to majors is **many-to-one** (a foreign key on `students`).
 
## 2. The PSQL Variable
 
```bash
PSQL="psql -X --username=freecodecamp --dbname=students --no-align --tuples-only -c"
```
 
- `-X`: ignore `.psqlrc` for consistent behaviour
- `--no-align --tuples-only`: output only raw values, with no headers, borders or padding, so results are easy to capture in Bash variables
- `-c`: run a single command string
Usage: `RESULT=$($PSQL "SELECT ...")`
 
## 3. Script Flow
 
1. **Reset:** `TRUNCATE students, majors, courses, majors_courses` for a clean slate.
2. **Read `courses.csv`** line by line:
   - `cat file | while IFS="," read MAJOR COURSE` splits each line on commas.
   - Skip the header row with `if [[ $MAJOR != major ]]`.
   - For each major and course: **SELECT its id → if empty, INSERT → SELECT the new id.**
   - Insert the pair into `majors_courses`.
3. **Read `students.csv`** (`first_name, last_name, major, gpa`):
   - Skip the header row.
   - Look up `major_id`. If not found, set it to `null`.
   - Insert the student.
## 4. Bash Concepts Used
 
- `while IFS="," read A B C` for parsing CSV rows
- `[[ -z $VAR ]]` tests for an empty or not-found result
- `$(...)` command substitution to capture query output
- `[[ $RESULT == "INSERT 0 1" ]]` checks that an insert succeeded (psql returns this string)
- `echo` for progress messages
## 5. SQL / Postgres Concepts Used
 
- Primary keys, foreign keys and composite keys
- `SERIAL` sequences for auto-incrementing ids (`nextval(...)`)
- `NULL` handling: `$MAJOR_ID` is `null` unquoted, so it inserts a real NULL
- `TRUNCATE` to empty multiple tables at once
- `pg_dump` output: recreates the DB, schema, data and sequences (this is what the dump file is)
## 6. Takeaways
 
- A "get id, insert if missing, get id again" pattern avoids duplicates when loading relational data.
- Junction tables link many-to-many data.
- `--tuples-only --no-align` makes `psql` scriptable.
- Students whose major isn't found still load, with `NULL` for `major_id`.
- Values are not quoted for `$GPA`, so an empty GPA would break the insert. Handling blanks would be a good improvement.
