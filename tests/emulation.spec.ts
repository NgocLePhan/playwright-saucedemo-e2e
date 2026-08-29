import { test, expect, devices } from '@playwright/test';

test.describe('EMULATION & GEOLOCATION', () => {
    test('TC01: Giả lập giao diện Mobile (Pixel 7) & Thao tác Touch Menu @mobile', async ({ browser }) => {
        {
            // Tạo context giả lập điện thoại Pixel 7
            const pixelContext = await browser.newContext({
                ...devices['Pixel 7'],
            });

            const page = await pixelContext.newPage();
            await page.goto('https://www.saucedemo.com/', { waitUntil: 'domcontentloaded' });

            // Đăng nhập trên giao diện di động
            await page.fill('#user-name', 'standard_user');
            await page.fill('#password', 'secret_sauce');
            await page.click('#login-button');

            // Kiểm tra nút Hamburger Menu xuất hiện trên mobile
            const menuButton = page.locator('#react-burger-menu-btn');
            await expect(menuButton).toBeVisible()

            // Mở menu và kiểm tra sidebar hiển thị
            await menuButton.click();
            await expect(page.locator('.bm-menu-wrap')).toBeVisible();

            await pixelContext.close();
        }
    });

    test('TC02: Giả lập Geolocation (Tokyo, Japan) & Cấp quyền tự động @geolocation', async ({ browser }) => {

        const geoContext = await browser.newContext({
            geolocation: { latitude: 35.6586, longitude: 139.7454 },
            permissions: ['geolocation']
        });

        const page = await geoContext.newPage();
        await page.goto('https://the-internet.herokuapp.com/geolocation', { waitUntil: 'domcontentloaded' });

        await page.locator('button', { hasText: 'Where am I?' }).click();

        await expect(page.locator('#lat-value')).toHaveText('35.6586');
        await expect(page.locator('#long-value')).toHaveText('139.7454');

        await geoContext.close();
    });
});