# AutoLog

AutoLog is an application that gives you the ability to track your past car maintenance. With all your maintenance logged in one place, you’ll no longer be wondering when the last time you completed a maintenance task was or when your next task is due.


FUNCTIONALITY
AutoLog's functionality includes:
	Access to demo accounts to try the app out before signing up
	Sign up as a new user
	Login as an existing user
	Ability to schedule future maintenance tasks
	Ability to change scheduled tasks to completed tasks
	Ability to delete scheduled and completed maintenance task instances

APPLICATION WEBSITE
View a working prototype here: (https://socialist-toque-56844.herokuapp.com/)


SECURITY
	Application uses JWT authentication
	Passwords are encrypted using bcrypt.js


TECHNOLOGY
Front End
	HTML
	CSS
	JavaScript
	jQuery
	AJAX JSON calls to the app's API

Back End
	Node.js
	Express
	Mocha
	Chai
	MongoDB
	Mongoose
	bcryptjs
	Passport


API Documentation
API endpoints for the back end include:
Users
	POST to '/api/auth' to create a new users
	POST to '/api/users' sign in existing user

Future Maintenance
	GET to '/api/futuremaintenance' to view all scheduled maintenance events
	GET to '/api/futuremaintenance/:id' to view a single scheduled maintenance event by ID
	POST to '/api/futuremaintenance' to create new scheduled maintenance event
	PUT to '/api/futuremaintenance/:id' to edit an existing scheduled maintenance event by ID
    DELETE to '/api/futuremaintenance/:id' to delete a single scheduled maintenance event by ID

Completed Maintenance
	GET to '/api/completedmaintenance' to view all scheduled maintenance events
	GET to '/api/completedmaintenance/:id' to view a single scheduled maintenance event by ID
	POST to '/api/completedmaintenance' to create new completed maintenance event
	PUT to '/api/completedmaintenance/:id' to edit an existing scheduled maintenance event by ID
    DELETE to '/api/completedmaintenance/:id' to delete a single scheduled maintenance event by ID