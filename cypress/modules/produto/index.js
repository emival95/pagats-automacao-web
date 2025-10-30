class Produto {
    navegarParaProdutos(){
         cy.contains('a', 'Products').click()
    }

    verificarListaDeProdutos(){
        cy.get('.features_items .product-image-wrapper')
            .should('exist')

        cy.get(':nth-child(3) > .product-image-wrapper > .choose > .nav > li > a').click()
    }

    vizualizaListasDeBusca(){
        cy.get('.features_items .product-image-wrapper')
            .first()
            .find('a')
            .contains('View Product')
    }

    buscarProduto(){
        cy.get('#search_product').type('Blue Top')
        cy.get('#submit_search > .fa').click()
    }
}

export default new Produto()