import { browser, element, by, ElementFinder } from 'protractor';
import { describe } from 'selenium-webdriver/testing';
import { LoginPageObject} from './page-objects/login.page-object';
import { protractor } from 'protractor/built/ptor';


let loginPage = new LoginPageObject();


export let welcomeLogin = () =>{
    
    loginPage.getLoginBtn().click();

}

export let loginUserPass = () => {

    loginPage.getUsername().sendKeys('joshuahozy@gmail.com');
    loginPage.getPassword().sendKeys('22222222');
    browser.driver.sleep(800);
    loginPage.getLoginpBtn().click();


}

export let logout = () => {
    browser.driver.sleep(2000);
    loginPage.getHamburgerLogout().click();
    browser.driver.sleep(2000);
    loginPage.getLogoutBtn().click();

}


describe('Login Test Case', () => {

    browser.waitForAngularEnabled(false);

    beforeEach(() => {
      loginPage.browseToPage();
      browser.waitForAngular();
    });

    it('Login to Booking Page', () => {

        browser.driver.sleep(2000);

        welcomeLogin();
        browser.driver.sleep(2000);
        loginUserPass();
        browser.driver.sleep(2000);

        //Ensure Booking Page is Visible 
        expect<any>(loginPage.getBookingPage().isPresent()).toBe(true);

        browser.driver.sleep(2000);

        logout();

 });
            
    });

    






