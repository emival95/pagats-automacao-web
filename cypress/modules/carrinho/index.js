class carrinho {

adicionarProdutoAoCArrinho (){
    
            cy.get('.productinfo > .btn').click()
            cy.get('.modal-footer > .btn').click()
    
    
           
    
            cy.contains('a', 'Cart').click()
            cy.get('.check_out').click()
    
    
            
            cy.get('.form-control').type('Fazer Pedido')
            cy.get('.btn.btn-default.check_out').click()
    
}
}

export default new carrinho()