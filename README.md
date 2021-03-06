# watch-my-farm


The WatchMyFarm application allows a farmer to log each animal (or group by breed) and enter feeding and care instructions all in one place.  The farmer invites the caretaker by using a link, and the caretaker has all instructions via task list.  The caretaker checks off the tasks as they complete them, and the farmer can monitor the progress via their own view.   If the farmer needs to modify any information, they can do so remotely, and not worry about losing their documentation between absences from their farm.

##Contents
* [Technologies](#technologies)
* [Features](#features)
* [Installation](#install)

## <a name="technologies"></a>Technologies

Backend: NodeJS, Express, Express-Handlebars, MySQL, Sequelize, PassportJS<br/>
Frontend: JavaScript, jQuery, AJAX, React, HTML5, CSS<br/>
API: Dark Sky API<br/>

## <a name="features"></a>Features

![alt tag](./public/assets/images/login.gif)

The WatchMyFarm application has login page with a form for existing users to sign in and a button for new users to create accounts.<br>
Passwords are hashed and salted before storing in the MySQL database.


After the user logs in, the user is redirected to the Barnyard page, which displays all the animals and their information - Name, breed, Feed, Meds, Notes, etc using AJAX Get requests that fetch the data from the database corresponding to the logged in user. The barnyard page also has a side navigation panel that has links to the 'Schedule', 'My Farm', and the 'Payment' pages.<br>

![alt tag](./public/assets/images/new_animal.gif)

The user can add a new Animal, along with its information by clicking the 'Add Animal' button on the Barnyard page, which displays a modal with form input fields.


When the form is submitted, after the user clicks 'Save' on the modal form, an AJAX call posts the new animal information to the database.

The user can then click the 'Edit' button to change the animal information at anytime. This shows the a modal with the existing animal information, and the user can change only the required fields. An AJAX call, updates the information in the database.

- The user can update farm information on the Farm page via a modal and saves the form, an AJAX call posts the new farm information to the database.

![alt tag](./public/assets/images/the_farm.gif)

- The user can schedule a period of time they will be gone and a link will be created with a unique token (using "ShortID") to send to the sitter. The sitter will use the link sent to them to access the daily duties, along with weather and farm information.  The sitter will mark duties as complete, and the user can monitor the sitter's progress. 

![alt tag](./public/assets/images/schedule.gif)

## <a name="install"></a>Installation

To run WatchMyFarm:

Install MySQL

Clone or fork this repo:

```
https://github.com/sssharkie1/watch-my-farm.git
```

Create the database:

```
create database farmDB

```

Run the app:

```
npm start
```

You can now navigate to 'localhost:8000/' to access WatchMyFarm.
