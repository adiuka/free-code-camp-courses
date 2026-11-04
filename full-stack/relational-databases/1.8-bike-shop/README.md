# Bike Rental Shop: What I Did and Learned
 
## About the project
 
This is a command-line app for a small bike rental shop, built as part of the freeCodeCamp Relational Database course. Instead of keeping track of rentals on paper, the shop owner (or a customer at a kiosk) uses a text menu in the terminal. All the data lives in a PostgreSQL database: the bikes the shop owns (type, size, and whether each is available), the customers (name and phone number), and a record of every rental with its return date.
 
The project ties together two skills from the course: **Bash scripting** for the interface and logic, and **PostgreSQL** for storing and querying the data.
 
## What I built
 
An interactive Bash script that runs a bike rental shop on top of a PostgreSQL database (`bikes`). It connects with `psql` and lets a user:
 
1. **Rent a bike**: see the available bikes, pick one, give a phone number (and a name if they're a new customer), and the rental is recorded.
2. **Return a bike**: look up their open rentals by phone number, pick one to return, and the bike is marked available again.
3. **Exit** with a goodbye message.
## How it works
 
- A `PSQL` variable holds the `psql` command (`-X`, `--tuples-only`, `-c`) so every query is run the same way and the output is clean.
- The script is split into functions: `MAIN_MENU`, `RENT_MENU`, `RETURN_MENU`, and `EXIT`.
- A `case` statement routes the menu choice, and `MAIN_MENU` takes an optional message so any dead end can return to the menu with feedback.
- Database tables used: `bikes`, `customers`, and `rentals`.
  - Renting inserts into `rentals` and sets `available = false`.
  - Returning sets `date_returned = NOW()` and `available = true`.
## What I learned
 
- **Running SQL from Bash**: capturing query results into variables with `$(...)`, and building queries with variable interpolation.
- **Menu-driven scripts**: using functions, `case`, and `read` to build an interactive program.
- **Input validation**: checking numeric input with a regex (`=~ ^[0-9]+$`) and checking for empty results with `-z`.
- **Parsing `psql` output**: using `while read` with `|` as a separator to split columns, and `sed` to tidy up whitespace and formatting.
- **Relational queries**: using `INNER JOIN ... USING(...)` to connect bikes, rentals, and customers, and `IS NULL` to find rentals not yet returned.
- **Keeping data consistent**: updating several tables together so rentals and bike availability stay in sync.
- **Database backups**: dumping the finished database with `pg_dump` so the project can be restored later.