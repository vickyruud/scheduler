import React from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  } = useApplicationData();
  
  
  
  let interviewersForTheDay = [];
  
  interviewersForTheDay = getInterviewersForDay(state, state.day);
  
  
  //declare daily appointments array
  let dailyAppointments = [];
  
  //generate daily appointments 
  dailyAppointments = getAppointmentsForDay(state, state.day);

  const appointmentArray = Object.values(dailyAppointments).map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key = {appointment.id}
        {...appointment}
        interview = {interview}
        interviewers = {interviewersForTheDay}
        bookInterview = {bookInterview}
        cancelInterview = {cancelInterview}
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
