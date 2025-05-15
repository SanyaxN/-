describe('Cypress: додаємо задачу', () => {
  it('додає нову задачу', () => {
    cy.visit('https://demo.playwright.dev/todomvc');
    cy.get('input[placeholder="What needs to be done?"]').type('Cypress тест{enter}');
    cy.get('.todo-list li').should('have.length', 1);
  });
});
