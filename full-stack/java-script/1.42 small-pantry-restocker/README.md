You will simulate receiving a shipment of pantry items, deciding what to do with each item, and organizing the results for storage.

Objective: Fulfill the user stories below and get all the tests to pass to complete the lab.

The rawData array contains pipe-separated strings with the format sku|name|qty|expires|zone, where zone is optional. For example:

Example Code
const rawData = [
  "A10|Tomatoes|5|2027-01-01",        // no zone field
  "B21|Bananas|10|2027-01-01|fridge", // zone: "fridge"
  "C32|Eggs|3|2027-01-01|pantry",     // zone: "pantry"
];
User Stories:

1. You should implement a parseShipment(rawData) function that takes an array of strings and returns an array of objects with { sku, name, qty, expires, zone } properties.

- Duplicate sku values in the shipment should be ignored.
- When the zone segment is not provided, it should default to "general".
- The qty value should be converted to a number.

2. You should implement a planRestock(pantry, shipment) function that compares the current pantry with the incoming shipment and returns an array of actions in the form { type, item }, where type is one of "restock", "discard", or "donate", and item is the parsed shipment object.

The pantry parameter is an array of objects with the same shape as a parsed shipment item ({ sku, name, qty, expires, zone }).

- If a shipment item has a qty of 0 or less, the action type should be "discard", regardless of whether the item exists in the pantry.
- Otherwise, if the shipment item's sku already exists in the pantry, the action type should be "restock".
- Otherwise (the shipment item's sku does not exist in the pantry), the action type should be "donate".

3. You should implement a groupByZone(actions) function that groups the actions into storage zones based on each item’s zone property.

4. You should implement a clonePantry(pantry) function that returns a deep copy of the pantry so planning changes do not affect the original list. A deep copy means creating a new array with new objects, so modifying the copy does not change the original pantry.

5. You should use all of the functions together to process a shipment and log the final grouped result object to the console.