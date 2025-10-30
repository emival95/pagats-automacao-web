import { faker } from '@faker-js/faker';

class pagamento{
preencherFormularioDePagamento() {
    cy.get('[data-qa="name-on-card"]').type(faker.person.firstName())
        cy.get('[data-qa="card-number"]').type(faker.finance.creditCardNumber())
        cy.get('[data-qa="cvc"]').type(faker.finance.creditCardCVV())
        cy.get('[data-qa="expiry-month"]').type(faker.date.month())
        cy.get('[data-qa="expiry-year"]').type(faker.date.future().getFullYear())

        cy.get('[data-qa="pay-button"]').click()
        

        
  }
}

export default new pagamento()