#!/bin/bash

PSQL="psql -X --username=freecodecamp --dbname=salon --tuples-only --no-align -c"

echo -e "\n~~ The Kurzmann Hair Salon ~~\n"

MAIN_MENU() {
  if [[ $1 ]]
  then
    echo -e "\n$1"
  fi

  echo -e "\nWeclome to our hair salon! Please choose a service"
  echo "$($PSQL "SELECT service_id, name FROM services ORDER BY service_id")" | while IFS="|" read SERVICE_ID NAME
  do
    echo "$SERVICE_ID) $NAME"
  done
  read SERVICE_ID_SELECTED

  SERVICE_NAME=$($PSQL "SELECT name FROM services WHERE service_id = $SERVICE_ID_SELECTED")
  if [[ -z $SERVICE_NAME ]]
  then
    MAIN_MENU "Could not find that service. What would you like today?"
  else
    echo -e "\nPlease enter your phone numer:"
    read CUSTOMER_PHONE
    # check if phone number exists
    CUSTOMER_NAME=$($PSQL "SELECT name FROM customers WHERE phone = '$CUSTOMER_PHONE'")
    # if not ask for name
    if [[ -z $CUSTOMER_NAME ]]
    then
      echo -e "\nPlease enter your name:"
      read CUSTOMER_NAME
      # add name and phone into DB
      INSERT_CUSTOMER_RESULT=$($PSQL "INSERT INTO customers(phone, name) VALUES('$CUSTOMER_PHONE', '$CUSTOMER_NAME')")
      # ask for time
      echo -e "\nPlease enter your desired appointment time for $SERVICE_NAME $CUSTOMER_NAME:"
      read SERVICE_TIME
      CUSTOMER_ID=$($PSQL "SELECT customer_id FROM customers WHERE phone = '$CUSTOMER_PHONE'")
      INSERT_APPOINTMENT_RESULT=$($PSQL "INSERT INTO appointments(customer_id, service_id, time) VALUES($CUSTOMER_ID, $SERVICE_ID_SELECTED, '$SERVICE_TIME')")
      if [[ $INSERT_APPOINTMENT_RESULT == "INSERT 0 1" ]]
      then
        echo -e "\nI have put you down for a $SERVICE_NAME at $SERVICE_TIME, $CUSTOMER_NAME."
      fi
    # if exists 
    else
      # ask for time
      CUSTOMER_ID=$($PSQL "SELECT customer_id FROM customers WHERE phone = '$PHONE_NUMBER'")
      echo -e "\nWelcome back $CUSTOMER_NAME, please enter your desired time for $SERVICE_NAME:"
      read SERVICE_TIME
      INSERT_APPOINTMENT_RESULT=$($PSQL "INSERT INTO appointments(customer_id, service_id, time) VALUES($CUSTOMER_ID, $SERVICE_ID_SELECTED, '$SERVICE_TIME')")
      if [[ $INSERT_APPOINTMENT_RESULT == "INSERT 0 1" ]]
      then
        echo -e "\nI have put you down for a $SERVICE_NAME at $SERVICE_TIME, $CUSTOMER_NAME."
      fi
    fi
  fi
}

MAIN_MENU