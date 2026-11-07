#!/bin/bash

PSQL="psql -X --username=freecodecamp --dbname=periodic_table --tuples-only --no-align -c"

# check if no argument
if [[ -z $1 ]]
then 
  echo -e "Please provide an element as an argument."
else
  # query result
  RESULT=$($PSQL "SELECT atomic_number, name, symbol, type, atomic_mass, melting_point_celsius, boiling_point_celsius
  FROM elements
  INNER JOIN properties USING(atomic_number)
  INNER JOIN types USING(type_id)
  WHERE atomic_number::TEXT = '$1' OR symbol = '$1' OR name = '$1'")

  # if cannot be found
  if [[ -z $RESULT ]]
  then
    # notify of result
    echo "I could not find that element in the database."
    else
      # destructure variables from $RESULT
      IFS="|" read ATOMIC_NUMBER NAME SYMBOL TYPE MASS MELT BOIL <<< "$RESULT"
      # return element information
      echo "The element with atomic number $ATOMIC_NUMBER is $NAME ($SYMBOL). It's a $TYPE, with a mass of $MASS amu. $NAME has a melting point of $MELT celsius and a boiling point of $BOIL celsius."
  fi
fi





