import React from "react";
import "./styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {
  //declare variables for each mode
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const ERROR_SAVE_INTERVIEWER = "ERROR_SAVE_INTERVIEWER";

  //import visual mode changes functions with default state as show or empty
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // saves the interview and transitions modes as necessary
   function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));  
  }
  // cancels interview and transitions to delete view
  function interviewCancellation(interview) {
    interview = null;
    transition(CONFIRM);
  }
  // Edits the interview and transitions modes as necessary
   function edit(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props
      .editInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));  
  }
  //deletes interview
  function destroy() {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => {
        transition(ERROR_DELETE, true)
      });
  }
  //returns the appointment list with different view based on modes
  return (
    <>
      <article className="appointment" data-testid="appointment">
        <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && props.interview && (
          <Show
            student={props.interview["student"]}
            interviewer={props.interview.interviewer}
            onDelete={interviewCancellation}
            onEdit={() => transition(EDIT)}
          />
        )}
        {mode === CREATE && (
          <Form
            interviewers={props.interviewers}
            onCancel={() => transition(EMPTY)}
            onSave={save}
          />
        )}
        {mode === SAVING && <Status message="Saving" />}
        {mode === DELETING && <Status message="Deleting" />}
        {mode === CONFIRM && (
          <Confirm
            message="Are you sure you would like to delete this appointment?"
            onConfirm={destroy}
            onCancel={() => transition(SHOW)}
          />
        )}
        {mode === EDIT && (
          <Form
            student={props.interview["student"]}
            interviewer={props.interview.interviewer.id}
            interviewers={props.interviewers}
            onCancel={() => transition(SHOW)}
            onSave={edit}
          />
        )}
        {mode === ERROR_SAVE && (
          <Error message="Could not save" onClose={() => back()} />
        )}
        {mode === ERROR_DELETE && (
          <Error message="Could not delete" onClose={() => back()} />
        )}
      
        {mode === ERROR_SAVE_INTERVIEWER && (
          <Error
            message="Please select an interviewer before confirming"
            onClose={() => back()}
          />
        )}
      </article>
    </>
  );
}
