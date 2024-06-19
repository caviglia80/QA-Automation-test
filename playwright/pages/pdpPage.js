import BasePage from './basePage';
import { expect } from '@playwright/test';

class PDPPage extends BasePage {
    constructor(page) {
        super(page); // me aseguro de inicializar BasePage
        this.discountLabelInPDP = 'div.product.type-product.sale > .onsale';  // Label de descuento en el PDP

        this.additionalInfoTab = '#tab-title-additional_information a';
        this.additionalInfoContent = '#tab-additional_information';

        this.descriptionTab = '#tab-title-description a';
        this.descriptionContent = '#tab-description';
    }

    async checkAdditionalInformation() {
        await this.page.waitForLoadState('load');

        try {
            await this.page.waitForSelector(this.additionalInfoTab); // tab
        } catch (error) {
            throw new Error('No se encontró selector additionalInfoTab');
        }

        await this.page.click(this.additionalInfoTab);

        try {
            await this.page.waitForSelector(this.additionalInfoContent); // content of tab
        } catch (error) {
            throw new Error('No se encontró selector additionalInfoContent');
        }

        const additionalInfoVisible = await this.page.isVisible(this.additionalInfoContent);
        expect(additionalInfoVisible, 'Información adicional debería ser visible').toBeTruthy();
    }

    async verifyItemDiscount(mustExist) {
        await this.page.waitForLoadState('load');

        try {
            if (mustExist) await this.page.waitForSelector(this.discountLabelInPDP); // no lo espero si sé que no va a existir
        } catch (error) {
            throw new Error('No se encontró selector discountLabelInPDP');
        }

        const discountCount = await this.page.locator(this.discountLabelInPDP).count();

        if (mustExist)
            expect(discountCount, 'Debería haber un label de descuento en el producto').toBe(1);
        else
            expect(discountCount, 'No debería haber ningún label de descuento en el producto').toBe(0);
    }

    async checkDescription() {
        await this.page.waitForLoadState('load');

        try {
            await this.page.waitForSelector(this.descriptionTab); // tab
        } catch (error) {
            throw new Error('No se encontró selector descriptionTab');
        }

        await this.page.click(this.descriptionTab);

        try {
            await this.page.waitForSelector(this.descriptionContent); // content of tab
        } catch (error) {
            throw new Error('No se encontró selector descriptionContent');
        }

        const descriptionVisible = await this.page.locator(this.descriptionContent).isVisible();
        expect(descriptionVisible, 'El contenido de la descripción debe ser visible').toBeTruthy();
    }
}

export default PDPPage;
