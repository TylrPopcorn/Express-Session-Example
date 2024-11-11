//DEPENDENCIES:
//-------------
// npm i express
// npm i express-session            --> https://www.npmjs.com/package/express-session
// npm i connect-flash              --> https://www.npmjs.com/package/connect-flash
// npm i nodemon

//How to start:
//    npm run start

//VARIABLES:
//----------
const express = require("express");
const app = express();
//
const flash = require("connect-flash");
const session = require("express-session");

const sessionOptions = {
  secret: "secret-here",
  resave: false, //Forces the session to be saved back to the session store, even if the session was never modified during the request.
  saveUninitialized: false, //Forces a session that is "uninitialized" to be saved to the store.
};

app.use(session(sessionOptions));
app.use(flash()); // a special area of the session used for storing messages.

//ROUTES:
//-------

//viewcount
app.get("/viewcount", (req, res) => {
  //  localhost:3000/viewcount
  if (req.session.count) {
    req.session.count += 1;
  } else {
    req.session.count = 1;
  }
  res.send(`You have viewed this page ${req.session.count} time(s).`);
});

//register
app.get("/register", (req, res) => {
  //  localhost:3000/register?username=namehere
  const { username = "Anonymous" } = req.query;
  req.session.username = username;

  req.flash("success", "Successfully logged in!");
  res.redirect("/greet"); //go to new route
});

app.get("/greet", (req, res) => {
  const { username } = req.session;
  //
  if (username == undefined) {
    res.redirect("/register"); //redirect user back to register because no username was found.
  } else {
    const message = req.flash("success"); //retrieve flash message;
    console.log(message);
    res.send(`Welcome back, ${username}! \n ${message}`); //welcome
  }
});

//main route
app.get("/", (req, res) => {
  //  localhost:3000/
  // MAIN ROUTE
  res.redirect("/viewcount");
});

//unknown routes
app.get("*", (req, res) => {
  //ALL UNKOWN ROUTES WILL REDIRECT BACK TO MAIN ROUTE
  res.redirect("/");
});

//------------------------
//listner
app.listen(3000, () => {
  console.log("Listening on port 3000");
});

/**
 * 
 * This code is a basic Express.js web application that demonstrates session management and BASIC flashing. Let me break down its main functionalities:

  1. View Counter Feature:
  - Tracks how many times a user has visited the `/viewcount` page using session storage
  - Each visit increments a counter specific to that user's session

  2. Simple User Registration/Greeting System:
  - Allows users to "register" by providing a username through a query parameter
  - Stores the username in the session
  - Shows a welcome message with flash messaging for successful login

  3. Route Structure:
  - `/viewcount`: Shows visit count
  - `/register`: Handles user registration (via URL query parameters)
  - `/greet`: Displays welcome message and flash message
  - `/`: Main route that redirects to viewcount
  - `*`: Catches all unknown routes and redirects to main route

  The code uses several important Express.js features:
  - `express-session` for maintaining user sessions
  - `connect-flash` for temporary flash messages
  - Basic routing with Express
  - Query parameter handling
  - Session-based data persistence

  This appears to be a demonstration/learning example for understanding:
  1. How sessions work in Express
  2. How to implement flash messages
  3. Basic routing and redirects
  4. URL parameter handling
  5. Simple user state management
 */
