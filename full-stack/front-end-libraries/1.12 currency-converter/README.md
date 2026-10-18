# Build a Currency Converter

Objective: Fulfill the user stories below and get all the tests to pass to complete the lab.

User Stories:

    1. Your CurrencyConverter component should render an input element to accept the amount to be converted from.

    2. Your input element should accept numbers.

    3. Your CurrencyConverter component should render two select elements to choose the currency to convert from and to.

    4. Your select element should include options for at least USD, EUR, GBP, and JPY. You may use any exchange rate, provided there is no one-to-one mapping between the currencies. Here are some examples of good and bad mappings:

    const badMapping = {
        USD: 1,
        EUR: 1,
        GBP: 1,
        JPY: 1
    };
       
    const goodMapping = {
        USD: 1,
        EUR: 0.92,
        GBP: 0.78,
        JPY: 156.7
    };

    5. Your CurrencyConverter component should memoize the calculation of the converted amounts for the from currency such that a change in the to select option will not recalculate the converted amounts.

    6. Your CurrencyConverter component should render an element showing the converted amount in the format XX.XX CCC, where XX.XX is the converted amount and CCC is the currency code.

    7. The converted amount should be rounded to two decimal places.

