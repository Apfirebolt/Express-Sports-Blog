# Express Sports Blog - A Blogging Application in Express ⚡️

## Project Briefing

This is a Blogging application for writing sports based articles. You can categorize your posts based on different sports. The project is themed around Sports but can be easily generalized to include posts from other categories as well. It is created in Express and uses EJS Template engine, it uses MongoDB and Mongoose for database.

Made with ❤️ by **[@apfirebolt](https://github.com/Apfirebolt/)**
## Features

- Multi page application which uses EJS Express Template Engine.
- Contains session based user auth system using Passport.js
- Each user can perform CRUD on Sports Blog Categories.
- Each category could have multiple posts inside of it with fully functional CRUD operations.
- Bootstrap is used for UI components. 

## Built With

* [Express](https://expressjs.com/)
* [EJS Express Templates](https://ejs.co/)
* [MongoDB](https://www.mongodb.com/)
* [Mongoose](https://mongoosejs.com/)
* [Bootstrap](https://getbootstrap.com/)

## Project setup

Simply install node modules for backend. The project does not have a separate frontend as of now but might have in future. Make sure you have MongoDB installed and running on your system, you can also have it running inside a Docker container. Of course, you'd need you have Node and NPM environment configured on your system.

```
npm install
npm start
```

## Database Architecture

- MongoDB is used as database which works pretty smoothly with Javascript and other Javascript frameworks. 
- Mongoose ORM is used to define document schemas and perform 
complex queries.
- It has 3 models namely 'User', 'Blog' and 'Post'.
- No nested document approach as been adopted, instead Object references are used by establishing Foreign key relationship where ever required within the application.

## Project Screenshots

Work is still in progress on certain UI aspects of this project, screenshots would be uploaded once UI changes are finalized.




