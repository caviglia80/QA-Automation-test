import { expect } from '@playwright/test';
import testData from '../fixtures/testData.json';

class SpecPage {
  constructor(page) {
    this.page = page;
    this.discountLabelInHome = '.onsale';  // discounted items in home
    this.discountLabelInPDP = 'div.product.type-product.sale > .onsale';  // discounted item in PDP
    this.productLink = '.woocommerce-LoopProduct-link';  // product links
    this.productList = '.products li';  // product list items
    this.additionalInfoTab = '#tab-title-additional_information a';
    this.additionalInfoContent = '#tab-additional_information';
    this.descriptionTab = '#tab-title-description a';
    this.descriptionContent = '#tab-description';
  }

  async goToHomePage() {
    await this.page.goto(testData.baseUrl);
    await this.page.waitForLoadState('load');
    expect(this.page.url(), `La página deberia dirigirse a ${testData.baseUrl}`).toBe(testData.baseUrl);
  }

  async home_clickFirstDiscountedItem() {
    await this.page.waitForLoadState('load');
    await this.page.waitForSelector(this.discountLabelInHome, { timeout: 10000 });
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

  async PDP_checkAdditionalInformation() {
    await this.page.waitForLoadState('load');
    await this.page.waitForSelector(this.additionalInfoTab, { timeout: 10000 }); // tab
    await this.page.click(this.additionalInfoTab);
    await this.page.waitForSelector(this.additionalInfoContent, { timeout: 10000 }); // content of tab
    const additionalInfoVisible = await this.page.isVisible(this.additionalInfoContent);
    expect(additionalInfoVisible, 'Informacion adicional deberia ser visible').toBeTruthy();
  }

  async home_clickFirstNonDiscountedItem() {
    await this.page.waitForLoadState('load');
    await this.page.waitForSelector(this.productList, { timeout: 10000 });
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
    expect(itemFound, 'Deberia haber al menos un articulo SIN descuento').toBeTruthy();
  }

  async PDP_verifyItemDiscount(mustExist) {
    await this.page.waitForLoadState('load');
    if (mustExist) await this.page.waitForSelector(this.discountLabelInPDP, { timeout: 10000 }); // no lo espero si se que no va a existir
    const discountCount = await this.page.locator(this.discountLabelInPDP).count();

    if (mustExist)
      expect(discountCount, 'Deberia haber un label de descuento en el producto').toBe(1);
    else
      expect(discountCount, 'No deberia haber ningun label de descuento en el producto').toBe(0);
  }

  async PDP_checkDescription() {
    await this.page.waitForLoadState('load');
    await this.page.waitForSelector(this.descriptionTab, { timeout: 10000 }); // tab
    await this.page.click(this.descriptionTab);
    await this.page.waitForSelector(this.descriptionContent, { timeout: 10000 }); // content of tab
    const descriptionVisible = await this.page.locator(this.descriptionContent).isVisible();
    expect(descriptionVisible, 'El contenido de la descripcion debe ser visible').toBeTruthy();
  }
}

export default SpecPage;
