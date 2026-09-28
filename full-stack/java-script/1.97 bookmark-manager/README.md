# bookmark-manager

For this lab, all the HTML and CSS has been provided to you. You will use JavaScript to complete the Bookmark Manager app so that it can store a collection of bookmarks in the local storage and read data from it.

Objective: Fulfill the user stories below and get all the tests to pass to complete the lab.

User Stories:

    1. You should have a getBookmarks function that returns the bookmarks array stored in the local storage. If the bookmarks key has not been set yet, or it doesn't contain a valid array with bookmarks, the getBookmarks function should return an empty array.
    2. The bookmarks key stored in the local storage should be an array of bookmark objects. Each bookmark object should have three keys: name, category, and url.
    3. You should have a function named displayOrCloseForm that toggles the hidden class on #main-section and #form-section.
    4. When you click #add-bookmark-button, you should update the inner text of .category-name to be the value of the selected option from #category-dropdown and call displayOrCloseForm to display the form section and hide the main section.
    5. When you click #close-form-button, you should run your function to hide the form section and display the main section.
    6. When you click #add-bookmark-button-form, you should update the bookmarks key stored in the local storage by adding a bookmark object to the end of the array. The object should have name set to the value of the #name input, category set to the value of the selected option from the category dropdown, and url set to the value of the #url input.
    7. Once the bookmarks key is updated, you should reset the value of #name and #url to an empty string before running your function to hide the form section and show the main section.
    8. You should have a function named displayOrHideCategory that toggles the hidden class on #main-section and #bookmark-list-section.
    9. When you click #view-category-button, you should update the inner text of .category-name to be the value of the selected option from #category-dropdown, modify the inner HTML of #category-list according to the user stories below, and call the displayOrHideCategory function.
    10. If none of the bookmarks in local storage have the category, you should set the inner HTML of the #category-list to a p element with the text No Bookmarks Found.
    11. If one or more bookmarks in local storage have the selected category, add a radio button for each bookmark to the innerHTML of the #category-list. Give each radio button an id and value set to the bookmark name, and a name that's the same for all the buttons.
    12. Each radio button should have a corresponding label containing an anchor element with the bookmark name and the href attribute set to the bookmark URL.
    13. When you click the #close-list-button, you should run your function to hide the #bookmark-list-section and display the main section.
    14. When you click the #delete-bookmark-button, you should delete the bookmark corresponding to the selected radio button and appropriate category from the local storage and update the displayed bookmark list.
