import {test, expect} from '../src/fixtures/page-fixture';

test.describe('E2E Flow', () =>{
    test('Full flow', async({loginPage, inventoryPage, cartPage, checkoutPage}) => {
        await loginPage.navigateTo();
        await loginPage.login('standard_user', 'secret_sauce');

        await inventoryPage.addItemToCartByName('Sauce Labs Backpack');

        await cartPage.clickCart();
        await cartPage.verifyProductInCart('Sauce Labs Backpack');
        await cartPage.clickCheckout();

        await checkoutPage.fillCheckoutInformation(`Jane`, `Silver`, `005`);
        await checkoutPage.clickFinish();
        await checkoutPage.verifyOrderSuccess(`Thank you for your order!`);
    });
})