# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: saucedemo\login.spec.ts >> Login Tests >> should show error with invalid credentials
- Location: tests\saucedemo\login.spec.ts:24:9

# Error details

```
TypeError: received is not iterable
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]: Swag Labs
  - generic [ref=e5]:
    - generic [ref=e9]:
      - textbox "Username" [ref=e11]: invalid_username
      - textbox "Password" [active] [ref=e13]: invalid_password
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
  21 |       await expect(loginPage.getErrorMessage()).toContain('locked out');
  22 |     }); 
  23 | 
  24 |     test('should show error with invalid credentials', {
  25 |     tag: ['@sanity', '@invalidlogin'],
  26 |   },async ({ loginPage }) => {
  27 |          await loginPage.navigateTo();
  28 |         await loginPage.loginAs('INVALID_USER');
> 29 |         await expect(loginPage.getErrorMessage()).toContain('Username and password do not match');
     |                                                   ^ TypeError: received is not iterable
  30 |     });
  31 | });  
```