/// <reference types="cypress"/>

describe('Consulta de Encomenda no Chat', () => {
  it('Deve indicar que a encomenda já foi entregue', () => {

    const trackingCode = 'PD123456785BR';

    cy.openChatBot();

    cy.verifyMessage('Olá! Tudo bem? Posso te ajudar a consultar o status da sua encomenda?');

    cy.selectOption('Sim, por favor!');

    cy.verifyMessage('Ótimo! Por favor, digite o código de rastreio da sua encomenda:');

    cy.sendMessage(trackingCode);

    cy.verifyMessage(`Confirmando: você informou o código de rastreio ${trackingCode}. Está tudo certo?`);

    cy.selectOption('Sim, está certo!');

    cy.verifyMessage('Perfeito! Estou consultando as informações nos Correios... Só um instante. 📦🔍');

    cy.verifyMessage('Boa notícia! Sua encomenda já foi entregue com sucesso. 🎉 Se precisar de algo mais, é só me chamar!',
      7000
    );
  })

  it('Deve indicar que a encomenda está a caminho', () => {
    const trackingCode = 'BR987654321BR';

    cy.openChatBot();

    cy.verifyMessage('Olá! Tudo bem? Posso te ajudar a consultar o status da sua encomenda?');

    cy.selectOption('Sim, por favor!');

    cy.verifyMessage('Ótimo! Por favor, digite o código de rastreio da sua encomenda:');

    cy.sendMessage(trackingCode);

    cy.verifyMessage(`Confirmando: você informou o código de rastreio ${trackingCode}. Está tudo certo?`);

    cy.selectOption('Sim, está certo!');

    cy.verifyMessage('Perfeito! Estou consultando as informações nos Correios... Só um instante. 📦🔍');

    cy.verifyMessage(
      'A sua encomenda já foi despachada e está a caminho! 🚚 Prazo estimado: 5 dias úteis.',
      7000
    );
  })

  it('Deve indicar que a encomenda está em rota de entrega', () => {
    const trackingCode = 'QW112233445BR';

    cy.openChatBot();

    cy.verifyMessage('Olá! Tudo bem? Posso te ajudar a consultar o status da sua encomenda?')

    cy.selectOption('Sim, por favor!');

    cy.verifyMessage('Ótimo! Por favor, digite o código de rastreio da sua encomenda:')

    cy.sendMessage(trackingCode);

    cy.verifyMessage(`Confirmando: você informou o código de rastreio ${trackingCode}. Está tudo certo?`)

    cy.selectOption('Sim, está certo!');

    cy.verifyMessage('Perfeito! Estou consultando as informações nos Correios... Só um instante. 📦🔍')

    cy.verifyMessage('Ótima notícia! Sua encomenda está em rota de entrega e chega ainda hoje. Fique de olho! 👀📦',
      7000
    );
  });

  it('Deve exibir erro para o código de rastreio não encontrado', () => {
    const trackingCode = 'AB123456789XY';

    cy.openChatBot();
    cy.verifyMessage('Olá! Tudo bem? Posso te ajudar a consultar o status da sua encomenda?');

    cy.selectOption('Sim, por favor!');

    cy.verifyMessage('Ótimo! Por favor, digite o código de rastreio da sua encomenda:');

    cy.sendMessage(trackingCode);

    cy.get('.rcb-send-button').click();

    cy.verifyMessage(`Confirmando: você informou o código de rastreio ${trackingCode}. Está tudo certo?`);

    cy.selectOption('Sim, está certo!');

    cy.verifyMessage('Perfeito! Estou consultando as informações nos Correios... Só um instante. 📦🔍');

    cy.verifyMessage('Hmm... Não encontrei uma encomenda com os dados informados. Vamos tentar de novo?',
      7000
    );
  });
})

Cypress.Commands.add('openChatBot', () => {
  cy.viewport('iphone-xr');
  cy.visit('/');

  cy.get('button[aria-label="Open Chat"]')
    .should('be.visible')
    .click();

  cy.get('.rcb-chat-header span')
    .should('be.visible')
    .and('have.text', 'Sensei')
});

Cypress.Commands.add('verifyMessage', (expectedMessage, timeout = 4000) => {
  cy.contains('.rcb-bot-message', expectedMessage, { timeout: timeout })
    .should('be.visible')
});

Cypress.Commands.add('selectOption', (option) => {
  cy.contains('.rcb-options', option)
    .click();
});

Cypress.Commands.add('sendMessage', (message) => {
  cy.get('textarea[placeholder^="Escreva sua mensagem"]')
    .type(message);

  cy.get('.rcb-send-button').click();
});