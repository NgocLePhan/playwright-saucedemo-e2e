import {test, expect} from '@playwright/test';

test.describe('Manage Test Suite by Advance Tag', () => {

    test('TC01: Verify Homepage @smoke', {
        tag: ['@smoke', '@fast'],
    }, async({page}) => {
        await page.goto('https://www.saucedemo.com/', {waitUntil: 'domcontentloaded'});
        await expect(page).toHaveTitle('Swag Labs')
    });

    test('TC02: Verify product details @resgression', {
        tag: ['@regression'],
    }, async({page}) => {
        await page.goto('https://www.saucedemo.com/', {waitUntil: 'domcontentloaded'});
        await page.locator('#user-name').fill('performance_glitch_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');

        await expect(page.locator('.inventory_item')).toHaveCount(6)
    });

    test('TC03: Simulated heavy-load test scenario @slow', {
        tag: ['@slow'],
    }, async({page}) => {
        test.slow();
         await page.goto('https://www.saucedemo.com/', {waitUntil: 'domcontentloaded'});
        await page.locator('#user-name').fill('performance_glitch_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');

        await expect(page.locator('.inventory_item')).toHaveCount(6)
    })
})