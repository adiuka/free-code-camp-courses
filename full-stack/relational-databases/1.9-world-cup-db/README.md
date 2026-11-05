# PostgreSQL & Bash Notes: World Cup Database Project
 
## 1. Altering tables
 
**Rename a column**
 
```sql
ALTER TABLE table_name RENAME COLUMN old_name TO new_name;
```
 
**Add a column with a foreign key** (a column needs a type; `FOREIGN KEY` is not a type)
 
```sql
-- One statement
ALTER TABLE games ADD COLUMN winner_id INT REFERENCES teams(team_id);
 
-- Or separately, with a named constraint
ALTER TABLE games ADD COLUMN winner_id INT;
ALTER TABLE games
  ADD CONSTRAINT games_winner_id_fkey
  FOREIGN KEY (winner_id) REFERENCES teams(team_id);
```
 
- The referenced column must be a primary key or `UNIQUE`.
- Check results with `\d table_name`.
**Add NOT NULL to many columns**
 
```sql
ALTER TABLE games
  ALTER COLUMN year SET NOT NULL,
  ALTER COLUMN round SET NOT NULL;
```
 
Or generate the statements and run them with `\gexec`:
 
```sql
SELECT format('ALTER TABLE %I.%I ALTER COLUMN %I SET NOT NULL;',
              table_schema, table_name, column_name)
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'games' AND is_nullable = 'YES' \gexec
```
 
- It fails if existing rows contain NULLs in that column.
## 2. Schema used in this project
 
```sql
CREATE DATABASE worldcup;
\c worldcup
 
CREATE TABLE teams (
  team_id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL UNIQUE
);
 
CREATE TABLE games (
  game_id SERIAL PRIMARY KEY,
  year INT NOT NULL,
  round VARCHAR NOT NULL,
  winner_id INT NOT NULL REFERENCES teams(team_id),
  opponent_id INT NOT NULL REFERENCES teams(team_id),
  winner_goals INT NOT NULL,
  opponent_goals INT NOT NULL
);
```
 
## 3. Cloning and backing up databases
 
```sql
-- Clone (connect to a different db first; no one else may be connected to the source)
CREATE DATABASE worldcuptest TEMPLATE worldcup;
```
 
```bash
# Schema only
pg_dump -U freecodecamp --schema-only worldcup | psql -U postgres -d worldcuptest
 
# Full backup and restore
pg_dump -cC --inserts -U freecodecamp worldcup > worldcup.sql
psql -U postgres < worldcup.sql
```
 
- Environment resets can wipe the database. Back up regularly and commit scripts to git.
- If psql can't connect: `sudo service postgresql start`.
## 4. Insert script patterns (bash)
 
**Pick the database based on an argument**
 
```bash
if [[ $1 == "test" ]]
then
  PSQL="psql --username=postgres --dbname=worldcuptest -t --no-align -c"
else
  PSQL="psql --username=freecodecamp --dbname=worldcup -t --no-align -c"
fi
```
 
**Check before inserting**
 
```bash
TEAM_ID=$($PSQL "SELECT team_id FROM teams WHERE name='$TEAM'")
if [[ -z $TEAM_ID ]]
then
  INSERT_RESULT=$($PSQL "INSERT INTO teams(name) VALUES('$TEAM')")
fi
```
 
- `-z` is true when the variable is empty.
- `-t --no-align` makes SELECT output bare values.
- `INSERT 0 1` is the success message for a single-row insert.
**Skip duplicates in SQL** (works because `name` is `UNIQUE`)
 
```sql
INSERT INTO teams(name) VALUES ('France') ON CONFLICT (name) DO NOTHING;
```
 
**Read a CSV and skip the header**
 
```bash
cat games.csv | while IFS="," read YEAR ROUND WINNER OPPONENT WINNER_GOALS OPPONENT_GOALS
do
  if [[ $WINNER != winner ]]
  then
    ...
  fi
done
```
 
**Efficiency ideas**
 
- Each `$PSQL` call opens a new connection, so fewer calls is faster.
- Use `ON CONFLICT DO NOTHING` instead of SELECT then INSERT.
- Look up IDs inside the INSERT with subqueries, so the script never needs `TEAM_ID` in bash.
- A single pass (ensure both teams exist, then insert the game) is fine; a two-pass approach is equally valid.
- `TRUNCATE TABLE games, teams RESTART IDENTITY` resets the serial IDs on reruns.
- Escape apostrophes in names by doubling them: `${TEAM//\'/\'\'}`.
## 5. Query cheat sheet
 
| Goal | Query |
|---|---|
| Total winner goals | `SELECT SUM(winner_goals) FROM games` |
| Total goals, both teams | `SELECT SUM(winner_goals + opponent_goals) FROM games` |
| Average winner goals | `SELECT AVG(winner_goals) FROM games` |
| Rounded average | `SELECT ROUND(AVG(winner_goals), 2) FROM games` |
| Average total goals per game | `SELECT AVG(winner_goals + opponent_goals) FROM games` |
| Most goals by one team | `SELECT MAX(winner_goals) FROM games` |
| Games with winner > 2 goals | `SELECT COUNT(*) FROM games WHERE winner_goals > 2` |
| Teams starting with "Co" | `SELECT name FROM teams WHERE name LIKE 'Co%' ORDER BY name` |
 
**Aggregate rules**
 
- Aggregates cannot be nested: `AVG(SUM(x))` is an error.
- To average a per-row combination, put the math inside: `AVG(a + b)`.
- `AVG` ignores NULLs.
- `GROUP BY` gives per-group results: `SELECT year, AVG(winner_goals) FROM games GROUP BY year`.
## 6. Joins
 
`games` references `teams` twice, so join once per foreign key and use aliases.
 
```sql
SELECT g.year, g.round, w.name AS winner, o.name AS opponent
FROM games g
INNER JOIN teams w ON g.winner_id = w.team_id
INNER JOIN teams o ON g.opponent_id = o.team_id;
```
 
**Unique winners**
 
```sql
SELECT DISTINCT name FROM games
INNER JOIN teams ON winner_id = team_id
ORDER BY name;
```
 
**Champions by year**
 
```sql
SELECT year, name FROM games
INNER JOIN teams ON winner_id = team_id
WHERE round = 'Final' ORDER BY year;
```
 
**Teams that played in a round** (winners and opponents, so use `UNION`)
 
```sql
SELECT name FROM games INNER JOIN teams ON winner_id = team_id
WHERE year = 2014 AND round = 'Eighth-Final'
UNION
SELECT name FROM games INNER JOIN teams ON opponent_id = team_id
WHERE year = 2014 AND round = 'Eighth-Final'
ORDER BY name;
```
 
- `UNION` removes duplicates; the final `ORDER BY` applies to the whole result.
- A join on `winner_id` alone only returns winners.
## 7. Handy reminders
 
- `LIKE` is case-sensitive; `ILIKE` is not.
- `%` matches any number of characters.
- With `--no-align`, columns are separated by `|`.
- Sanity checks: `SELECT COUNT(*) FROM games` should be 32 and `teams` should be 24 for this dataset.
- Wrap SQL in double quotes in bash and use single quotes for string values inside.