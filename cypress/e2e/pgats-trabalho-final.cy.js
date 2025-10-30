/// <reference types="cypress" />


import userData from '../fixtures/example.json'


import menu from '../modules/menu'
import login from '../modules/login'
import cadastro from '../modules/cadastro'
import contato from '../modules/contato/index.js'
import produto from '../modules/produto/index.js'
import assinatura from '../modules/assinatura/index.js'
import pagamento from '../modules/Pagamento/index.js'
import carrinho from '../modules/carrinho/index.js'
import excluir from '../modules/excluir/index.js'





describe('Automation Exercise- cadastro', () => {

    beforeEach(() => {
        cy.visit('https://automationexercise.com/')

       
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

        cy.get('[data-qa="signup-email"]').type('Gerry15@gmail.com')

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

describe('Automation Exercise - carrinho', () => {
    beforeEach(() => {
        cy.visit('https://automationexercise.com/')


    })

    it('Verificar todos os produtos e a página de detalhes do produto', () => {

        produto.navegarParaProdutos()

        produto.verificarListaDeProdutos()


        cy.get('.product-information')
            .should('contain.text', 'Category:')
            .and('contain.text', 'Availability:')
            .and('contain.text', 'Condition:')
            .and('contain.text', 'Brand:')
            .and('contain.text', 'Rs. 500') // valida o preço real



    })

    it('Pesquisar produto', () => {

        produto.navegarParaProdutos()

        produto.vizualizaListasDeBusca()

        produto.buscarProduto()


        cy.get('.features_items .product-image-wrapper').should('have.length.greaterThan', 0)
        cy.get('.productinfo > p').should('contain.text', 'Blue Top')



    })

    it('Verificar assinatura na página inicial', () => {

        assinatura.preencherFormularioDeAssinatura()
        cy.get('#success-subscribe').should('be.visible').and('contain.text', 'You have been successfully subscribed!')



    })

    it('Fazer pedido: Registre-se antes de finalizar a compra', () => {

        cy.navegarParaLogin()
        login.preencherFormularioDePreCadastro()

        cadastro.preencherFormularioDePreCadastroCompleto()


        cy.url().should('include', 'account_created')
        cy.contains('b', 'Account Created!')

        cy.get('[data-qa="continue-button"]').click()
        cy.get('i.fa-user').parent().should('contain', userData.name)
        cy.contains('b', 'QA User')

        produto.navegarParaProdutos()

        produto.vizualizaListasDeBusca()

        produto.buscarProduto()

        

        carrinho.adicionarProdutoAoCArrinho()

       

        pagamento.preencherFormularioDePagamento()


        cy.get('[data-qa="order-placed"]')
            .should('be.visible')
            .next('p')
            .should('contain.text', 'Congratulations! Your order has been confirmed!')

        cy.get('.col-sm-9 p')
            .should('contain.text', 'Congratulations! Your order has been confirmed!')

        

        excluir.excluirConta()

        cy.contains('Account Deleted!').should('be.visible')

        cy.get('[data-qa="continue-button"]').click()










    })
});