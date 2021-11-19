
//returns the selected appointments
const selectAppointment = (appointments, id) => {
  const selected = id.map(id => appointments[id]);
  return selected;
}

//returns the selected interviewers
const selectInterviewer = (interviewers, id) => {
  const selected = id.map(id =>  {
    return interviewers[id]});
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


export function getInterviewersForDay(state, day) {
  // returns the interviewers for the day
  let interviewersArr = [];
  
  state.days.map((dayObject) => {
  if (dayObject.name === day) {
      dayObject.interviewers.forEach(interviewerId => interviewersArr.push(interviewerId))
  }
  return interviewersArr;
  })
  
  return selectInterviewer(state.interviewers, interviewersArr);
  
}