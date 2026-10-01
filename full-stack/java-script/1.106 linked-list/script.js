// part 1
function initList() {
  return {
    head: null,
    length: 0
  };
}

function isEmpty(list) {
  return list.length === 0;
}

function add(list, element) {
  const node = {
    element: element,
    next: null
  };

  if (isEmpty(list)) {
    list.head = node;
  } else {
    let current = list.head;
    while (current.next !== null) {
      current = current.next;
    }
    current.next = node;
  }

  list.length++;
}

function remove(list, element) {
  let previous = null;
  let current = list.head;

  while (current !== null && current.element !== element) {
    previous = current;
    current = current.next; 
  }

  if (current === null) {
    return;
  }

  if (previous !== null) {
    previous.next = current.next;
  } else {
    list.head = current.next;
  }

  list.length--;
  
}

const myList = initList();
console.log(isEmpty(myList));
add(myList, 42);
add(myList, 43);
add(myList, 44);
console.log(myList);
console.log(isEmpty(myList));
remove(myList, 42);
console.log(JSON.stringify(myList, null, 2));

// part 2

function contains(list, element) {
	let current = list.head;
	while (current !== null) {
		if (current.element === element) {
			return true;
		}
		current = current.next;	
	}
	return false;
}


console.log(contains(myList, 42));

function getAt(list, index) {
	if (index < 0) {
		return undefined;
	}

	let current = list.head;
	let indexAt = 0;
	while (current !== null) {
		if (indexAt === index) {
			return current.element;
		}
		current = current.next;
		indexAt++;
	}
	return undefined;
}

console.log(getAt(myList, 1));

function insertAt(list, index, element) {
  if (index < 0 || index > list.length) {
		return;
	}

	const node = {element, next: null};

	if (index === 0) {
		node.next = list.head;
		list.head = node;
	} else {
		let counter = 0;
		let current = list.head;

		while (counter !== index - 1) {
			current = current.next;
			counter++;		
		}
		node.next = current.next;
		current.next = node;
	}
	list.length++;
}

insertAt(myList, 1, 78);
console.log(myList);

function removeAt(list, index) {
	if (index < 0 || index >= list.length) {
		return;
	}

	let current = list.head;

	if (index === 0) {
		list.head = current.next;
	} else {
		let counter = 0;
		while (counter !== index - 1) {
			current = current.next;
			counter++;
		}
		current.next = current.next.next;
	}
	list.length--;
}

removeAt(myList, 1);
console.log(myList);

function clear(list) {
	list.head = null;
	list.length = 0;
}

clear(myList);
console.log(myList);