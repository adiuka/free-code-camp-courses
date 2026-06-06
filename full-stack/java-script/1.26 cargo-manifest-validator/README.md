Each cargo manifest will be represented as an object with the following properties:

containerId: a positive integer identifying the associated cargo container.
destination: a non-empty string (after trimming whitespace) denoting the cargo's target destination.
weight: a positive number representing the cargo's weight.
unit: a string describing the units for the cargo's weight property (either "kg" for kilograms or "lb" for pounds).
hazmat: a boolean value indicating whether hazardous material handling is needed.
Example cargo manifest object:

Example Code
{
  containerId: 1,
  destination: "Monterey, California, USA",
  weight: 831,
  unit: "lb",
  hazmat: false
}
Objective: Fulfill the user stories below and get all the tests to pass to complete the lab.

User Stories:

You should implement a function named normalizeUnits with a manifest parameter.

The function must not mutate the original manifest object and must always return a new object where weight is normalized to kilograms and unit is set to "kg".
If the weight of the manifest object is expressed in pounds (unit: "lb"), the function should convert the weight to kilograms using the approximate conversion, 1 lb = 0.45 kg, and update the unit accordingly.
If the weight is already expressed in kilograms (unit: "kg"), the weight and unit should remain unchanged.
You should implement a function named validateManifest with a manifest parameter.

The function must not mutate the original manifest object and must always return a new object.
If the input manifest is valid (no missing or invalid properties), the function should return an empty object.
If the input manifest is not valid, the function should return an object containing entries for each missing or invalid property. Missing properties should have the value "Missing" and invalid properties should have the value "Invalid".
Example return value where the input object is missing the destination property and has an invalid weight property:

{
  destination: "Missing",
  weight: "Invalid"
}
You should implement a function named processManifest with a manifest parameter. The function should log:

If the manifest object is valid, Validation success: ${containerId} and then the manifest's weight in kilograms as such, Total weight: ${weight} kg. Use normalizeUnits() for this conversion.
If the manifest object is not valid, Validation error: ${containerId} and then the object returned by calling validateManifest() with the manifest object.
Note: each of these two cases should have two console.log() calls.