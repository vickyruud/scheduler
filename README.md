# Interview Scheduler
Interview Scheduler is a single-page application (SPA) that allows users to book technical interviews between students and mentors. The front end of this project is built with React and makes requests to an API to fetch and store appointment data from a  PostgreSQL database.

## Setup

1. Install dependencies: `npm install`
2. Run the server: `npm start`
3. Visit `http://localhost:8000/`

## Setting up the database server.
Please navigate to the following link and follow the instructions to set up the server:
https://github.com/lighthouse-labs/scheduler-api

## Features
- Appointments can be scheduled between the hours of 12 PM and 5 PM, Monday to Friday.
- Each appointment has one student and one interviewer.
- When creating a new appointment, the user can enter any student name while the interviewer is    
  chosen from a predefined list.
- The user can save the appointment and view the entire schedule of appointments on any day of the 
  week.
- Appointments can also be edited or deleted. 
- The number of spots available are displayed under each day.

## Screenshots

### Scheduler day view
!["Screenshot of Homepage"](https://github.com/vickyruud/scheduler/blob/master/public/images/scheduler.png)

## Add Appointment

!["Screenshot of Add Appointment"](https://github.com/vickyruud/scheduler/blob/master/public/images/new_appointment.png)

## Delete confirmation

!["Screenshot of Deleting"](https://github.com/vickyruud/scheduler/blob/master/public/images/deleting.png)


