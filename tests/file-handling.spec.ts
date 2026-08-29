import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

test.describe('XỬ LÝ FILE UPLOAD & DOWNLOAD', () => {

    test('TC01: Upload file đơn thành công @regression', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/upload');

        const filePath = path.join(__dirname, 'data/sample.txt');

        await page.locator('#file-upload').setInputFiles(filePath);
        await page.locator('#file-submit').click();

        await expect(page.locator('h3')).toHaveText('File Uploaded!');
        await expect(page.locator('#uploaded-files')).toContainText('sample.txt');
    });

    test('TC02: Download file và xác nhận file tồn tại trên ổ cứng @regression', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/download');

        const [download] = await Promise.all([
            page.waitForEvent('download'),
            page.locator('.example a').first().click(),
        ]);

        const downloadFolder = path.join(__dirname, 'downloads');
        const downloadFilePath = path.join(downloadFolder, download.suggestedFilename());

        if (!fs.existsSync(downloadFolder)) {
            fs.mkdirSync(downloadFolder, { recursive: true });
        }
        await download.saveAs(downloadFilePath);

        expect(fs.existsSync(downloadFilePath)).toBeTruthy();
    });
});