import BasePage from './basePage';
import { expect } from '@playwright/test';

class HomePage extends BasePage {
    constructor(page) {
        super(page); // me aseguro de inicializar BasePage
        this.discountLabelInHome = '.onsale';  // Label de descuentos en home

        this.productLink = '.woocommerce-LoopProduct-link';  // Link del producto
        this.productList = '.products li';  // Lista de los productos
    }

    async clickFirstDiscountedItem() {
        await this.page.waitForLoadState('load');

        try {
            await this.page.waitForSelector(this.discountLabelInHome);
        } catch (error) {
            throw new Error('No se encontró selector discountLabelInHome');
        }

        const items = await this.page.$$(this.productList); // listamos todos los productos
        let itemFound = false;
        for (let item of items) {
            const discountElement = await item.$(this.discountLabelInHome);
            if (discountElement) {
                const productLinkElement = await item.$(this.productLink);
                await productLinkElement.click();
                itemFound = true;
                break;
            }
        }
        expect(itemFound, 'Deberia haber al menos un articulo CON descuento').toBeTruthy();
    }

    async clickFirstNonDiscountedItem() {
        await this.page.waitForLoadState('load');

        try {
            await this.page.waitForSelector(this.productList);
        } catch (error) {
            throw new Error('No se encontró selector productList');
        }

        const items = await this.page.$$(this.productList); // listamos todos los productos
        let itemFound = false;
        for (let item of items) {
            const discountElement = await item.$(this.discountLabelInHome);
            if (!discountElement) {
                const productLinkElement = await item.$(this.productLink);
                await productLinkElement.click();
                itemFound = true;
                break;
            }
        }
        expect(itemFound, 'Debería haber al menos un artículo SIN descuento').toBeTruthy();
    }
}

export default HomePage;
