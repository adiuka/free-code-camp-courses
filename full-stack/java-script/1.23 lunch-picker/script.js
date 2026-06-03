const lunches = ["Pizza", "Burger", "Fries", "Salad"];

function addLunchToEnd(arr, str) {
    arr.push(str);
    console.log(`${str} added to the end of the lunch menu.`);
    return arr;
}

function addLunchToStart(arr, str) {
    arr.unshift(str);
    console.log(`${str} added to the start of the lunch menu.`);
    return arr;
}

function removeLastLunch(arr) {
    const lunchItem = arr.pop();
    if (arr.length === 0) {
        console.log("No lunches to remove.");
    } else {
        console.log(`${lunchItem} removed from the end of the lunch menu.`)
    }
    return arr;
}

function removeFirstLunch(arr) {
    const lunchItem = arr.shift();
    if (arr.length === 0) {
        console.log("No lunches to remove.");
    } else {
        console.log(`${lunchItem} removed from the start of the lunch menu.`)
    }
    return arr;
}

function getRandomLunch(arr) {
    if (arr.length === 0) {
        console.log("No lunches availlable");
    } else {
        const randomIndex = Math.floor(Math.random() * arr.length);
        const randomLunch = arr[randomIndex];
        return `Randomly selected lunch: ${randomLunch}`;
    }
}

function showLunchMenu(arr) {
    if (arr.length == 0) {
        console.log("The menu is empty.");
    } else {
        console.log(`Menu items: ${arr.join(", ")}`);
    }
}

console.log(showLunchMenu(lunches));