# character-db: Relational Databases in psql
 
Notes from the Relational Databases workshop. The project builds a **character database** (`character-db`) in PostgreSQL, covering the core ideas of relational design: tables, keys, constraints, relationships, and joins.
 
## Table of Contents
 
1. [Database Structure](#1-database-structure)
2. [Key Concepts](#2-key-concepts)
3. [Relationship Types](#3-relationship-types)
4. [Joins](#4-joins)
5. [Useful psql Commands](#5-useful-psql-commands)
6. [Design Takeaways](#6-design-takeaways)
7. [Creating the Tables](#7-creating-the-tables)
---
 
## 1. Database Structure
 
| Table | Purpose | Relationship to `characters` |
|---|---|---|
| `characters` | Main entity: name, homeland, favorite color | n/a (parent table) |
| `more_info` | Birthday, height, weight | **One-to-one** |
| `sounds` | Sound file names | **One-to-many** |
| `actions` | List of possible actions | **Many-to-many** (via junction table) |
| `character_actions` | Links characters and actions | Junction table |
 
The `*_seq` entries shown by `\d` are **sequences**. PostgreSQL creates them automatically for `SERIAL` columns to generate auto-incrementing IDs.
 
### Schema diagram
 
```
characters ──┬── 1:1 ───── more_info
             ├── 1:many ── sounds
             └── 1:many ── character_actions ── many:1 ── actions
```
 
---
 
## 2. Key Concepts
 
### Primary keys
 
Each table has a unique identifier for its rows (`character_id`, `sound_id`, ...). These are `integer` columns with a `nextval(...)` default, so they auto-increment.
 
```sql
"characters_pkey" PRIMARY KEY, btree (character_id)
```
 
### Foreign keys
 
A foreign key points to a primary key in another table, enforcing **referential integrity**. You can't insert a sound for a character that doesn't exist.
 
```sql
"sounds_character_id_fkey" FOREIGN KEY (character_id) REFERENCES characters(character_id)
```
 
### Composite primary key
 
`character_actions` has no ID column of its own. Its primary key is the *combination* of two columns, which prevents duplicate pairs.
 
```sql
"character_actions_pkey" PRIMARY KEY, btree (character_id, action_id)
```
 
### Constraints
 
- **`NOT NULL`**: value is required (`name`, `homeland`, `filename`, ...)
- **`UNIQUE`**: no duplicates allowed (`sounds.filename`, `actions.action`)
- **Typed columns with limits**: `VARCHAR(30)`, `NUMERIC(4,1)` (e.g. `123.4` kg), `DATE`
---
 
## 3. Relationship Types
 
### One-to-one: `characters` ↔ `more_info`
 
The `UNIQUE` constraint on `more_info.character_id` ensures each character has **at most one** `more_info` row.
 
```
characters (1) ──── (1) more_info
```
 
### One-to-many: `characters` ↔ `sounds`
 
`character_id` is a foreign key in `sounds` but **not** unique, so one character can have many sounds.
 
```
characters (1) ──── (∞) sounds
```
 
### Many-to-many: `characters` ↔ `actions`
 
A single foreign key can't model this. It needs a **junction table** (`character_actions`) holding foreign keys to both sides.
 
```
characters (1) ──── (∞) character_actions (∞) ──── (1) actions
```
 
---
 
## 4. Joins
 
The final query of the workshop joins everything together:
 
```sql
SELECT * FROM character_actions
FULL JOIN characters ON character_actions.character_id = characters.character_id
FULL JOIN actions ON character_actions.action_id = actions.action_id;
```
 
- Joins the junction table to `characters` and to `actions` via the foreign keys.
- `FULL JOIN` keeps **all rows from both sides**, even unmatched ones (characters with no actions, actions with no characters), filling gaps with `NULL`.
### Join types
 
| Join | Returns |
|---|---|
| `INNER JOIN` | Only rows with matches on both sides |
| `LEFT JOIN` | All left rows + matches from the right |
| `RIGHT JOIN` | All right rows + matches from the left |
| `FULL JOIN` | All rows from both sides |
 
---
 
## 5. Useful psql Commands
 
| Command | What it does |
|---|---|
| `\l` | List databases |
| `\c character-db` | Connect to a database |
| `\d` | List relations (tables, sequences) |
| `\d tablename` | Describe a table (columns, indexes, keys) |
| `\q` | Quit psql |
 
---
 
## 6. Design Takeaways
 
1. **Split data into separate tables** instead of one giant table, which avoids repetition.
2. **Connect tables with keys**: primary keys identify rows, foreign keys reference them.
3. **Pick the relationship type first**, since it decides where the foreign key goes:
   - 1:1 → foreign key + `UNIQUE`
   - 1:many → foreign key on the "many" side
   - many:many → junction table
4. **Let the database enforce rules** with `NOT NULL`, `UNIQUE`, and foreign keys rather than relying on application code.
5. **Use joins to reassemble** the split data when querying.
---
 
## 7. Creating the Tables
 
Reconstructed from the schema output (`\d`):
 
```sql
CREATE TABLE characters (
  character_id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  homeland VARCHAR(60) NOT NULL,
  favorite_color VARCHAR(30)
);
 
CREATE TABLE more_info (
  more_info_id SERIAL PRIMARY KEY,
  birthday DATE,
  height_in_cm INT,
  weight_in_kg NUMERIC(4,1),
  character_id INT NOT NULL UNIQUE REFERENCES characters(character_id)
);
 
CREATE TABLE sounds (
  sound_id SERIAL PRIMARY KEY,
  filename VARCHAR(40) NOT NULL UNIQUE,
  character_id INT NOT NULL REFERENCES characters(character_id)
);
 
CREATE TABLE actions (
  action_id SERIAL PRIMARY KEY,
  action VARCHAR(20) NOT NULL UNIQUE
);
 
CREATE TABLE character_actions (
  character_id INT NOT NULL REFERENCES characters(character_id),
  action_id INT NOT NULL REFERENCES actions(action_id),
  PRIMARY KEY (character_id, action_id)
);
```