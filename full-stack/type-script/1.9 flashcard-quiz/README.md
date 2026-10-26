# flashcard-quiz-app

In this lab, you will create an app that displays and stores flashcard data that can be retrieved later.

Objective: Fulfill the user stories below and get all the tests to pass to complete the lab.

User Stories:

    1. You should have an HTML element with an id of flashcard.
    2. You should have an interface called FlashCard.
    3. The FlashCard interface should contain the following properties questionText and questionAnswer both of type string.
    4. You should have a collection of FlashCard elements called currentCards.
    5. When the #flashcard element is clicked, the card should have the flipped class.
    6. You should have an element with an id of delete-btn.
    7. When the #delete-btn element is clicked, it should remove current card and display the previous card data.
    8. You should create an entry form with an id of entry-form to be able to add more flashcards to the currentCards collection on submit.
    9. The two elements inside of the form should have an id of front-text and back-text respectively.
    10. You should create and call an InvalidUserInputError when either the question text or question answer is empty in the entry form.
