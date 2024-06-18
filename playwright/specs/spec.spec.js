import { test } from '@playwright/test';
import SpecPage from '../page_objects/specPage';

// alargo las esperas teniendo en cuenta que la pagina es muy lenta

test.describe('Second Scenario - Playwright', () => {
  test('Full Second Scenario', async ({ page }) => {
    const specPage = new SpecPage(page);

    //  1. Go to http://ecommerce.test.k6.io/ - 2. Access to the Home
    await specPage.goToHomePage();

    // 3. Press on the first article that has a discount applied to access to the PDP page and verify the article has a discount
    await specPage.home_clickFirstDiscountedItem();
    await specPage.PDP_verifyItemDiscount(true);

    // 4. Check the item has its proper "Additional information"
    await specPage.PDP_checkAdditionalInformation();

    // 5. Go back to the Home
    await specPage.goToHomePage();

    //  6. Press on the first article that doesn't have any discount applied to access to the PDP page and verify the article doesn't have a discounted price
    await specPage.home_clickFirstNonDiscountedItem();
    await specPage.PDP_verifyItemDiscount(false);

    // 7. Check the item has its proper "Description"
    await specPage.PDP_checkDescription();
  });
});
