# otp-generator

In this lab, you will generate a 6-digit OTP (One-Time Password) and display it to the user. The OTP will expire after 5 seconds, and a new OTP will be generated when the user clicks the "Generate OTP" button.

Objective: Fulfill the user stories below and get all the tests to pass to complete the lab.

User Stories:

    1. You should use the useEffect hook to manage the countdown timer.

    2. Your OTPGenerator component should return a div element with the class name container.

    3. Your div with the class container should include the following elements:
        An h1 element with the ID otp-title and text "OTP Generator".
        An h2 element with the ID otp-display that either displays the message "Click 'Generate OTP' to get a code" or shows the generated OTP if one is available.
        A p element with the ID otp-timer and an aria-live attribute set to a valid value that:
            Starts off empty.
            Displays "Expires in: X seconds" after the button is clicked, where X represents the remaining time before the OTP expires.
            Shows the message "OTP expired. Click the button to generate a new OTP." once the countdown reaches 0.
        A button element with the ID generate-otp-button labeled "Generate OTP". When clicked, it should generate a new OTP and start a 5-second countdown.
        The "Generate OTP" button must be disabled while the countdown is active.

    4. You should ensure the countdown timer stops automatically once it reaches 0 seconds to prevent unnecessary updates.

    5. Your generated OTP should be 6 digits long.
