import {test, expect} from '../src/fixtures/page-fixture';
import userData from '../src/data/users.json';

test.describe('NETWORK INTERCEPTION & MOCKING', () => {
    test('Task 1: Abort all image requests (Test UI resilience when assets fail)', async({loginPage, page}) => {
        await page.route('**/*.{png,jpg,jpeg,svg}', (route) => {
            route.abort();
        });

        await loginPage.navigateTo();
        await loginPage.login(userData.validUser.username, userData.validUser.password);

        await loginPage.verifyURLContains('inventory.html');
    });

    test('Task 2: Mock and replace product image dynamically', async({page, loginPage}) => {
        await page.route('**/sauce-backpack-1200x1500*.jpg', async(route) => {
            await route.fulfill({
                status: 200,
                contentType: 'image/png',
                body: Buffer.from(''),
            });
        });

        await loginPage.navigateTo();
        await loginPage.login(userData.validUser.username, userData.validUser.password);

        await loginPage.verifyURLContains('inventory.html');
    });  
});

test.describe('PRACTICE API MOCKING', () => {
     // Practice mock 
    test('Lab 1: Chặn toàn bộ ảnh JPG', async({loginPage, page}) => {
        await page.route('**/*.jpg', async(route) => {
            console.log('Image block:', route.request().url());
            route.abort();
        });

        await loginPage.navigateTo();
        await loginPage.login(userData.validUser.username, userData.validUser.password);

        await loginPage.verifyURLContains('inventory.html');
    });

    test('Lab 2: Giả lập lỗi Server 500', async({page, loginPage}) => {
        await page.route('**/bolt-shirt-1200x1500-mR0ldpVS.jpg', async(route) => {
            route.fulfill({
                status: 500,
                contentType: 'text/plain',
                body: 'Internal Server Error - Server đang bảo trì'
            });
        });

        await loginPage.navigateTo();
        await loginPage.login(userData.validUser.username, userData.validUser.password);

        await loginPage.verifyURLContains('inventory.html');
    });

test('Mock fruit list API with custom data', async ({ page }) => {
        // 1. ĐẶT TRẠM GÁC: Bắt request gọi API lấy danh sách trái cây
        await page.route('*/**/api/v1/fruits', async (route) => {
            // Chuẩn bị dữ liệu giả mạo theo ý bạn
            const mockFruits = [
                { name: 'Sầu Riêng Ri6', id: 100 },
                { name: 'Xoài Cát Hòa Lộc', id: 101 },
                { name: 'Thanh Long Ruột Đỏ', id: 102 }
            ];

            // 2. Tự trả dữ liệu giả này về cho trình duyệt
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(mockFruits),
            });
        });

        // 3. Mở trang web demo của Playwright
        await page.goto('https://demo.playwright.dev/api-mocking');

        // 4. KIỂM CHỨNG: UI hiển thị đúng dữ liệu bạn vừa mock
        await expect(page.getByText('Sầu Riêng Ri6')).toBeVisible();
        await expect(page.getByText('Xoài Cát Hòa Lộc')).toBeVisible();
        await expect(page.getByText('Thanh Long Ruột Đỏ')).toBeVisible();
    });
});