import {test,expect} from '../../fixtures/fixture';

test.describe('Cart page tests', () => {

    test.beforeEach(async ({ loginPage,productPage,cartPage }) => {
        await loginPage.navigateTo();
        await loginPage.loginAs('STANDARD_USER');
        
        // ensure we are on product page
        await expect(productPage.isProductPageLoaded).toBeTruthy();
        await productPage.addProductToCartByName('Sauce Labs Bolt T-Shirt');
        const cartCount = await productPage.getCartItemCount();
        console.log("cart count value:", cartCount);
        await expect(cartCount).toBeGreaterThan(0);
        await productPage.goToCart();
        await expect(await cartPage.isCartPageLoaded()).toBeTruthy();

    });

  test('click on continue shopping button and verify navigation to product page', async ({ productPage,cartPage }) => {
        //await productPage.goToCart();
        //await expect(await cartPage.isCartPageLoaded()).toBeTruthy();
        await cartPage.clickContinueShoppingButton();
        await expect(productPage.isProductPageLoaded()).toBeTruthy();
    });


    test.only('remove product from cart and verify cart count', async ({ productPage,cartPage }) => {
        //await productPage.goToCart();
        //await expect(await cartPage.isCartPageLoaded()).toBeTruthy();
        await cartPage.removeProductFromCart('Sauce Labs Bolt T-Shirt');
        const cartCount = await productPage.getCartItemCount();
        console.log("Inside remove product:",cartCount);
        await expect(cartCount).toBe(0);
        await cartPage.clickContinueShoppingButton();
        await expect(productPage.isProductPageLoaded()).toBeTruthy();
    });

    test('click on checkout button and verify navigation to checkout page', async ({ productPage,cartPage,checkoutPage }) => {
        //await productPage.goToCart();
        //await expect(await cartPage.isCartPageLoaded()).toBeTruthy();
        await cartPage.clickCheckoutButton();
        await expect(checkoutPage.isCheckoutPageDisplayed()).toBeTruthy();
    });

     test.afterEach(async ({ productPage }) => {
            await productPage.logout();
        });

});