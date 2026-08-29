import { test, expect } from '../src/fixtures/page-fixture';

test.describe('INVENTORY & SHOPPING FLOW', () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigateTo();
        await loginPage.login('standard_user', 'secret_sauce');
    });

    test('TC01: Add product to cart', async ({ inventoryPage }) => {
        await inventoryPage.addItemToCartByName('Sauce Labs Backpack');
        const badgeCount = await inventoryPage.getCartBadgeCount();
        expect(badgeCount).toBe("1");
    });

    test('TC02: Add 2 product to cart', async ({ inventoryPage }) => {
        await inventoryPage.addItemToCartByName('Sauce Labs Backpack');
        await inventoryPage.addItemToCartByName('Sauce Labs Bike Light');
        const badgeCount = await inventoryPage.getCartBadgeCount();
        expect(badgeCount).toBe("2");
    });
})