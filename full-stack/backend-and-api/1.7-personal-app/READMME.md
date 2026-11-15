# Personal Profile App
 
A small personal profile server built with Node.js and Express.
 
## Getting Started
 
```bash
npm install
npm start
```
 
The server runs at `http://localhost:3000`.
 
## Routes
 
| Route          | Description                                         |
| -------------- | --------------------------------------------------- |
| `/`            | Welcome message                                     |
| `/hobbies`     | Plain-text list of hobbies                          |
| `/skills`      | Plain-text list of skills                           |
| `/api/profile` | JSON with `name`, `hobbies`, and `skills`           |
 
### Example: `/api/profile`
 
```json
{
  "name": "Camper Bot",
  "hobbies": ["cycling", "boating", "guitar"],
  "skills": ["JavaScript", "Node.js", "Express.js"]
}
```
 
## Tech Stack
 
- Node.js
- Express 5
## License
 
MIT
 