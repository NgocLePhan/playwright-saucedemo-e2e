import {test} from '../src/fixtures/page-fixture';
import userData from '../src/data/users.json';

test.describe('AUTHENTICATION FLOW', () => {

    test.beforeEach(async ({loginPage}) => {
        await loginPage.navigateTo();
    });

    test('TC01: Verify successful login with standard user @smoke @regression', async({loginPage}) => {
        await loginPage.login(
            userData.validUser.username,
            userData.validUser.password
        );
        await loginPage.verifyURLContains('inventory.html');
    });

    test('TC02: Verify error message with locked user @regression', async ({loginPage}) =>{
        await loginPage.login(
            userData.lockedUser.username,
            userData.lockedUser.password
        );
        await loginPage.verifyError(userData.lockedUser.errorMessage);
    });

    // Invalid Users
    for (const scenario of userData.invalidUsers){
        test(`${scenario.testCase} @regression`, async({loginPage}) => {
            await loginPage.login(scenario.username, scenario.password);
            await loginPage.verifyError(scenario.errorMessage);
        });
    }
});