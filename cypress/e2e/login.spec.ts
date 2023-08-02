describe('Login spec', () => {
  it('visit the login page', () => {
    cy.visit('/');
  });
  it('should name input has the focus when it clicks on it', () => {
    // Arrange
    // Act
    cy.visit('/');
    cy.findByRole('textbox').as('userInput');
    cy.get('@userInput').click();
    // Assert
    cy.get('@userInput').should('have.focus');
  });
  it('should show an alert with a message when type invalid credentials', () => {
    // Arrange
    const user = 'admin';
    const password = '1234';
    // Act
    cy.visit('/');
    cy.findByRole('textbox').as('userInput');
    cy.findByLabelText('Contraseña *').as('passwordInput');

    cy.get('@userInput').type(user);
    cy.get('@passwordInput').type(password);
    cy.findByRole('button', { name: 'Login' }).click();
    // Assert
    cy.findByRole('presentation');
    cy.findByRole('alert');
  });
  it('should navigate to model list url when type valid credentials', () => {
    // Arrange
    const user = 'admin';
    const password = 'test';
    // Act
    cy.visit('/');
    cy.findByRole('textbox').as('userInput');
    cy.findByLabelText('Contraseña *').as('passwordInput');

    cy.get('@userInput').type(user);
    cy.get('@passwordInput').type(password);
    cy.findByRole('button', { name: 'Login' }).click();
    // Assert
    cy.url().should('equal', 'http://localhost:8080/#/submodule-list');
  });

});
