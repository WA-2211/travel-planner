# Project Name
**Travel Planner**
## Overview
Travel Planner is a web app that lets users plan trips such as organizing destinations, bookings, and activities under the trip they created.

## Screenshots
![Home Page](/public/images/GuestsHome.png)

![Create Account Form](/public/images/createAccount.png)

![Create Trip Form](/public/images/createTrip.png)

![Trip Detiails](/public/images/trip%20&%20photo.png)

![Add Booking Form](/public/images/addBooking.png)

![Show Activity Details](/public/images/activity.png)

## Technologies Used
- Git & GitHub
- HTML
- CSS
- JS
- EJS
- Node.js
- Express
- MongoDB


## Getting Started

## Installation

## User Stories
- As a user, I want to be able to sign up my account, so that I can start plan my trip.
- As a user, I want to be able to sign in and sign out from my accounts. 
- As a user, I want to be able to see a guest home page if I am not signed in, and when I am signed in have a custom home page .
- As a user, I want to be able to create new trip with title, start and end dates, and photo.
- As a user, I want to be able to view my trip details.
- As a user, I want to be able to view all my trips.
- As a user, I want to be able to edit and delete my trips.
- As a user, I want to be able to view my trip details.
- As a user, I want to be able to add a destinations to my trip.
- As a user, I want to be able to view all my destinations.
- As a user, I want to be able to edit and delete my destinations.
- As a user, I want to be able to add bookings.
- As a user, I want to be able to view my bookings.
- As a user, I want to be able to edit and delete my bookings.
- As a user, I want to be able to add activity to my trip.
- As a user, I want to be able to view my activity details.
- As a user, I want to be able to edit and delete my activities.

## Database Design
![ERD for Travel Planner App](/public/images/ERD.drawio.png)



## Routes
### Home Pages
| Method | Route | Description              |
|--------|-------|--------------------------|
| GET    | /     | Guests Home Page         |
| GET    | /home | Signed-In User Home Page |


### Auth
| Method | Route     | Description                               |
|--------|-----------|-------------------------------------------|
| GET    | /sign-up  | Sign-Up Page                              |
| POST   | /sign-up  | Create User, Hash Password, Start Session |
| GET    | /sign-in  | Sign-In Page                              |
| POST   | /sign-in  | Verify, Start Session                     |
| GET    | /sign-out | Destroy Session, Redirect to Home Page    |


### Trip
| Method | Route         | Description      |
|--------|---------------|------------------|
| GET    | /new          | Create Trip Page |
| POST   | /new          | Create Trip      |
| GET    | /             | All Trips        |
| GET    | /:tripId      | Show One Trip    |
| GET    | /:tripId/edit | Edit Trip Page   |
| PUT    | /:tripId      | Edit Trip        |
| DELETE | /:tripId      | Delete Trip      |

### Destination
| Method | Route                | Description             |
|--------|----------------------|-------------------------|
| GET    | /new                 | Create Destination Page |
| POST   | /new                 | Create Destination      |
| GET    | /                    | All Destinations        |
| GET    | /:destinationId/edit | Edit Destination Page   |
| PUT    | /:destinationId      | Edit Destination        |
| DELETE | /:destinationId      | Delete Destination      |

### Booking
| Method | Route                            | Description             |
|--------|----------------------------------|-------------------------|
| GET    | /:tripId/booking/new             | Create New Booking Page |
| POST   | /:tripId/booking/new             | Create Booking          |
| GET    | /:tripId/booking                 | All Bookings            |
| GET    | /:tripId/booking/:bookingId/edit | Edit Booking Page       |
| PUT    | /:tripId/booking/:bookingId      | Edit Booking            |
| DELETE | /:tripId/booking/:booking        | Delete Booking          |

### Activity
| Method | Route                              | Description              |
|--------|------------------------------------|--------------------------|
| GET    | /:tripId/activity/new              | Create New Activity Page |
| POST   | /:tripId/activity/new              | Create Activity          |
| GET    | /:tripId/activity                  | All Activities           |
| GET    | /:tripId/activity/:activityId      | Show Activity Details    |
| GET    | /:tripId/activity/:activityId/edit | Edit Activity Page       |
| PUT    | /:tripId/activity/:activityId      | Edit Activity            |
| DELETE | /tripId:/activity/:activityId      | Delete Activity          |




## Features
- User authentication
- Protected Routes
- Guest & Signed-In user home pages
- Full CRUD
- Trip date validation
- Photo Upload



## Future Enhancements
- Date validation for booking & activites
- Image Gallery for trip
- Search
- Responsive Design


## Credits
Developed By Walaa Idrees