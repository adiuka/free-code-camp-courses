Build an app that is functionally similar to this example project. Try not to copy the example project, give it your own personal style.

In this lab, you will build a real-time character counter by using JavaScript. The character counter will display the number of characters entered in a textarea element. The counter will update in real-time as the user types in the textarea.

Objective: Fulfill the user stories below and get all the tests to pass to complete the lab.

User Stories:

    1. You should have a textarea element with the id of text-input.
    2. There should be a p element with the id of char-count. It should initially contain the text Character Count: 0/50. This placeholder text should be replaced with the current count of characters in the textarea element.
    3. When the #text-input element contains the text hello coder the #char-count element should contain the text "Character Count: 11/50"
    4. When the #text-input element contains the text i am a programmer the #char-count element should contain the text "Character Count: 17/50"
    5. When the #text-input element contains the text hello world the #char-count element should contain the text "Character Count: 11/50"
    6. When the #text-input element contains the text I am learning a new language and it is called c++. the #char-count element should contain the text "Character Count: 50/50". NOTE: While the maxlength attribute would achieve the correct functionality, this lab requires a JavaScript only solution.
    7. The user should not be able to enter more than 50 characters in the textarea element. When the character count reaches 50, any extra input should be automatically trimmed and the text Character Count: 50/50 should be displayed in red.
