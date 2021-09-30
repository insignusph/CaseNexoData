/// <reference types="cypress" />

import loc from "../support/locators"

const receita = Cypress.env('receita')

describe("Case Nexo Data", () => {


    /*----------------------------------------------------------------
    Dado que eu tenha acesso a plataforma de farmácias
    E possuo o código da Receita para
    E o código de verificação
    E seleciono os medicamentos desejados (Omeprazol & Stilnox)
    Quando eu clicar em "Dispensar Receita"
    Então devo visualizar a tela de sucesso
    E a mensagem "Medicamentos dispensados com sucesso"
    -------------------------------------------------------------------*/
    it("Dispensação de medicamento Sem Login", () => {

        cy.visit('https://farmacias-staging.nexodata.com.br/')

        //Clicando em acessar com o codigo do Paciente
        cy.get(".chakra-text").contains("paciente").click()

        //Informando a receita
        cy.get("#field-1").type(receita)

        //digitando o código de verificação
        cy.get(loc.codigoVerif.digito1).type("0")
        cy.get(loc.codigoVerif.digito2).type("9")
        cy.get(loc.codigoVerif.digito3).type("5")
        cy.get(loc.codigoVerif.digito4).type("7")

        //Clicando em consultar a receita
        cy.get(".chakra-button").contains("Consultar receita").click()
        
        //Fazendo assertiva para validar que a tela foi carregada
        cy.get(".chakra-accordion__button .chakra-text ").first().should('contain', "Paciente")

        //Selecionando os medicamentos a serem dispensados
        cy.selecionaMedicamento("OMEPRAZOL 10 MG")
        cy.selecionaMedicamento("STILNOX 6,25 MG")

        //Clicando no botão de Dispensar Receita
        cy.get(".chakra-button").contains("Dispensar receita").click()

        cy.get(".float").should('to.be.visible')
        cy.get(".chakra-text").should('contain', "Medicamentos dispensados com sucesso!")
        

    })
})