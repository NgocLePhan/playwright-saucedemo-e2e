import { test, expect } from '@playwright/test';
import { AppDatabase } from '../utils/db-client';

test.describe('DATABASE DATA INTEGRITY VERIFICATION', () => {
    let db: AppDatabase;

    test.beforeAll(async () => {
        db = new AppDatabase();
        await db.init();
    });

    test.afterAll(() => {
        db.close();
    });

    test('TC01: Verify price and product name on the UI against the database @db', async ({ page }) => {
        await page.goto('/');

        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');

        // 1. Lấy thông tin sản phẩm đầu tiên trên giao diện UI
        const firstItem = page.locator('.inventory_item').first();
        const uiProductName = await firstItem.locator('.inventory_item_name').innerText();
        const uiProductPriceText = await firstItem.locator('.inventory_item_price').innerText();
        const uiProductPrice = parseFloat(uiProductPriceText.replace('$', ''));

        console.log(`\n🔍 [UI Data]: Tên sản phẩm = "${uiProductName}", Giá = $${uiProductPrice}`);

        // 2. Thực hiện truy vấn trực tiếp vào Database
        const dbProduct = db.getProductByName(uiProductName);

        console.log(`🗄️ [DB Data]: ID = ${dbProduct?.id}, Tên = "${dbProduct?.name}", Giá = $${dbProduct?.price}, Tồn kho = ${dbProduct?.stock}`);

        // 3. Assert đối soát tính toàn vẹn dữ liệu (Data Integrity Check)
        expect(dbProduct).toBeDefined();
        expect(uiProductName).toBe(dbProduct?.name);
        expect(uiProductPrice).toBe(dbProduct?.price);
    });

});