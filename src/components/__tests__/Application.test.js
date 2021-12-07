import React from "react";

import { render, cleanup, waitForElement, fireEvent, prettyDOM, getByText, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, waitForElementToBeRemoved, getByDisplayValue } from "@testing-library/react";

import Application from "components/Application";

import axios from "axios";


afterEach(cleanup);

describe("Application", () => {
  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"));
  
    fireEvent.click(getByText("Tuesday"));
  
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container,debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = getAllByTestId(container, "appointment")[0];

    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();

  });
  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
  // 1. Render the Application.
    const { container, debug } = render(<Application />)
  // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
  // 3. Click the "Delete" button on the booked appointment.
     const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen"));
    
    fireEvent.click(getByAltText(appointment, "Delete"));
  // 4. Check that the confirmation message is shown.
    
    expect(getByText(appointment, "Are you sure you would like to delete this appointment?")).toBeInTheDocument();
    
  // 5. Click the "Confirm" button on the confirmation.
    expect(getByText(appointment, "Confirm")).toBeInTheDocument();
    fireEvent.click(getByText(appointment, "Confirm"));

  // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
    
  // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));

  // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });
  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    //  1. Renders the application
    const { container, debug } = render(<Application />)
    //  2. Waits for data to be loaded
    await waitForElement(() => getByText(container, "Archie Cohen"));
    //  3. Clicks on the edit button on the interview for Archie Cohen
    const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen"));
    fireEvent.click(getByAltText(appointment, "Edit"));
    //  4. Changes the interviewer and submits
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));
    //  5. Check to see if saving prompt is displayed
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    //  6. Wait till the saving process is complete
    await waitForElement(() => getByText(appointment, "Sylvia Palmer"));
    //  7. Keeps the spots remaining for Monday the same
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday"));
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });
  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    //  1. Renders the application
    const { container, debug } = render(<Application />);   
    //  2. Waits for data to be loaded
    await waitForElement(() => getByText(container, "Archie Cohen"));
    //  3. Clicks on the add button int he first appointment component which is empty to add an interview
    const appointment = getAllByTestId(container, "appointment")[0];
    fireEvent.click(getByAltText(appointment, "Add"));
    //  4. Enters Student name and selects interviewer
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "James May" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
   
    //  5. Click Save 
    fireEvent.click(getByText(appointment, "Save"));
   
    //  6. Wait for the error message
    debug(appointment);
    await waitForElement(() => getByText(appointment, "Could not Save"));
    //  7. Keeps the spots remaining for Monday the same
});
  
});