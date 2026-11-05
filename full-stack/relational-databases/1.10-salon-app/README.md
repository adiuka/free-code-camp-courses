# Salon Appointment Script: Notes
 
## 1. Database setup
 
The script needs a `salon` database with three tables. A typical schema for this assignment:
 
```sql
CREATE DATABASE salon;
\c salon
 
CREATE TABLE customers (
  customer_id SERIAL PRIMARY KEY,
  phone VARCHAR UNIQUE NOT NULL,
  name VARCHAR NOT NULL
);
 
CREATE TABLE services (
  service_id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL
);
 
CREATE TABLE appointments (
  appointment_id SERIAL PRIMARY KEY,
  customer_id INT NOT NULL REFERENCES customers(customer_id),
  service_id INT NOT NULL REFERENCES services(service_id),
  time VARCHAR NOT NULL
);
 
INSERT INTO services(name) VALUES ('cut'), ('color'), ('perm');
```
 
- Check the structure with `\d tablename` and the tables with `\dt`.
- The `salon` database can disappear after an environment reset, so keep a backup:
  `pg_dump -cC --inserts -U freecodecamp salon > salon.sql`
- Reset test data without touching `services`:
```sql
TRUNCATE TABLE customers RESTART IDENTITY CASCADE;
```
 
`CASCADE` also empties `appointments`, because it has a foreign key to `customers`. `RESTART IDENTITY` resets the serial counters.
 
## 2. The PSQL variable
 
```bash
PSQL="psql -X --username=freecodecamp --dbname=salon --tuples-only --no-align -c"
```
 
- `-X` skips your `.psqlrc`.
- `--tuples-only` removes headers and the `(3 rows)` footer.
- `--no-align` separates columns with `|` and removes padding, so output is easy to parse.
- Run a query with `$($PSQL "SELECT ...")`. The double quotes wrap only the SQL, and string values inside use single quotes.
## 3. Bash lessons
 
**Functions only run when called.** Defining `MAIN_MENU() { ... }` does nothing until `MAIN_MENU` appears on its own line at the bottom.
 
**Looping over query output**
 
```bash
echo "$($PSQL "SELECT service_id, name FROM services ORDER BY service_id")" | while IFS="|" read SERVICE_ID NAME
do
  echo "$SERVICE_ID) $NAME"
done
```
 
`IFS="|"` splits each row on the `|` that `--no-align` produces.
 
**Variables must match exactly.** Most of the bugs in this script were naming mismatches:
 
- `$SELECTED_SERVICE` was never set, which left an empty value in the SQL (`VALUES(1, , '10:30')`) and caused a syntax error.
- `$CUSTOMER_PHONE` was checked while the input was read into `$PHONE_NUMBER`, so every customer looked new.
- `READ` in uppercase is "command not found". Bash is case-sensitive.
**Validate with the lookup result, not the raw input.** Testing `-z $SERVICE_SELECTION` only catches empty input. Testing `-z $SERVICE_NAME` (the name looked up from the database) also catches numbers that don't exist.
 
**`[[ $a > 3 ]]` compares strings, not numbers.** Use `-gt` for numeric comparison, or better, check that the row exists in the database.
 
**Debugging tip:** when a SQL syntax error appears, `echo` the query string before running it. An empty variable becomes obvious.
 
## 4. SQL lessons
 
- Column order in `INSERT INTO customers(phone, name) VALUES(...)` must match the values. Swapping them stored the name in the `phone` column, so the next lookup by phone found nothing, `CUSTOMER_ID` came back empty, and the appointment insert failed.
- Look customers up by `phone` (unique), not by name, since names can repeat.
- `UNIQUE` on `phone` means inserting the same number twice fails, which is why repeat test runs error out until the tables are truncated.
- `INSERT 0 1` is the success message for a single-row insert. Comparing against it confirms an insert worked.
## 5. Script flow
 
1. Print the numbered service menu from the database.
2. Read the choice and look up the service name. If it's empty, call `MAIN_MENU` again with an error message.
3. Ask for the phone number and look up the customer.
4. If the customer is new, ask for their name and insert them.
5. Ask for the appointment time, get the `customer_id`, and insert the appointment.
6. Print the required confirmation and let the script end.
The checker needs this exact format, including the final period:
 
```
I have put you down for a <service> at <time>, <name>.
```
 
## 6. Things to watch in the final script
 
- **The "welcome back" branch still uses `$PHONE_NUMBER`** in its `CUSTOMER_ID` lookup, but the variable was renamed to `CUSTOMER_PHONE`. For returning customers, `CUSTOMER_ID` will be empty and the appointment insert will fail. Change it to `$CUSTOMER_PHONE`.
- Fix the typos in the prompts: "Weclome" and "numer".
- A non-numeric service choice (e.g. `abc`) makes the service lookup throw a SQL error. Adding `2>/dev/null` to that query hides the noise, and the `-z $SERVICE_NAME` check still handles it.
- The time prompt and appointment insert are duplicated in both branches. Moving them after the `if/else` would let both new and returning customers share one copy, with only the "ask for name and insert customer" step staying inside the `if`.
- The script must finish after printing the confirmation, since the tests won't pass if it keeps waiting. Yours does.