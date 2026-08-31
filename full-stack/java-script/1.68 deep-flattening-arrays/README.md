Create a Deep Flattening Tool

In this lab, you will be implementing an array flattening algorithm.

Flattening an array means turning a nested array of any depth into a single, one-dimensional array. The process extracts all elements in order, unwrapping only arrays. Other types are left unchanged.

For example:
Original 	Flattened
[[1], [], [2, [3]]] 	[1, 2, 3]
[1, {"foo": "bar"}, [2]] 	[1, {"foo": "bar"}, 2]
["baz", [1, 2], {}] 	["baz", 1, 2, {}]

Objective: Fulfill the user stories below and get all the tests to pass to complete the lab.

User Stories:

    You should have a function named steamrollArray.
    The steamrollArray function should accept one argument: a nested array.
    The function should flatten the nested array, accounting for varying levels of nesting.
    Your solution should not use the Array.prototype.flat() or Array.prototype.flatMap() methods.
    Global variables should not be used.

