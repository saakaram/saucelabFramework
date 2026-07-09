# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: saucedemo\login.spec.ts >> Login Tests >> should show error with locked out credentials
- Location: tests\saucedemo\login.spec.ts:16:9

# Error details

```
TypeError: received is not iterable
```

```
Error: locator.textContent: Test ended.
Call log:
  - waiting for getByRole('heading', { name: 'Epic sadface: Username is required' })

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
  1  | import { Page, Locator } from '@playwright/test';
  2  | import { BasePage } from './basePage';
  3  | import { getCredentials } from '../utils/auth';
  4  | 
  5  | export class LoginPage extends BasePage {
  6  | 
  7  |     private userNameInput:Locator;
  8  |     private passwordInput:Locator;
  9  |     private loginButton:Locator;
  10 |     private swagLabLogo:Locator;
  11 |     private errorMessage:Locator;
  12 |     //private errorMsgInvalid:Locator;
  13 | 
  14 |     constructor (page:Page){
  15 |         super(page);
  16 |         this.userNameInput = page.locator('#user-name');
  17 |         this.passwordInput = page.locator('#password');
  18 |         this.loginButton = page.getByRole('button',{name:'Login'});
  19 |         //this.errorMessage =  page.locator('[data-test="error"]');
  20 |         this.errorMessage = page.getByRole('heading', { name: 'Epic sadface: Username is required' });
  21 |         this.swagLabLogo = page.locator('.login_logo');
  22 |     }
  23 | 
  24 |     async loginAs(userType:string) {
  25 |         const loginCredentials = getCredentials(userType);
  26 |         await this.userNameInput.fill(loginCredentials.username);
  27 |         await this.passwordInput.fill(loginCredentials.password);
  28 |         await this.loginButton.click();
  29 |     }
  30 | 
  31 |     async isLogoVisible(): Promise<boolean> {
  32 |         return await this.swagLabLogo.isVisible();
  33 |     }
  34 | 
  35 |     async getErrorMessage(): Promise<string | null> {
> 36 |         return await this.errorMessage.textContent();
     |                                        ^ Error: locator.textContent: Test ended.
  37 |     }
  38 | }
  39 | 
```