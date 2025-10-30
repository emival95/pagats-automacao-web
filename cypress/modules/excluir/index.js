class excluir {
    excluirConta() {
        cy.contains('#header a', ' Delete Account').click()
    }
}

export default new excluir()