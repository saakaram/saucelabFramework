# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: saucedemo\cartpage.spec.ts >> Cart page tests >> remove product from cart and verify cart count
- Location: tests\saucedemo\cartpage.spec.ts:27:9

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.textContent: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('.shopping_cart_badge')

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]: Swag Labs
  - generic [ref=e5]:
    - generic [ref=e9]:
      - textbox "Username" [ref=e11]
      - textbox "Password" [ref=e13]
      - button "Login" [ref=e15] [cursor=pointer]
    - generic [ref=e17]:
      - generic [ref=e18]:
        - heading "Accepted usernames are:" [level=4] [ref=e19]
        - text: standard_user
        - text: locked_out_user
        - text: problem_user
        - text: performance_glitch_user
        - text: error_user
        - text: visual_user
      - generic [ref=e20]:
        - heading "Password for all users:" [level=4] [ref=e21]
        - text: secret_sauce
```

# Test source

```ts
  1   | import { Page, Locator } from '@playwright/test';
  2   | import { BasePage } from './basePage';
  3   | 
  4   | export class ProductPage extends BasePage {
  5   | 
  6   |     private productTitle:Locator;
  7   |     private productName:Locator;
  8   |     private productDesc:Locator;
  9   |     private productPrice:Locator;
  10  |     private addToCartButton:Locator;
  11  |     private removeFromCartButton:Locator;
  12  |     private shoppoingCartIcon:Locator;
  13  |     private hamburgerMenu:Locator;
  14  |     private logoutButton:Locator;
  15  |     private productList:Locator;
  16  |     private cartItemCount:Locator;
  17  |     private productSortDropdown: Locator;
  18  |     private shoppingCartIcon: Locator;
  19  | 
  20  |     constructor (page:Page){
  21  |         super(page);
  22  |         this.productTitle = page.locator('.title');
  23  |         //this.productTitle = page.getByText('Products'); //.class value
  24  |         this.productName = page.locator('.inventory-item-name');
  25  |         this.productDesc = page.locator('.inventory_item_desc');
  26  |         this.productPrice = page.locator('.inventory_item_price');
  27  |         this.addToCartButton = page.getByText('Add to cart');
  28  |         this.removeFromCartButton = page.getByText('.Remove');
  29  |         this.shoppoingCartIcon = page.locator('.shopping_cart_link');
  30  |         this.hamburgerMenu = page.locator('#react-burger-menu-btn');
  31  |         this.logoutButton = page.getByRole('link',{name:'Logout'});
  32  |         this.productList = page.locator('.inventory_item');
  33  |         this.cartItemCount = page.locator('.shopping_cart_badge');
  34  |         this.productSortDropdown = page.locator('.product_sort_container');
  35  |         this.shoppingCartIcon = page.locator('.shopping_cart_link');
  36  |     }
  37  | 
  38  |      //chck product page is loaded by checking the title
  39  |     async isProductPageLoaded(): Promise<boolean> {
  40  |         const txt = await this.productTitle.textContent();
  41  |         return txt?.trim() === 'Products';
  42  |     }
  43  | 
  44  |     //add products by index (0,1,2...)
  45  |     async addProductToCartByIndex(index: number) {
  46  |          const addButtons = await this.addToCartButton.elementHandles(); 
  47  |         if (index < addButtons.length) {
  48  |             await addButtons[index].click();
  49  |         } else {
  50  |             throw new Error(`Product index ${index} is out of bounds`);
  51  |         }
  52  |     }
  53  | 
  54  |     //add product by name
  55  |     async addProductToCartByName(productName: string) {
  56  |     const product = this.page
  57  |         .locator('.inventory_item')
  58  |         .filter({ hasText: productName });
  59  | 
  60  |     await product.getByRole('button', { name: 'Add to cart' }).click();
  61  |     }
  62  | 
  63  |      //remove product by name
  64  |   async removeProductFromCartByName(productName: string) {
  65  |     const product = this.page
  66  |         .locator('.inventory_item')
  67  |         .filter({ hasText: productName });
  68  | 
  69  |     await product.getByRole('button', { name: 'Remove' }).click();
  70  | }
  71  |     //add all products
  72  |     async addAllProductsToCart() {
  73  |         const addButtons = await this.addToCartButton.elementHandles();
  74  |         const count = addButtons.length;
  75  |         for (let i = 0; i < count; i++) {
  76  |             await addButtons[i].click();
  77  |         }
  78  |     }
  79  | 
  80  |     //navigate to cart page
  81  |     async goToCart() {
  82  |         await this.shoppingCartIcon.click();
  83  |     }
  84  | 
  85  |     //get product count in cart
  86  |     async getCartItemCount(): Promise<number> {
> 87  |         const countText = await this.cartItemCount.textContent();
      |                                                    ^ Error: locator.textContent: Test timeout of 30000ms exceeded.
  88  |         return countText ? parseInt(countText.trim()) : 0;
  89  |     }   
  90  | 
  91  |      //logout from application
  92  |     async logout() {
  93  |         await this.hamburgerMenu.click();
  94  |         await this.logoutButton.click();
  95  |     }
  96  | 
  97  |     async getPoductCount(): Promise<number> {   
  98  |         return await this.productList.count();
  99  |     }
  100 | 
  101 |     async sortProductsBy(option: string) {
  102 |        
  103 |         await this.productSortDropdown.selectOption({ label: option });
  104 |     }
  105 | 
  106 |     async getProductPrices(): Promise<number[]> {
  107 |         const priceElements = await this.productPrice.elementHandles();
  108 |         const prices = [];
  109 |         for (const element of priceElements) {
  110 |             const priceText = await element.textContent();
  111 |             if (priceText) {
  112 |                 const price = parseFloat(priceText.replace('$', '').trim());
  113 |                 prices.push(price);
  114 |             }
  115 |         }
  116 |         return prices;
  117 |     }   
  118 |     
  119 | }
  120 | 
  121 | 
```