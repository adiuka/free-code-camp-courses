# theme-switcher

In this lab, you will build an app that switches between different themes. When you switch to a different theme, the background color will change and a different message will display.

Objective: Fulfill the user stories below and get all the tests to pass to complete the lab.

User Stories:

    1. You should have a button element with the text Switch Theme.
    2. Your button element should have the following attributes:
        An id attribute set to "theme-switcher-button".
        An aria-haspopup attribute set to "true".
        An aria-expanded attribute set to "false".
        An aria-controls attribute set to "theme-dropdown".
    3. You should have a ul element with the following attributes:
        An id attribute set to "theme-dropdown".
        A role attribute set to "menu".
        An aria-labelledby attribute set to "theme-switcher-button".
        A hidden attribute.
    4. Your ul element should have at least two li elements with a role attribute set to "menuitem" and text of your choice representing a different theme.
    5. Each of your li elements should have an id attribute that starts with theme- and ends with the theme you set for the li element text. For example, if one of your themes is Light then your id should be theme-light.
    6. You should have an element with an aria-live attribute set to "polite".
    7. You should have a themes array with at least two objects that each contain a name and message property. The name will represent a different theme and the message will display when the theme switches. You are free to come up with name and message values of your choice but the name values should match the text content of your li elements.
    8. When a user clicks on the #theme-switcher-button, the #theme-dropdown element should display the available themes.
    9. When the #theme-dropdown element is displayed, the aria-expanded attribute should be set to "true" for the button element.
    10. When the users clicks on the #theme-switcher-button while the #theme-dropdown element is displayed, the menu should be closed and the hidden attribute should be added and the aria-expanded attribute should be set to "false".
    11. When a user clicks on the #theme-switcher-button and selects a theme, the corresponding theme-<name> class should be added to the body element and the related theme message you set in the themes array should display in the aria-live="polite" element.
    12. When a user clicks on the #theme-switcher-button and selects a different theme than the current one, the body theme class and status message should update to match the new selection.
