import { expect, Page, Locator } from '@playwright/test';
import { BasePage } from '../pages/base-page';

export class CheckoutPage extends BasePage {
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly zipCode: Locator;
    readonly continueBtn: Locator;
    readonly finishBtn: Locator;
    readonly notice: Locator;
    readonly error: Locator;

    constructor(page: Page) {
        super(page);
        this.firstName = page.locator(`[data-test="firstName"]`);
        this.lastName = page.locator(`[data-test="lastName"]`);
        this.zipCode = page.locator(`[data-test="postalCode"]`);
        this.continueBtn = page.locator(`[data-test="continue"]`);
        this.finishBtn = page.locator(`[data-test="finish"]`);
        this.notice = page.locator(`.complete-header`);
        this.error = page.locator(`[data-test="error"]`);
    }

    async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.zipCode.fill(postalCode);
        await this.continueBtn.click();
    }

    async clickFinish() {
        await this.finishBtn.click();
    }

    async verifyOrderSuccess(noticeText: string) {
        await expect(this.notice).toHaveText(noticeText);
    }

    async verifyErrorMessage(expectedError: string){
        await expect(this.error).toHaveText(expectedError);
    }
}