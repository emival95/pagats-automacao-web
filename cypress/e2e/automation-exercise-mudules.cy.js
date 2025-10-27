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
import {
    getRandomNumber,
    getRandomEmail
} from '../support/helpers.js'

import { fa, faker } from '@faker-js/faker'
import menu from '../modules/menu'
import login from '../modules/login'
import cadastro from '../modules/cadastro'
import contato from '../modules/contato/index.js'





describe('Automation Exercise', () => {

    beforeEach(() => {
        cy.visit('https://automationexercise.com/')

        //menu.navegarParaLogin()
        cy.navegarParaLogin()
    })

    it('Cadastrar um usuario', () => {

        login.preencherFormularioDePreCadastro()

        cadastro.preencherFormularioDePreCadastroCompleto()


        cy.url().should('include', 'account_created')
        cy.contains('b', 'Account Created!')


    });



    it('Login de usaurio existentes', () => {


        login.preencherFormularioDeLogin(userData.user, userData.password)

        cy.get('i.fa-user').parent().should('contain', userData.name)
        cy.get('a[href="/logout"]').should('be.visible')
        cy.contains('b', 'QA User')
    })

    it('Login de usaurio com e-mail e senha incorreta', () => {


        login.preencherFormularioDeLogin(userData.user, '43333')

        cy.get('.login-form > form > p').should('contain', 'Your email or password is incorrect!')




    })

    it('Logout de usuario', () => {


        login.preencherFormularioDeLogin(userData.user, userData.password)

        menu.efetuarLogout()
        cy.url().should('contain', 'login')

    });


    it('Cadastrar um usuario existente no sistema', () => {



        cy.get('[data-qa="signup-name"]').type('QA User')

        cy.get('[data-qa="signup-email"]').type('testee1760971687315@teste.com')

        cy.contains('button', 'Signup').click()


        cy.get('.signup-form > form > p').should('contain', 'Email Address already exist!')


    });

    it('Enviar formulario de contato com upload de arquivo', () => {

        login.navegarParaContatos()

        contato.preencherFormularioDeContatoComSucesso()
       

        cy.get('.status').should('contain', 'Success')
        cy.get('.status').should('be.visible')


    })


})