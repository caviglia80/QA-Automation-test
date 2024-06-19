import { test } from '@playwright/test';
import HomePage from '../pages/homePage';
import PDPPage from '../pages/pdpPage';

test.describe('Second Scenario - Playwright', () => {
  test('Full Second Scenario', async ({ page }) => {
    const homePage = new HomePage(page);
    const pdpPage = new PDPPage(page);

    //  1. Go to http://ecommerce.test.k6.io/ - 2. Access to the Home
    await homePage.goToHomePage();

    // 3. Press on the first article that has a discount applied to access to the PDP page and verify the article has a discount
    await homePage.clickFirstDiscountedItem();
    await pdpPage.verifyItemDiscount(true);

    // 4. Check the item has its proper "Additional information"
    await pdpPage.checkAdditionalInformation();

    // 5. Go back to the Home
    await homePage.goToHomePage();

    //  6. Press on the first article that doesn't have any discount applied to access to the PDP page and verify the article doesn't have a discounted price
    await homePage.clickFirstNonDiscountedItem();
    await pdpPage.verifyItemDiscount(false);

    // 7. Check the item has its proper "Description"
    await pdpPage.checkDescription();
  });
});
