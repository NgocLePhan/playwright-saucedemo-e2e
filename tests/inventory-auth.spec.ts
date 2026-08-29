import { test, expect } from '@playwright/test';

test.use({ storageState: '.auth/user.json' });

test.describe('INVENTORY PAGE WITH STORAGE STATE', () => {
    test('Access inventory directly without login UI form @smoke', async ({ page }) => {
        // Direct navigation with stored cookies
        await page.goto('https://www.saucedemo.com/inventory.html');

        await expect(page.locator('.header_secondary_container .title')).toHaveText('Products')
        await expect(page.locator('.inventory_item')).toHaveCount(6);
    });
});