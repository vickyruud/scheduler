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



  
  //update spots

  function updateSpots(requestType) {
    const daysObj = state.days.map(day => {
      if (day.name === state.day) {
        if (requestType === "bookAppointment") {
          return { ...day, spots: day.spots - 1}
        } else if (requestType === "Edit") {
          return { ...day}
        } else {
          return { ...day, spots: day.spots + 1 };
        }
      } else {
        return { ...day }
      }
    });
    return daysObj;
  }

  //book interview

  function bookInterview(id, interview, requestType) {

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
        const days = updateSpots("bookAppointment")
        setState({
          ...state,
          appointments,
          days
        });
      })
      .catch((err) => console.log(err));
      

  };

  //Edit interview

  function editInterview(id, interview, requestType) {

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
          appointments,
        });
      })
      .catch((err) => console.log(err));
      

  };

  //cancel interview

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      const days = updateSpots();
      setState({
        ...state,
        appointments,
        days
      });
    })
    .catch((err) => console.log(err));
    
  }
  //useEffect to pull data from server and change state  
  useEffect(() => {
      
    const getDays = axios.get('/api/days');
    const getAppointments = axios.get('/api/appointments')
    const getInterviewers = axios.get('/api/interviewers')

    Promise.all([getDays, getAppointments, getInterviewers])
      .then((res) => {
        setState(prev=> ({
        ...prev,
        days: res[0].data,
        appointments: res[1].data,
        interviewers: res[2].data
      }))
    })  
  },[]);


  

  


  return {
    state, 
    setDay,
    bookInterview,
    cancelInterview,
    editInterview
  };


}