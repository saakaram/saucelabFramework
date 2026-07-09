import { Locator, Page } from '@playwright/test';
import { getCredentials } from '../utils/auth';
import { BasePage } from './basePage';


export class LoginPage extends BasePage {

    private userNameInput:Locator;
    private passwordInput:Locator;
    private loginButton:Locator;
    private swaglabsLogo:Locator;
    private errorMessage:Locator;

    constructor (page:Page){
        super(page);
        this.userNameInput = page.locator('#user-name'); //#idvalue or [attributenam='attributevalue']
        // this.usernameInput = page.getByPlaceholder('Username')
        
        this.passwordInput = page.locator('#password');
        
        //this.loginButton = page.getByRole('button',{name:'Login'});
        this.loginButton = page.locator('#login-button');

        this.swaglabsLogo = page.locator('.login_logo'); 
        //.classvalue or [attributenam='attributevalue']
        // this.swaglabsLogo = page.getByText('Swag Labs');

        //this.errorMessage =  page.locator('[data-test="error"]');
        // this.errorMessage = this.page.locator('div.error-message-container.error');
        //this.errorMessage = page.getByRole('heading', { name: 'Epic sadface: Username is required' });
        this.errorMessage = this.page.getByRole('heading', { level: 3 });
    }

    async loginAs(userType:string) {
        const loginCredentials = getCredentials(userType);
        await this.userNameInput.fill(loginCredentials.username);
        await this.passwordInput.fill(loginCredentials.password);
        await this.loginButton.click();
    }

    async isLogoVisible(): Promise<boolean> {
        return await this.swaglabsLogo.isVisible();
    }

    async getErrorMessage(): Promise<string | null> {
        return await this.errorMessage.textContent();
    }
}
