function initStack() {
	return {
		collection: [],
	}
}

function push(stack, element) {
	stack.collection.push(element);
}

function pop(stack) {
	const element = stack.collection.pop();
	return element;
}

function peek(stack) {
	const items = stack.collection;
	if (items.length > 0) {
		return items[items.length - 1];
	} else {
		return undefined;
	}
}

function isEmpty(stack) {
	return stack.collection.length === 0;
}

function clear(stack) {
	stack.collection = [];
}

const myStack = initStack();
console.log(myStack);
push(myStack, 20);
push(myStack, 35);
push(myStack, 40);
console.log(myStack)
console.log(pop(myStack));
console.log(peek(myStack));
console.log("Is the stack empty?: " + isEmpty(myStack));
clear(myStack);
console.log(myStack);