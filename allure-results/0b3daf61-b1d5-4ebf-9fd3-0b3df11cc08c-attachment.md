# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: saucedemo\login.spec.ts >> Login Tests >> should login with valid credentials
- Location: tests\saucedemo\login.spec.ts:5:9

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.textContent: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('.title')

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]: Swag Labs
  - generic [ref=e5]:
    - generic [ref=e9]:
      - textbox "Username" [ref=e11]: standard_user
      - textbox "Password" [active] [ref=e13]: secret_sauce
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
  1  | import { Page, Locator } from '@playwright/test';
  2  | import { BasePage } from './basePage';
  3  | 
  4  | export class ProductPage extends BasePage {
  5  | 
  6  |     private productTitle:Locator;
  7  |     private productName:Locator;
  8  |     private productDesc:Locator;
  9  |     private productPrice:Locator;
  10 |     private addToCartButton:Locator;
  11 |     private removeFromCartButton:Locator;
  12 |     private shoppoingCartIcon:Locator;
  13 |     private hamburgerMenu:Locator;
  14 |     private logoutButton:Locator;
  15 |     private ProductList:Locator;
  16 |     private cartItemCount:Locator;
  17 |     private productSortDropdown: Locator;
  18 | 
  19 |     constructor (page:Page){
  20 |         super(page);
  21 |         this.productTitle = page.locator('.title');
  22 |         //this.productTitle = page.getByText('Products'); //.class value
  23 |         this.productName = page.locator('.inventory-item-name');
  24 |         this.productDesc = page.locator('.inventory_item_desc');
  25 |         this.productPrice = page.locator('.inventory_item_price');
  26 |         this.addToCartButton = page.getByText('Add to cart');
  27 |         this.removeFromCartButton = page.getByText('.Remove');
  28 |         this.shoppoingCartIcon = page.locator('.shopping_cart_link');
  29 |         this.hamburgerMenu = page.locator('#react-burger-menu-btn');
  30 |         this.logoutButton = page.getByRole('link',{name:'Logout'});
  31 |         this.ProductList = page.locator('.inventory_item');
  32 |         this.cartItemCount = page.locator('.shopping_cart_badge');
  33 |         this.productSortDropdown = page.locator('.product_sort_contaoner');
  34 |     }
  35 | 
  36 |      //chck product page is loaded by checking the title
  37 |     async isProductPageLoaded(): Promise<boolean> {
> 38 |         const txt = await this.productTitle.textContent();
     |                                             ^ Error: locator.textContent: Test timeout of 30000ms exceeded.
  39 |         return txt?.trim() === 'Products';
  40 |     }
  41 | 
  42 |      //logout from application
  43 |     async logout() {
  44 |         await this.hamburgerMenu.click();
  45 |         await this.logoutButton.click();
  46 |     }
  47 | }
  48 | 
  49 | 
```