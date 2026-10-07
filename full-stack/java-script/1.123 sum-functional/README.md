# Build an Optional Arguments Sum Function

In this lab you will build a function that accepts up to two arguments, and sum them, but if there is only one argument returns a function that waits for the second number to sum.

Objective: Fulfill the user stories below and get all the tests to pass to complete the lab.

User Stories:

    1. Create a function addTogether.

    2. If the function receives two arguments, the function should return the sum of the two arguments.

    3. If only one argument is provided, addTogether should return a function.
        When the returned function is called with a single argument, it should return the sum.

    const sumTwoAnd = addTogether(2);
    sumTwoAnd(3); // 5

    4. If either argument isn't a valid number, return undefined.

