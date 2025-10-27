import {faker} from '@faker-js/faker'

class Login {
    preencherFormularioDePreCadastro(){
      cy.get('[data-qa="signup-name"]').type('QA User')
    
            cy.get('[data-qa="signup-email"]').type(faker.internet.email())
    
            cy.contains('button', 'Signup').click()
    
}

preencherFormularioDeLogin(user, pass){
      cy.get('[data-qa="login-email"]').type(user)
        cy.get('[data-qa="login-password"]').type(pass)
        cy.get('[data-qa="login-button"]').click()
}

navegarParaContatos(){
     cy.get(`a[href*=contact]`).click()
}

}
export default new Login()