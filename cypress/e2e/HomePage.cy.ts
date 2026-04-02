describe('Characters Dashboard', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/character*', {
      fixture: 'characters.json',
    }).as('getCharacters');

    cy.visit('/');
    cy.wait('@getCharacters');
  });

  it('displays the characters table', () => {
    cy.get('[data-testid="characters-table"]').should('exist');
    cy.get('[data-testid^="character-row-"]').should('have.length.greaterThan', 0);
  });

  it('filters characters by search', () => {
    cy.get('[data-testid="search-name-input"]').type('Mickey');

    cy.get('[data-testid^="character-row-"]').each(($row) => {
      cy.wrap($row).should('contain.text', 'Mickey');
    });
  });

  it('opens modal with character details', () => {
    cy.get('[data-testid^="character-row-"]').first().click();

    cy.get('[data-testid="character-modal"]').should('be.visible');

    cy.get('[data-testid="character-modal"]').within(() => {
      cy.contains('Films');
      cy.contains('TV Shows');
    });
  });

  it('shows tooltip with films and percentage', () => {
    cy.get('.highcharts-point').first().trigger('mouseover');

    cy.get('.highcharts-tooltip').should('contain.text', 'Percentage');
    cy.get('.highcharts-tooltip').should('contain.text', 'Film List');
  });

  it('exports chart data to Excel', () => {
    cy.intercept('GET', '**/*.xlsx').as('download');

    cy.contains('Export to Excel').click();

    cy.wait(1000);
  });
});
