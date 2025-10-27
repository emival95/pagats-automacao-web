import { faker } from '@faker-js/faker';
class Cadastro {

    preencherFormularioDePreCadastroCompleto(){
        cy.get('#id_gender1').check()

        // cy.get('input[type=radio]').check('Mrs')

        cy.get('#password').type('teste1234', { log: false })


        // para comboboxe com select
        cy.get('select[data-qa=days]').select('3')
        cy.get('select[data-qa=months]').select('March')
        cy.get('select[data-qa=years]').select('1995')

        cy.get('input[type=checkbox]#newsletter').check()
        cy.get('input[type=checkbox]#optin').check()

        cy.get('input#first_name').type(faker.person.firstName())
        cy.get('input#last_name').type(faker.person.lastName())
        cy.get('input#company').type(`PGATS ${faker.company.name()}`)
        cy.get('input#address1').type(faker.location.streetAddress())
        cy.get('select#country').select('Canada')
        cy.get('input#state').type(faker.location.state())
        cy.get('input#city').type(faker.location.city())
        cy.get('[data-qa="zipcode"]').type(faker.location.zipCode())
        cy.get('[data-qa="mobile_number"]').type('1234567890')
        cy.get('[data-qa="create-account"]').click()
 }
}

export default new Cadastro()