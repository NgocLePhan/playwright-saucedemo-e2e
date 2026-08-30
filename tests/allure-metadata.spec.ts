import {test, expect} from '@playwright/test';
import * as allure from 'allure-js-commons';

test.describe('E-COMMERCE CHECKOUT FLOW', () => {
    test('TC01: Successful order flow @smoke', async({page}) => {
        await allure.epic('E-Commerce Core');
        await allure.feature('Checkout Module');
        await allure.story('Single Item Purchase');
        await allure.severity(allure.Severity.CRITICAL);
        await allure.owner('Ngoc Le');
        await allure.issue('JIRA-1024', 'https://jira.example.com/browse/JIRA-1024');

        await test.step('Step 1. Redirect to Signup page', async() => {
            await page.goto('https://www.saucedemo.com/', {waitUntil: 'domcontentloaded'});
            await expect(page).toHaveTitle('Swag Labs');
        });

        await test.step('Step 2. Log in with a valid account.', async() => {
            await page.fill('#user-name', 'standard_user');
            await page.fill('#password', 'secret_sauce');
            await page.click('#login-button');
            await expect(page.locator('.inventory_list')).toBeVisible();
        });

        await test.step('Step 3. Add product to cart', async() => {
            await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
            await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
        });
    });
});