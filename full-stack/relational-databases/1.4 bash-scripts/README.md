# Bash Scripting Workshop
 
A small collection of bash scripts built while learning the basics of shell scripting.
 
## Scripts
 
| Script | What it does |
|--------|--------------|
| `questionnaire.sh` | Asks for your name, location and favorite coding website, then prints a personalized greeting |
| `countdown.sh` | Counts down to zero from a number given as an argument, one number per second |
| `bingo.sh` | Picks a random number from 1 to 75 and prints it with its bingo letter (B, I, N, G or O) |
| `fortune.sh` | Asks a yes/no question and answers with a random response, but only if the question ends with `?` |
| `five.sh` | Runs the four scripts above in order |
 
## Usage
 
Make the scripts executable once, then run them:
 
```bash
chmod +x *.sh
./questionnaire.sh
./countdown.sh 5
./bingo.sh
./fortune.sh
```
 
## What I learned
 
- **Script basics:** the `#!/bin/bash` shebang, comments, and `echo -e` for escape characters like `\n`
- **Variables and input:** assigning variables, reading user input with `read`, and using script arguments like `$1`
- **Random numbers:** using `$RANDOM` with arithmetic like `$(( RANDOM % 75 + 1 ))`
- **Conditionals:** `if` / `elif` / `else` with both `[[ ]]` tests (`-le`, `-lt`, `-gt`) and `(( ))` arithmetic comparisons
- **Loops:** `while` loops for counting down, `until` loops for repeating until valid input is given, and why a loop needs something that changes the condition
- **Functions:** defining functions, passing them arguments, and using `[[ ! $1 ]]` to check whether an argument was given
- **Arrays:** storing the fortune responses in an array and picking one by index
- **Regex matching:** checking that input ends with a question mark using `[[ $QUESTION =~ \?$ ]]`
- **Input validation:** showing a usage message when the countdown gets no valid argument
- **Combining scripts:** calling one script from another
## Ideas for next time
 
- Add `shellcheck` to catch common mistakes
- Quote variables (`"$NAME"`) to handle input with spaces safely
- Add a menu script that lets the user choose which program to run
