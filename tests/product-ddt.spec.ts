import { test, expect } from '../src/fixtures/page-fixture';
import userData from '../src/data/users.json';
import productData from '../src/data/products.json';

test.describe('Product', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigateTo();
    });

    test('Add multi product', async ({ loginPage, inventoryPage }) => {
        await loginPage.login(
            userData.validUser.username,
            userData.validUser.password
        );

        for (const scenario of productData.testSet1) {
            await inventoryPage.addItemToCartByName(scenario);
        }
        const badgeCount = await inventoryPage.getCartBadgeCount();
        const expectedCount = productData.testSet1.length.toString();
        expect(badgeCount).toBe(expectedCount);
    })
})