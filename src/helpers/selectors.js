const selectAppointment = (appointments, id) => {
  const selected = id.map(id => appointments[id]);
  return selected;
}


export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  
  const appointmentArray = [];

  state.days.map(dayObj => {
    if (dayObj.name === day) {
      dayObj.appointments.forEach(appointmentId => appointmentArray.push(appointmentId))
    }
    return appointmentArray;
  });

  return selectAppointment(state.appointments,appointmentArray);


}



export function getInterview(state, interview) {
  
  if (!interview)  {
    return null;
  }

  const interviewerData = state.interviewers[interview.interviewer];

  return{
    student: interview.student,
    interviewer: interviewerData
  }

};