import {test, expect} from '../src/fixtures/page-fixture';

test.describe('VISUAL REGRESSION TESTING', () => {

    test.beforeEach(async({loginPage}) => {
        await loginPage.navigateTo();
    });

    test('TC01: Full page snapshot verification', async({page}) => {
        await expect(page).toHaveScreenshot('login-page-baseline.png',{
            fullPage: true
        });
    });

    test('TC02: Component snapshot verification', async({page}) => {
        const loginBox = page.locator('.login_wrapper-inner');
        await expect(loginBox).toHaveScreenshot('login-box-baseline.png');
    });
})