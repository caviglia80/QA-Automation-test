import { expect } from '@playwright/test';
import testData from '../fixtures/testData.json';

class BasePage {
    constructor(page) {
        this.page = page;
    }

    async goToHomePage() {
        await this.page.goto(testData.baseUrl);
        await this.page.waitForLoadState('load');
        expect(this.page.url(), `La página debería dirigirse a ${testData.baseUrl}`).toBe(testData.baseUrl);
    }
}

export default BasePage;
