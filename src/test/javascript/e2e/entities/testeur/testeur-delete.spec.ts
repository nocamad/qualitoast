import { browser, element, by } from 'protractor';

describe('Testeur e2e test', () => {

    const username = element(by.id('username'));
    const password = element(by.id('password'));
    const entityMenu = element(by.id('entity-menu'));
    const accountMenu = element(by.id('account-menu'));
    const login = element(by.id('login'));
    const logout = element(by.id('logout'));
    /*
    const identifiant = element(by.id('field_identifiant'));
    const nom = element(by.id('field_nom'));
    const prenom = element(by.id('field_prenom'));
    const typetest = element(by.id('field_typetest'));
    */
    beforeAll(() => {
        browser.get('/');

        accountMenu.click();
        login.click();

        username.sendKeys('admin');
        password.sendKeys('admin');
        element(by.css('button[type=submit]')).click();
        browser.waitForAngular();
    });

    it('should load Testeurs', () => {
        entityMenu.click();
        element.all(by.css('[routerLink="testeur"]')).first().click().then(() => {
            const expectVal = /qualiToastApp.testeur.home.title/;
            element.all(by.css('h2 span')).first().getAttribute('jhiTranslate').then((value) => {
                expect(value).toMatch(expectVal);
            });
        });
    });

    // Delete a testeur
    it('should search a testeur', function() {
        element(by.id('currentSearch')).clear();
        element(by.id('currentSearch')).sendKeys('testeur');
        element(by.id('buttonSearch')).click();
    });

    it('should load delete Testeur dialog', function() {
        element(by.id('testeur-component-delete')).click().then(() => {
            const expectVal = /entity.delete.title/;
            element.all(by.css('h4.modal-title')).first().getAttribute('jhiTranslate').then((value) => {
                expect(value).toMatch(expectVal);
            });
            element(by.id('testeur-delete-dialog-component-delete')).click();
        });
    });

    afterAll(function() {
        accountMenu.click();
        logout.click();
    });
});
