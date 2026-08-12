import { Page, Locator, expect } from '@playwright/test'

export class BasePage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo(path: string = '') {
        await this.page.goto(`https://www.saucedemo.com/${path}`);
    }

    async verifyURLContains(keyword: string) {
        await expect(this.page).toHaveURL(new RegExp(keyword));
    }
} 