import {test, expect} from '../src/fixtures/page-fixture'

test.use({storageState: '.auth/user.json'});

test.describe('Check product with ASSERTIONS & TEST.STEP', () => {
    test('TC01: Kiểm tra thông tin danh mục sản phẩm @regression', async({page}) => {
        await test.step('Bước 1: Điều hướng trực tiếp vào trang Inventory', async() => {
            await page.goto('https://www.saucedemo.com/inventory.html');
            await expect(page).toHaveURL(/.*inventory.html/);
        });

        await test.step('Bước 2: Xác thực tiêu đề trang và tổng số lượng sản phẩm', async() => {
            await expect.soft(page.locator('.header_secondary_container .title')).toHaveText('Products');
            await expect.soft(page.locator('.inventory_item')).toHaveCount(6);
        });

        await test.step('Bước 3: Xác thực thông tin chi tiết của sản phẩm đầu tiên (Tên & Giá)', async() => {
            const firstItemName = page.locator('.inventory_item_name').first();
            const firstItemPrice = page.locator('.inventory_item_price').first();

            // Dùng soft assertions để gom toàn bộ lỗi nếu có
            await expect.soft(firstItemName).toHaveText('Sauce Labs Backpack');
            await expect.soft(firstItemPrice).toHaveText('$29.99');
        });
    });
})