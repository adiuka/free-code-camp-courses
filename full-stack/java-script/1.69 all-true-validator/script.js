const testArray = [
    {
        name: "Quincy", 
        role: "Founder", 
        isBot: true
    },    
    {
        name: "Naomi",
        role: "", 
        isBot: true
    }, 
    {
        name: "Camperbot",
        role: "Bot", 
        isBot: ""
    }
]

function truthCheck(collection, pre) {
  return collection.every((obj) => Boolean(obj[pre]));
}

console.log(truthCheck(testArray, "isBot"));