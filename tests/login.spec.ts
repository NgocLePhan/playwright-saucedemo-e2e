import {test, expect} from '@playwright/test';
import {LoginPage} from '../src/pages/login-page';

test.describe('AUTHENTICATION FLOW', () => {

    test('TC01: Login with block user', async({page}) => {
        
        const loginPage = new LoginPage(page);

        await loginPage.navigateTo();

        await loginPage.login('locked_out_user', 'secret_sauce');

        await loginPage.verifyError('Epic sadface: Sorry, this user has been locked out.');
    });

    test('TC02: Verify successful login with standard user', async({page}) => {
        const loginPage = new LoginPage(page);

        await loginPage.navigateTo();

        await loginPage.login('standard_user' , 'secret_sauce');

        await loginPage.verifyURLContains('inventory.html');
    })
})