import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData () {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  //sets the day as selected
  const setDay = day => setState({ ...state, day });    



  //useEffect to pull data from server and change state  
  useEffect(() => {
      
    const getDays = axios.get('api/days');
    const getAppointments = axios.get('api/appointments')
    const getInterviewers = axios.get('api/interviewers')

    
    Promise.all([getDays, getAppointments, getInterviewers])
    .then((res) => {

      setState(prev=> ({
        ...prev,
        days: res[0].data,
        appointments: res[1].data,
        interviewers: res[2].data
      }))
    })  
  },[state]);


  //update spots
  function updateSpots () {
  
    let spotsAvailable = 5;

    for (let day in state.days ){
      if (state.days[day].name === state.day) {
        for (let id of state.days[day].appointments) {
          if (state.appointments[id].interview !== null) {
            spotsAvailable--;
          }
        }

      }

    }
    return state.days.map(day => {
      if (day.name !== state.day) {
        return day
      } else {
        return {
          ...day,
          spots: spotsAvailable
        };        
      }
    });
  
  
  };

  //book interview

  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState({
          ...state,
          appointments: appointments
        });
        updateSpots();
      })
      

  };

  //cancel interview

  function cancelInterview (id) {
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState({
          ...state
        });
        updateSpots();
      })
  }

  

  


  return {
    state, 
    setDay,
    bookInterview,
    cancelInterview
  };


}