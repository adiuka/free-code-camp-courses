In this lab, you will create a simple animation of the Moon's orbit around the Earth using HTML and CSS. The Earth will be at the center of the system, and the Moon will orbit around it.

Objective: Fulfill the user stories below and get all the tests to pass to complete the lab.

User Stories:

    You should align all the elements to the center of the page by setting the height to 100% of the viewport and setting a flexbox layout in the body element.

    You should have a div with the class space.

    Inside the .space element, there should be two more div elements with the class earth and orbit, respectively, in order.

    Inside the .orbit element, there should be another div with the class moon.

    The div element with a class of space should be centered on the page and have a width and height of 200px.

    The div element with a class of space should use relative positioning.

    The .earth element should use absolute positioning. Position the center of the .earth element at the halfway point of its parent on both the vertical (top) and horizontal (left) axes. After that, shift the .earth element back by half its own width and height, to center it within its parent, the .space element.

    The .earth element should have a width and height of 100px.

    The .orbit element should have a width and height of 200px.

    The .orbit element should be positioned using absolute positioning. Its bottom right corner should be at the center of the .space element using a transform property that shifts it by -50% on both the vertical and horizontal axes.

    The orbit path for the moon around the Earth should be a circle.

    The .moon element should be positioned using absolute positioning and have a width and height of 30px. The .moon element should position itself at the top of the .orbit element and be centered horizontally.

    You should further adjust the horizontal positioning of the .moon element by moving the element to the left by half of its width.

    The .earth selector should have a background color and a border-radius of 50%.

    The .moon selector should have a background color and a border-radius of 50%.

    You should define a @keyframes orbit animation that rotates the .orbit element 360 degrees around its center. You should apply this animation to the .orbit element with a duration of 5 seconds, a linear timing function, and infinite iterations.

Note: Be sure to link your stylesheet in your HTML and apply your CSS.