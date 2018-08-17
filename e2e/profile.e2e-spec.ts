import { browser, element, by, ElementFinder } from 'protractor';
import { describe } from 'selenium-webdriver/testing';
import { LoginPageObject} from './page-objects/login.page-object';
import {ProfilePageObject } from './page-objects/Profile.page-object'
import { protractor } from 'protractor/built/ptor';
import { Driver } from 'selenium-webdriver/chrome';

let profilePage = new ProfilePageObject();
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

export let bkRequestHB = () => {
    profilePage.getBkRequestHB().click();
    browser.driver.sleep(2000);
}

export let profileMenu = () =>{
    
    profilePage.getProfileMenu().click();
    browser.driver.sleep(2000);
    
}

export let updateBtn = () => {

    profilePage.getUpdateButton().click();
    browser.driver.sleep(2000);

}

export let updateAddress = () => {

    profilePage.getUpdateAddress().clear();
    browser.driver.sleep(1000);
    profilePage.getUpdateAddress().sendKeys('8 Jurong East Ave 2');
    browser.driver.sleep(1000);
    profilePage.getclkUpdate().click();
    browser.driver.sleep(2000);
    profilePage.getProfileUpdateOK().click();
    browser.driver.sleep(2000);
    
}

export let changePassword = () => {

    profilePage.getNewPassword().sendKeys('12345678');
    browser.driver.sleep(1000);
    profilePage.getPasswordConfirm().sendKeys('12345678');
    browser.driver.sleep(2000);
    profilePage.getUpdatePassword().click();
    browser.driver.sleep(2000);
    profilePage.getPasswordVerification().sendKeys('22222222');
    browser.driver.sleep(2000);
    profilePage.getConfirmBtn().click();
    browser.driver.sleep(4000);
    profilePage.getConfirmBtnOK().click();



}

describe('Profile Test Case', () =>{

    var originalTimeout
    
    browser.waitForAngularEnabled(false);
      profilePage.browseToPage();
      originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
      browser.waitForAngular();

    it('Update Profile status', () => {
        browser.driver.sleep(2000);
        welcomeLogin()
        browser.driver.sleep(2000);
        loginUserPass();
        browser.driver.sleep(4000);
        bkRequestHB();
        browser.driver.sleep(4000);
        profileMenu();
        browser.driver.sleep(2000);
        updateBtn();
        browser.driver.sleep(2000);
        updateAddress();
    });

    it('Change Password', () => {

        browser.driver.sleep(2000);
        changePassword();


    })


});