const botName = "Chester";
const botLocation = "Copenhagen";
const favoriteLanguage = "C#";

const introSentence = "My name is " + botName + " " + "and I live on " + botLocation + ".";
const languageSentence = "My favorite programming language is " + favoriteLanguage + ".";
let codingFact = "The name of the " + favoriteLanguage + " language is stimulated by the musical notation. Here sharp, represent the written note which should be made a semitone higher in pitch.";

console.log("Hello! I'm your coding fun fact guide!");
console.log(introSentence);
console.log(languageSentence);
console.log(codingFact);

codingFact = "The syntax of " + favoriteLanguage + " language is similar to the C-style family such as Java, C, C++";
console.log(codingFact);

codingFact = favoriteLanguage + " language is suitable for writing applications for embedded systems.";
console.log(codingFact);

const farewell = "It was fun sharing these facts with you. Goodbye! - " + botName + " from " + botLocation + "."
console.log(farewell);