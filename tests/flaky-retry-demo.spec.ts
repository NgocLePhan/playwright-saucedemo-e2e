import {test, expect} from '@playwright/test';

test.describe('FLAKY TEST RETRY & ROOT CAUSE ANALYSIS', () => {
    test('TC01: Simulating an intermittent fault to trigger the retry mechanism @flaky', async({page}, testInfo) => {
        await page.goto('/');

        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');

        if(testInfo.retry == 0){
            console.log('--- [LẦN CHẠY 1]: Cố tình kích hoạt fail để kiểm tra cơ chế Retry & Trace generation ---');
            await expect(page.locator('.title')).toHaveText('WRONG_PAGE_TITLE_TO_TRIGGER_RETRY', { timeout: 2000 });
        } else {
            console.log(`--- [LẦN RETRY #${testInfo.retry}]: Chạy logic đúng để pass test ---`);
            await expect(page.locator('.title')).toHaveText('Products');
        }
    });
});