describe('Employee-list spec', () => {
  it('visit the Employee-list page', () => {
    cy.loadAndVisit('/api/employees', '/employees');
  });

  it('should fetch employee list greater than 0 when visit /employees url', () => {
    // Arrange
    cy.loadAndVisit('/api/employees', '/employees');
    // Act
    // Assert
    // table header is the frist row
    cy.findAllByRole('row').should('have.length.greaterThan', 1);
  });

  it('should fetch 4 employees when visit /employees url', () => {
    // Arrange
    cy.loadAndVisit('/api/employees', '/employees', 'employees.json');
    // Act

    // Assert
    // 4 employees + table header
    cy.findAllByRole('row').should('have.length', 5);
  });

  it('should navigate to three employee when click on edit three employee', () => {
    // Arrange
    // Act
    cy.loadAndVisit('/api/employees', '/employees', 'employees.json');

    cy.findAllByRole('button', { name: 'Edit employee' }).then(($buttons) => {
      $buttons[2].click();
    });

    // Assert
    cy.url().should('equal', 'http://localhost:8080/#/employees/3');
  });

 
  it('should click to edit the second employed and comprove all value is correct', () => {
    // Arrange
    // Act
    cy.loadAndVisit('/api/employees', '/employees', 'employees.json');

    cy.findAllByRole('button', { name: 'Edit employee' }).then(($buttons) => {
      $buttons[1].click();
    });
    /* "id": "2",
    "isActive": true,/
    "email": "jose.gomez@empresa.com",*/
    cy.findByLabelText('Nombre').should('have.value', 'Jose Gomez');
    
    cy.findByLabelText('Id').should('have.value', '2');
    
    cy.findByLabelText('Email').should('have.value', 'jose.gomez@empresa.com');
    
    cy.findByLabelText('Activo').should('have.value', "on");


    // Assert/

  });

  it('should update employee name when it edits an employee and click on cancel button', () => {
    // Arrange
    // Act
    cy.loadAndVisit('/api/employees', '/employees', 'employees.json');

    cy.findAllByRole('button', { name: 'Edit employee' }).then(($buttons) => {
      $buttons[1].click();
    });

    cy.findByLabelText('Nombre').should('not.have.value', '');

    cy.findByLabelText('Nombre').clear().type('Paco Ramirez');

    cy.findByRole('button', { name: 'Cancelar' }).click();

    // Assert
    cy.findByText('Paco Ramirez').should('not.exist');
  });

  it('should delete to second employee when click on delete second employee', () => {
    // Arrange
    // Act
    cy.loadAndVisit('/api/employees', '/employees', 'employees.json');

    cy.findAllByRole('button', { name: 'Delete employee' }).then(($buttons) => {
      $buttons[1].click();
    });

    // Assert
    cy.findByText('Eliminar Empleado');
  });
});
