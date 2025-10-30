/// <reference types="cypress" />
// describe/ contex - suite ou conjunto de testes
// it - um teste dentro de um bloco ou conjuto de testes

// describe -> Automaition Exercise
//   it -> Cadastro de usuario
//   it -> teste abcd

/*
    hOOKS/ GANCHOS
    BEFORE -> 1X ANTES DE TODOS OS TESTES
    beforeEach -> andtes de cadas teste
    aftrer ->  1 xdepos de todos os teste
    afttereach -> depois de cada teste 

*/

import userData from '../fixtures/example.json'
import { getRandomNumber,
     getRandomEmail
} from '../support/helpers.js'

import {fa, faker} from '@faker-js/faker'





describe('Automation Exercise', () => {

    beforeEach(() => {
        cy.visit('https://automationexercise.com/')
        cy.get('a[href="/login"]').click()
    })

    it('Cadastrar um usuario', () => {

        const timestamp = new Date().getTime()



        cy.get('[data-qa="signup-name"]').type('QA User')

        cy.get('[data-qa="signup-email"]').type(faker.internet.email())

        cy.contains('button', 'Signup').click()

        // radio ou ckeckbox

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




        // Triplo A = arange - act - assert

        cy.url().should('include', 'account_created')
        cy.contains('b', 'Account Created!')










    });

    //testee1760971169927@teste.com

    it('Login de usaurio existentes', () => {


        cy.get('[data-qa="login-email"]').type('Gerry15@gmail.com')
        cy.get('[data-qa="login-password"]').type('teste1234', { log: false })
        cy.get('[data-qa="login-button"]').click()

        cy.get('i.fa-user').parent().should('contain', 'QA User')
        cy.get('a[href="/logout"]').should('be.visible')
        cy.contains('b', 'QA User')
    })

    it('Login de usaurio com e-mail e senha incorreta', () => {



        cy.get('[data-qa="login-email"]').type('Gerry15@gmail.com')
        cy.get('[data-qa="login-password"]').type('54321', { log: false })
        cy.get('[data-qa="login-button"]').click()

        cy.get('.login-form > form > p').should('contain', 'Your email or password is incorrect!')




    })

    it('Logout de usuario', () => {





        cy.get('[data-qa="login-email"]').type('Gerry15@gmail.com')
        cy.get('[data-qa="login-password"]').type('teste1234', { log: false })

        cy.get('[data-qa="login-button"]').click()

        cy.get('a[href="/logout"]').should('be.visible').click()
        cy.url().should('contain', 'login')

    });


    it('Cadastrar um usuario', () => {

        

        cy.get('[data-qa="signup-name"]').type('QA User')

        cy.get('[data-qa="signup-email"]').type('Gerry15@gmail.com')

        cy.contains('button', 'Signup').click()


        cy.get('.signup-form > form > p').should('contain', 'Email Address already exist!')


    });

    it('Enviar formulario de contato com upload de arquivo',() => {

        cy.get(`a[href*=contact]`).click()
        cy.get('[data-qa="name"]').type(userData.name)
        cy.get('[data-qa="email"]').type(userData.email)
        cy.get('[data-qa="subject"]').type(userData.subject)
        cy.get('[data-qa="message"]').type(userData.message)

        cy.fixture('example.json').as('arquivo')
        cy.get('input[type=file]').selectFile('@arquivo')
        // cy.get('name="upload_file"]').selectFile('@arquivo')


        cy.get('[data-qa="submit-button"]').click()

        cy.get('.status').should('contain', 'Success')
        cy.get('.status').should('be.visible')


    })


})