# student-db-2
 
A Bash script that queries a PostgreSQL `students` database (provided) using `psql`. This README summarizes the SQL and shell concepts practiced in `students.sh`.
 
## Database
 
| Table | Columns |
|---|---|
| `students` | `student_id`, `first_name`, `last_name`, `major_id` (nullable), `gpa` (nullable) |
| `majors` | `major_id`, `major` |
| `courses` | `course_id`, `course` |
| `majors_courses` | `major_id`, `course_id` (join table for the many-to-many relationship) |
 
## Shell setup
 
```bash
PSQL="psql -X --username=freecodecamp --dbname=students --no-align --tuples-only -c"
```
 
- `-X` skips the `.psqlrc` file so output is predictable.
- `--no-align --tuples-only` removes padding, headers, and row counts, leaving clean output for scripts.
- `echo "$($PSQL "...")"` preserves the newlines between rows. Unquoted `echo $(...)` collapses them, which is fine for a single value like the average GPA.
## Filtering with `WHERE`
 
- **Comparison:** `gpa = 4.0`, `course < 'D'` (strings compare alphabetically).
- **AND / OR with parentheses:** `last_name >= 'R' AND (gpa > 3.8 OR gpa < 2.0)`. `AND` binds tighter than `OR`, so parentheses change the result.
- **NULL checks:** use `IS NULL`, never `= NULL`.
## Pattern matching
 
| Pattern | Meaning |
|---|---|
| `LIKE` | case-sensitive match |
| `ILIKE` | case-insensitive match |
| `%` | any number of characters |
| `_` | exactly one character |
| `'_e%'` | second letter is `e` |
| `'%r_'` | second-to-last letter is `r` |
| `'%s'` | ends with `s` |
 
## Sorting and limiting
 
```sql
SELECT course FROM courses
WHERE course LIKE '_e%' OR course LIKE '%s'
ORDER BY course DESC LIMIT 5;
```
 
`ORDER BY` runs before `LIMIT`, so this returns the first five rows of the reversed list.
 
## Aggregates and grouping
 
```sql
SELECT major_id, COUNT(*) AS number_of_students, ROUND(AVG(gpa), 2) AS average_gpa
FROM students
GROUP BY major_id
HAVING COUNT(*) > 1;
```
 
- `COUNT`, `AVG`, and `ROUND` compute per-group statistics, and `AS` renames output columns.
- **`WHERE` vs `HAVING`:** `WHERE` filters rows before grouping; `HAVING` filters groups after. Aggregates like `COUNT(...)` can only be filtered with `HAVING`.
- Students with a `NULL` `major_id` all fall into a single group.
## Joins
 
- **`INNER JOIN`** keeps only rows that match in both tables.
- **`LEFT JOIN`** keeps every row from the left table, filling unmatched right-side columns with `NULL`.
- **`RIGHT JOIN`** is the mirror image: keeps every row from the right table.
- **`USING(column)`** is shorthand for joining on a column with the same name in both tables, and returns that column only once.
- **Finding "nothing" matches:** a `LEFT`/`RIGHT JOIN` followed by `WHERE student_id IS NULL` finds rows with no related records (for example, majors no student has chosen).
- **Many-to-many:** `students` → `majors` → `majors_courses` → `courses` links a student to their courses through their major.
### Example: courses with exactly one student
 
```sql
SELECT course
FROM students
INNER JOIN majors USING(major_id)
INNER JOIN majors_courses USING(major_id)
INNER JOIN courses USING(course_id)
GROUP BY course
HAVING COUNT(course) = 1
ORDER BY course;
```
 
Joins multiply rows (one per student per course), so grouping by `course` and counting gives the number of enrolled students. Students without a major drop out of the inner join, which is correct since they aren't enrolled in any course.
 
## Other notes
 
- `DISTINCT` removes duplicate rows from the result.
- `ROUND(AVG(gpa), 2)` ignores `NULL` GPAs when averaging.
- Clause order: `SELECT` → `FROM` / `JOIN` → `WHERE` → `GROUP BY` → `HAVING` → `ORDER BY` → `LIMIT`.
