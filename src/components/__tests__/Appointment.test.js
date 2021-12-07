/*
  We are rendering `<Application />` down below, so we need React.createElement
*/
import React from "react";

/*
  We import our helper functions from the react-testing-library
  The render function allows us to render Components
*/
import { act, render, waitForElement, debug, getByText } from "@testing-library/react";

/*
  We import the component that we are testing
*/
import Application from "components/Application";

/*
  A test that renders a React Component
*/
describe("Appointment", () => {
  it("renders without crashing", async () => {   
    const {container, debug} = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
  });

})
