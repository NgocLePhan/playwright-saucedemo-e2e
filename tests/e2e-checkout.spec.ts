import { test } from '../src/fixtures/page-fixture';
import checkoutData from '../src/data/checkout-data.json';
import userData from '../src/data/users.json';

test.describe('Checkout Flow', () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigateTo();
    });

    test('Checkout with valid user', async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
        await loginPage.login(
            userData.validUser.username,
            userData.validUser.password
        );

        await inventoryPage.addItemToCartByName('Sauce Labs Backpack');

        await cartPage.clickCart();
        await cartPage.verifyProductInCart('Sauce Labs Backpack');
        await cartPage.clickCheckout();

        await checkoutPage.fillCheckoutInformation(
            checkoutData.validCustomer.firstName,
            checkoutData.validCustomer.lastName,
            checkoutData.validCustomer.postalCode
        );

        await checkoutPage.clickFinish();
        await checkoutPage.verifyOrderSuccess(`Thank you for your order!`);
    });

    for(const scenario of checkoutData.invalidCheckout){
        test(`${scenario.testCase}`, async({loginPage, inventoryPage, cartPage, checkoutPage}) => {
            await loginPage.login(
                userData.validUser.username,
                userData.validUser.password
            );

            await inventoryPage.addItemToCartByName('Sauce Labs Backpack');

            await cartPage.clickCart();
            await cartPage.verifyProductInCart('Sauce Labs Backpack');
            await cartPage.clickCheckout();

            await checkoutPage.fillCheckoutInformation(
                scenario.firstName,
                scenario.lastName,
                scenario.postalCode
            );
            await checkoutPage.verifyErrorMessage(scenario.errorMessage);
        });
    }
});