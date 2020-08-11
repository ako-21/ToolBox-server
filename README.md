# ToolBox

ToolBox is an app that manages personal DIY projects. It allows users to create projects and manage the budget and steps until the project is complete.

![SnapShot](https://i.imgur.com/kWobLxr.png)

## Live Apps

[Live Website] () | [Heroku Backend] ()

### Client Repository

[Client Repo Link] ()

### Backend Repository

[Backend Repo Link] ()

## Set Up Steps

#### Client Repo
-fork and clone the client repo
-npm install to install dependencies
-npm start to start local development host

#### BackEnd Repo
-fork and clone the backend repo
-install dependencies with npm install
-start local server with npm run server

## Restful API Built with Express

### User Authentication

#### POST/ sign-up

Creates a new user account and auto signs them in the first time.
Takes a `credentials` parameter that is a JSON object with the following keys.
`email` - Required - The e-mail for the new user account
`password` - Required - Password
`password_confirmation` - Required - Repeat Password

#### POST/ sign-in

Signs in used according to credentials passed previously. Responds with a user token that is used for all other requests.
`email` - Required - The e-mail for the new user account.
`password` - Required - Current Password.

#### PATCH /change-password

Allows user to change password once they are logged in.
`old` - Required - Old Password.
`new` - Required - New Password.

#### DELETE /sign-out

Ends the current session and removes the user token.

### Projects

#### GET /projects

Sends a request for all projects, and the API responds with all projects where the owner of the project matches the user's id.

#### GET /projects/:id

Sends a request for a specific project, identified by it's unique id, and the API sends a response of that project's data.

#### POST /projects

Sends a request to the API to create a new projects with the following credentials - name(string), description(string), budget(number), spent(number), all required.

#### PATCH /projects/:id

Sends a request to the API to update an existing project, which is located by it's unique id. Credentials are the same as creating a project.

#### DELETE /projects/:id

Sends a request to the API to delete an existing projects, which is identified by it's unique id.

## Planning

The biggest part of planning was scaling down the big picture to a minimum viable application that can be built upon in phases. I want to make sure that I treat each phase as it's own to give it the attention to detail needed to produce a sensible, user friendly application. The initial wireframe and user stories had to be scaled down and resulted in the creation of two Resources for this first phase. Resource 1 is the user, and resouce 2 is the Project. Once I identified my two resources for phase 1 and their relationship, I recreated the wireframes and user stories to fit. I then created the backend via Express and Mongoose by creating my Models, establishing their relationships, and building the routes. Once the routes for built and successfully tested, I started building the front end with React. My approach was to design the overall theme, then build Components and Routes one at a time and style them to fit the theme before moving on to the next Component. I also tested their functionality before moving on to the next Component. I found that this approach made organization a lot more manageable because it was always easy to reference exactly where I left off and needed to continue. Once I finished building all of the Components and front end Links and Routes, I did one more thorough test before deploying the front end to github and the backend to heroku.

## Technologies

#### BackEnd
-Express API
-Mongoose
-MongoDB
-Node.js
-javaScript
-Curl
-Heroku

#### FrontEnd
-Axios
-React
-Bootstrap
-javaScript
-CSS

### Wireframe
![ToolBox Wireframe] (https://i.imgur.com/kRnK8Ca.jpg)

### User Relationships
![ToolBox ERD] (https://i.imgur.com/Fv893SR.jpg)

### User Stories
-As a user, I want to be able to Sign-up
-As a user, I want to be able to Sign-in to access my account
-As a user, I want to Change-Pw and Sign-out from my app
-As a user, I want to be able to create projects with names, descriptions, budgets, and amount spent.
-As a user, I want to see all of my active projects, the date created, and spending information
-As a user, I want to be able to update a project,
-As a user, I want to be able to delete a project

## Issues and Upgrades
Phase 1 is working great without any issues. For phase 2, I plan to create more attributes and resources linked to Projects to add more meticulous management features. For example, I plan to add Project phases with specific todos that can be created, updated, completed, and deleted.
