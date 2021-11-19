
  
import React from "react";
import "./styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";



export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );


  
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);    
    props.bookInterview(props.id, interview);
    //set timer to allow the saving transition to be displayed
    setTimeout(() => {
      transition(SHOW);      
    }, 1000);
  }

  
  return (
    <>
    <article className="appointment">
    <Header time = {props.time} />
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && props.interview && <Show student = {props.interview["student"]} interviewer = {props.interview.interviewer}  />}
    {mode === CREATE && <Form interviewers = {props.interviewers} cancel = {() => transition(EMPTY)} onSave = {save} />}
    {mode === SAVING && <Status message = "Saving" />}
    </article> 
    
    </>
  );
};