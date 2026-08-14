import { expect, Page, Locator } from '@playwright/test';
import { BasePage } from '../pages/base-page';

export class CartPage extends BasePage {
    readonly checkoutBtn: Locator;
    readonly itemList: Locator;
    readonly cartLink: Locator;

    constructor(page: Page) {
        super(page);
        this.checkoutBtn = page.locator('[data-test="checkout"]');
        this.itemList = page.locator('.cart_item');
        this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    }

    async clickCart(){
        await this.cartLink.click();
    }

    async clickCheckout() {
        await this.checkoutBtn.click();
    }

    async verifyProductInCart(productName: string) {
        const targetProduct = this.itemList.filter({hasText: productName});
        await expect(targetProduct).toBeVisible();
    }
}