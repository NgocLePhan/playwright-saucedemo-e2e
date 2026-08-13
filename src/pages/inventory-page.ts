import {Page, Locator, expect} from '@playwright/test';
import {BasePage} from './base-page';

export class InventoryPage extends BasePage{
    readonly title: Locator;
    readonly shoppingBadge: Locator;
    readonly item: Locator

    constructor(page: Page){
        super(page);
        this.title = page.locator('.title');
        this.shoppingBadge = page.locator('.shopping_cart_badge');
        this.item = page.locator('.inventory_item')
    }

    async verifyPageLoaded(){
        await expect(this.title).toHaveText("Products");
    }

    async addItemToCartByName(productName: string){
        const productItem = this.item.filter({hasText: productName});
        await productItem.locator('button').click();
    }

    async getCartBadgeCount(){
        return await this.shoppingBadge.innerText();
    }
}