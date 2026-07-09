# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: saucedemo\login.spec.ts >> Login Tests >> should show error with locked out credentials
- Location: tests\saucedemo\login.spec.ts:16:9

# Error details

```
Error: toContainText can be only used with Locator object, was called with Promise Promise { <pending> }
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]: Swag Labs
  - generic [ref=e5]:
    - generic [ref=e9]:
      - generic [ref=e10]:
        - textbox "Username" [ref=e11]: locked_out_user
        - img [ref=e12]
      - generic [ref=e14]:
        - textbox "Password" [ref=e15]: secret_sauce
        - img [ref=e16]
      - 'heading "Epic sadface: Sorry, this user has been locked out." [level=3] [ref=e19]':
        - button [ref=e20] [cursor=pointer]:
          - img [ref=e21]
        - text: "Epic sadface: Sorry, this user has been locked out."
      - button "Login" [active] [ref=e23] [cursor=pointer]
    - generic [ref=e25]:
      - generic [ref=e26]:
        - heading "Accepted usernames are:" [level=4] [ref=e27]
        - text: standard_user
        - text: locked_out_user
        - text: problem_user
        - text: performance_glitch_user
        - text: error_user
        - text: visual_user
      - generic [ref=e28]:
        - heading "Password for all users:" [level=4] [ref=e29]
        - text: secret_sauce
```

# Test source

```ts
  1  | 
  2  | import {test,expect} from '../../fixtures/fixture';
  3  | 
  4  | test.describe('Login Tests', () => {
  5  |     test('should login with valid credentials', {
  6  |     tag: ['@smoke', '@validlogin'],
  7  |   },async ({ loginPage, productPage }) => {
  8  |     
  9  |         await loginPage.navigateTo(); // Navigate to the login pageFactory
  10 |         await loginPage.loginAs('STANDARD_USER');
  11 |         await expect(productPage.isProductPageLoaded()).toBeTruthy();
  12 |         //logout from the application
  13 |         await productPage.logout();
  14 |     });
  15 | 
  16 |     test('should show error with locked out credentials',{
  17 |     tag: ['@regression', '@lockedout'],
  18 |   }, async ({ loginPage }) => {
  19 |         await loginPage.navigateTo();
  20 |        await loginPage.loginAs('LOCKED_OUT_USER');
> 21 |       await expect(loginPage.getErrorMessage()).toContainText('locked out');
     |                                                 ^ Error: toContainText can be only used with Locator object, was called with Promise Promise { <pending> }
  22 |       //await expect(loginPage.getErrorMessage()).toContain('locked out');
  23 |     }); 
  24 | 
  25 |     test('should show error with invalid credentials', {
  26 |     tag: ['@sanity', '@invalidlogin'],
  27 |   },async ({ loginPage }) => {
  28 |          await loginPage.navigateTo();
  29 |         await loginPage.loginAs('INVALID_USER');
  30 |         await expect(loginPage.getErrorMessage()).toContainText('Username and password do not match');
  31 |         //await expect(loginPage.getErrorMessage()).toContain('Username and password do not match');
  32 |     });
  33 | });  
```