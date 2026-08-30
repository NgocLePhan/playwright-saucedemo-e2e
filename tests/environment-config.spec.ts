import {test, expect} from '@playwright/test';

test.describe('MULTI-ENVIRONMENT CONFIGURATION VERIFICATION', () => {
    test('TC01: Log in using dynamic environment variables @smoke', async({page}) => {
        const username = process.env.STANDARD_USER;
        const password = process.env.USER_PASSWORD;

        await page.goto('/');

        await page.fill('#user-name', username || '');
        await page.fill('#password', password || '');
        await page.click('#login-button');

        await expect(page).toHaveURL(/.*inventory.html/);
    });
});