# focusdoro
Install server and client dependencies

`npm install`

Create dev.js

`touch server/config/dev.js`

Copy this in dev.js

`module.exports = {
    mongoURI: "insert your mongoDB URL from mongoDB Cluster"
}`

To start the server and client at the same time (from the root of the project)

`npm run dev`