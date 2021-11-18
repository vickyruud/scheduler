import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import axios from 'axios'
import { getAppointmentsForDay, getInterview } from "helpers/selectors";

export default function Application(props) {

  //handles the state for day, days, appointments, interviewers

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  //sets the day as selected
  const setDay = day => setState({ ...state, day });    
  
  //declare daily appointments array
  let dailyAppointments = [];

  //useEffect to pull data from server and change state  
  useEffect(() => {
      
    const getDays = axios.get('api/days');
    const getAppointments = axios.get('api/appointments')
    const getInterviewers = axios.get('api/interviewers')

    
    Promise.all([getDays, getAppointments, getInterviewers])
    .then((res) => {
      
      setState({
        ...state,
        days: res[0].data,
        appointments: res[1].data,
        interviewers: res[2].data
      })
    })
    .catch(e => console.log(e.message));
      
  },[state.day])
  
  //generate daily appointments 
  dailyAppointments = getAppointmentsForDay(state, state.day);

  const appointmentArray = Object.values(dailyAppointments).map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key = {appointment.id}
        {...appointment}
        interview = {interview}
      />
        
    )
  });
    
    
    return (
      <main className="layout">
      <section className="sidebar">
        <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler"/>
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList 
            days ={state.days}
            value = {state.day}
            setDay = {setDay}
            />
        </nav>
        <img className="sidebar__lhl sidebar--centered" src="images/lhl.png" alt="Lighthouse Labs" />
      </section>
      <section className="schedule">
        {appointmentArray}
        
        <Appointment  key = "last" time="5pm" />
      </section>
    </main>
  );
}
