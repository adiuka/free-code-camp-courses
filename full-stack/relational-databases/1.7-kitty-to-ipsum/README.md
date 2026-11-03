# Kitty Ipsum to Doggy Ipsum Translator
 
A small Bash project built while learning the Linux command line. It does two things:
 
1. **Analyzes** kitty ipsum text files (counts lines, words, characters, and finds "meow" and "cat" words).
2. **Translates** kitty ipsum into doggy ipsum using `sed`.
Commands used: `echo`, `cat`, `wc`, `grep`, `sed`, `diff`, plus redirection and pipes.
 
---
 
## Files
 
| File | Purpose |
|------|---------|
| `kitty_ipsum_1.txt`, `kitty_ipsum_2.txt` | Input text (kitty ipsum) |
| `kitty_info` | Report generated from the analysis commands |
| `translate.sh` | The translator script |
| `doggy_1`, `doggy_2` | Translated output |
 
---
 
## Part 1: Bash basics used along the way
 
### Redirection
 
| Syntax | Meaning |
|--------|---------|
| `>` | Write stdout to a file (overwrites) |
| `>>` | Append stdout to a file |
| `2>` | Redirect stderr (errors) to a file |
| `1>` | Redirect stdout explicitly (same as `>`) |
| `<` | Use a file as stdin |
| `\|` | Pipe: send the output of one command into the next |
 
```bash
echo hello bash > stdout.txt       # overwrite
echo hello bash >> stdout.txt      # append
bad_command 2> stderr.txt          # capture the error message
read NAME < name.txt               # read input from a file
echo your_name | cat               # pipe into another command
```
 
### A first script
 
```bash
touch script.sh      # create the file
chmod +x script.sh   # make it executable
./script.sh          # run it
```
 
The first line of a script is the **shebang**, which tells the system which interpreter to use:
 
```bash
#!/bin/bash
```
 
---
 
## Part 2: Analyzing the text (`kitty_info`)
 
### `wc` (word count)
 
```bash
wc -l file    # lines
wc -w file    # words
wc -m file    # characters
```
 
Using `<` (`wc -m < file`) prints just the number. Passing the filename as an argument also prints the filename next to the number.
 
### `grep` (search)
 
| Command | What it does |
|---------|--------------|
| `grep meow file` | Show lines containing "meow" |
| `grep --color -n 'cat' file` | Highlight matches and show line numbers |
| `grep -o 'meow[a-z]*' file` | Print **only** the matching part, one match per line |
| `grep -c pattern file` | Count matching **lines** (not individual matches) |
 
> **Tip:** `-c` counts lines, not matches. If a line has two "meow"s it counts once. To count every occurrence, use `grep -o ... | wc -l`.
 
The pattern `meow[a-z]*` matches "meow" followed by any number of lowercase letters, so it catches `meow`, `meowzer`, and similar words. The same idea is used for `cat[a-z]*` (`cat`, `cats`, `catnip`).
 
### Counting matches
 
```bash
grep -o 'meow[a-z]*' kitty_ipsum_1.txt | wc -l
```
 
`-o` puts each match on its own line, and `wc -l` counts those lines.
 
### `sed` to extract line numbers
 
`grep -n` prints results like `12:some meow text`. To keep only the line number:
 
```bash
grep -n 'meow[a-z]*' kitty_ipsum_1.txt | sed -E 's/([0-9]+).*/\1/'
```
 
How it works:
 
- `-E` enables extended regular expressions (so `+` works without escaping).
- `([0-9]+)` captures one or more digits at the start of the line.
- `.*` matches the rest of the line.
- `\1` replaces everything with just the captured digits.
### Building the report
 
The report is built step by step with `echo` for the headings and `>>` to append each result:
 
```bash
echo ~~ kitty_ipsum_1.txt info ~~ > kitty_info
echo -e "\nNumber of lines:" >> kitty_info
wc -l < kitty_ipsum_1.txt >> kitty_info
echo -e "\nNumber of words:" >> kitty_info
wc -w < kitty_ipsum_1.txt >> kitty_info
# ...and so on for characters, meow matches, cat matches, and their line numbers
```
 
`echo -e` enables escape sequences such as `\n` (newline), which adds blank lines between sections. The same steps are repeated for `kitty_ipsum_2.txt`.
 
---
 
## Part 3: The translator (`translate.sh`)
 
### Usage
 
```bash
./translate.sh kitty_ipsum_1.txt           # file as argument
./translate.sh < kitty_ipsum_1.txt         # file as stdin
cat kitty_ipsum_1.txt | ./translate.sh     # piped input
./translate.sh kitty_ipsum_1.txt > doggy_1 # save the result
```
 
All three input styles work because `cat $1` falls back to reading stdin when `$1` is empty.
 
### The script
 
Reconstructed from the steps above (adjust it to match your final version):
 
```bash
#!/bin/bash
 
cat $1 | sed -E '
  s/catnip/dogchow/g
  s/cat/dog/g
  s/meow|meowzer/woof/g
'
```
 
### The `sed` substitutions
 
The general form is `s/old/new/flags`.
 
| Rule | Effect |
|------|--------|
| `s/catnip/dogchow/g` | `catnip` becomes `dogchow` |
| `s/cat/dog/g` | `cat` becomes `dog` (also changes `cats` to `dogs`, `catch` to `dogch`, etc.) |
| `s/meow\|meowzer/woof/g` | `meow` and `meowzer` become `woof` |
 
Things worth knowing:
 
- **The `g` flag** means "global". Without it, `sed` only replaces the *first* match on each line.
- **`-E`** enables extended regex, which is what makes the `|` ("or") work in the last rule.
- **Order matters.** `catnip` must be replaced *before* `cat`; otherwise `catnip` would turn into `dognip` and the `dogchow` rule would never match.
- **Alternation order matters too.** In `meow|meowzer`, the regex tries `meow` first, so `meowzer` becomes `woofzer`, not `woof`. Writing `meowzer|meow` (longer word first) or `meow(zer)?` fixes this.
- **Case:** the `i` flag (as in `s/old/new/i`) makes a match case-insensitive. It was tried on `name.txt` but isn't needed here unless the text contains capitals such as `Cat`.
### Checking the result
 
Search the translated output for leftovers or to see the new words:
 
```bash
./translate.sh kitty_ipsum_1.txt | grep --color dogchow
./translate.sh kitty_ipsum_1.txt | grep --color -E 'meow|cat'   # should find nothing
```
 
Compare the original and translated files line by line:
 
```bash
diff --color kitty_ipsum_1.txt doggy_1
```
 
`diff` shows exactly which lines changed, which is a quick way to confirm the translation did what you expected.
 
---
 
## Quick reference
 
```bash
# Analyze
wc -l < file                              # count lines
grep -o 'meow[a-z]*' file | wc -l         # count every meow-word
grep -n 'cat[a-z]*' file | sed -E 's/([0-9]+).*/\1/'   # line numbers only
 
# Translate
./translate.sh kitty_ipsum_1.txt > doggy_1
diff --color kitty_ipsum_1.txt doggy_1
```