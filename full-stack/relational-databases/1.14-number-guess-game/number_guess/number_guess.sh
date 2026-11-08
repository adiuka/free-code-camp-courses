#!/bin/bash

PSQL="psql --username=freecodecamp --dbname=number_guess -t --no-align -c"

echo -e "\n~~Number guessing game~~\n"

# set number and 'login'
SECRET_NUMBER=$(( RANDOM % 1000 + 1 ))
echo Enter your username:
read USERNAME

# check for a user_id
USER_ID=$($PSQL "SELECT user_id FROM users WHERE username='$USERNAME'")
# if doesnt exist
if [[ -z $USER_ID ]]
then
  # greet and insert into db + retrieve user_id
  echo "Welcome, $USERNAME! It looks like this is your first time here."
  INSERT_USER_RESULT=$($PSQL "INSERT INTO users(username) VALUES('$USERNAME')")
  USER_ID=$($PSQL "SELECT user_id FROM users WHERE username='$USERNAME'")
else
  # retrieve and print best games
  GAMES_PLAYED=$($PSQL "SELECT COUNT(*) FROM games WHERE user_id=$USER_ID")
  BEST_GAME=$($PSQL "SELECT MIN(guesses) FROM games WHERE user_id=$USER_ID")
  echo "Welcome back, $USERNAME! You have played $GAMES_PLAYED games, and your best game took $BEST_GAME guesses."
fi

# Start game
echo -e "Guess the secret number between 1 and 1000:"
read GUESS
NUMBER_OF_GUESSES=1

while [[ $GUESS != $SECRET_NUMBER ]]
do
  # check if valid input
  if [[ ! $GUESS =~ ^[0-9]+$ ]]
  then
    echo -e "\nThat is not an integer, guess again:"
  # check if higher
  elif [[ $GUESS -gt $SECRET_NUMBER ]]
  then
    echo -e "\nIt's lower than that, guess again:"
  # check if lower
  else
    echo -e "\nIt's higher than that, guess again:"
  fi
  # read again
  read GUESS
  # increment guesses
  (( NUMBER_OF_GUESSES++ ))
done

# congratulate
echo -e "You guessed it in $NUMBER_OF_GUESSES tries. The secret number was $SECRET_NUMBER. Nice job!"
# add to db
ADD_GAME_TO_DB_RESULT=$($PSQL "INSERT INTO games(user_id, guesses) VALUES($USER_ID, $NUMBER_OF_GUESSES)")
