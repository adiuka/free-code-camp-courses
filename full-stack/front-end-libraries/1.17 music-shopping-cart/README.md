# shopping-cart

Build a shopping cart using Tailwind CSS

You should have an element with an id called shopping-cart-container.
Your #shopping-cart-container element should use the correct utility class for setting the element to a Flexbox layout.
Your #shopping-cart-container element should set the direction of flex items to column for smaller devices and row for larger devices. Remember that Tailwind CSS utilizes the mobile first approach and you will use the lg: breakpoint prefix to target larger devices.
Inside your #shopping-cart-container element, you should have an element with an id called products-container.
Your #products-container element should have at least two child elements each with a class called card.
Each .card element should have the following elements nested inside:

    An h2 element with text representing the product name, and a utility class that sets the font size using only predefined size classes such as text-sm, text-md, text-lg, text-xl, text-2xl, etc.
    An element with a class called quantity and text for the number of cart items for that product.
    An element with a class called price and text for the price.
    A button with a class called remove-button and text Remove. Your button should have utility classes for a predefined red background color of your choosing and different predefined red background color for the hover state. Examples of predefined red background colors include bg-red-500, bg-red-600, etc. Examples of predefined hover red background colors include hover:bg-red-500, hover:bg-red-600, etc.

Inside your #shopping-cart-container element, you should have an element with an id called order-summary-container.
Your #order-summary-container element should have the following styles:

    A utility class of your choosing for predefined rounded corners. Examples include rounded, rounded-lg, rounded-full, etc.
    A utility class of your choosing for setting the border width on all sides.

Your #order-summary-container element should have the following elements nested inside:

    An h2 element with the text Order Summary and a utility class of your choosing that sets the font size.
    An element with the text Total: and id set to total. This element should also use utility classes to set the font weight to a predefined Tailwind CSS font weight and font size of your choosing for the element.
    An element with an id set to total-amount to display the total for all items in the cart.
    A link with the text Checkout and the correct utility class for centering the text. The href value should be set to #. Your link should also have a utility class for setting the background color to a predefined Tailwind CSS blue color of your choosing and a different blue background color for the hover state.

