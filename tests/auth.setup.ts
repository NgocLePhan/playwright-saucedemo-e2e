import { test as setup, expect } from '@playwright/test';

const authFile = '.auth/user.json';

setup('authenticate standard user', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    // Confirm navigation to inventory page
    await expect(page).toHaveURL(/.*inventory.html/);

    // Save browser session cookies and local storage
    await page.context().storageState({ path: authFile })
})