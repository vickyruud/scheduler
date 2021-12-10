describe("Appointment", () => {
    //resets the database and waits for the page to load
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");

    cy.visit("/");

    cy.contains("Monday");
  });
  it("Should book an appointment", () => {
    //clicks on the add button on the second appointment
    cy.get("[alt=Add]")
      .first()
      .click();
    //enters a student name
    cy.get('[data-testid="student-name-input"]')
      .type("Lydia Miller-Jones");
    //selects an interviewer
    cy.get("[alt='Sylvia Palmer']")
      .click();
    //clicks the save button
    cy.contains("Save")
      .click();
    //check to see if the appointment card has the student name and interviewer
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");

    
  });
  it("Should edit an interview", () => {
    //click on the edit button
    cy.get("[alt=Edit]").first().click({ force: true });
    //click on a different interviewer
    cy.get("[alt='Tori Malcolm']").click();
    //change name of the student
    cy.get('[data-testid="student-name-input"]').clear().type("James May"); 4
    //click save
    cy.contains("Save").click();
    //check to see if the appointment card has the student name and interviewer
    cy.contains(".appointment__card--show", "James May");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });
  it("Should cancel an interview", () => {
    //click on the delete button      
    cy.get("[alt=Delete]").first().click({ force: true });
    //click confirm on the confirmation screen
    cy.contains("Confirm").click();
    //check to see if the deleting prompt displays
    cy.contains("Deleting");
    //check to see if the deleting prompt is removed
    cy.contains("Deleting").should('not.exist');
    //check to see if the student name does not exist in the appointment slot anymore
    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");  
  });
})