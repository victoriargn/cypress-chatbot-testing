describe('Consulta de Encomenda no Chat', () => {
  it('Deve indicar que a encomenda já foi entregue', () => {

    const trackingCode = 'PD123456785BR';

    cy.viewport('iphone-xr');
    cy.visit('/');

    cy.get('button[aria-label="Open Chat"]')
      .should('be.visible')
      .click();

    cy.contains('.rcb-bot-message', 'Olá! Tudo bem? Posso te ajudar a consultar o status da sua encomenda?')
      .should('be.visible');

    cy.contains('.rcb-options', 'Sim, por favor!')
      .should('be.visible')
      .click();

    cy.contains('.rcb-bot-message', 'Ótimo! Por favor, digite o código de rastreio da sua encomenda:')
      .should('be.visible');

    
  })
})