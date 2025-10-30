import {faker} from '@faker-js/faker'
class assinatura {
    preencherFormularioDeAssinatura() {
        cy.get('#susbscribe_email').type(faker.internet.email())
        cy.get('#subscribe > .fa').click()
        
    }
}

export default new assinatura()