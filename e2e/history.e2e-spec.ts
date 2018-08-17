import { browser, element, by, ElementFinder } from 'protractor';
import { describe } from 'selenium-webdriver/testing';
import { protractor } from 'protractor/built/ptor';
import {HistoryPageObject } from './page-objects/history.page-object'
import { LoginPageObject} from './page-objects/login.page-object';

let HistoryPage = new HistoryPageObject();
let loginPage = new LoginPageObject();


export let welcomeLogin = () =>{
    
    HistoryPage.getLoginBtn().click();

}

export let loginUserPass = () => {

    HistoryPage.getUsername().sendKeys('joshuahozy@gmail.com');
    HistoryPage.getPassword().sendKeys('22222222');
    browser.driver.sleep(800);
    HistoryPage.getLoginpBtn().click();


}

export let historyHB = () => {

    HistoryPage.getBkRequestHB().click();
    browser.driver.sleep(2000);
}

export let historyMenu = () => {

    HistoryPage.getHistoryMenu().click();
    browser.driver.sleep(2000);

}

export let firstHistory = () => {

    HistoryPage.getFirstHistory().click();
    browser.driver.sleep(2000);

}

export let ridersInfo = () => {

    HistoryPage.getRidersInfo().click();
    browser.driver.sleep(2000);

}


export let backBtn = () => {

    HistoryPage.getBackBtn().click();
    browser.driver.sleep(2000);

}

export let backBtnBooking =() => {

    HistoryPage.getBackBtnBooking().click();
    browser.driver.sleep(2000);

}


export let HistoryHB_HB = () => {

    
    HistoryPage.getHistoryHB().click();
    browser.driver.sleep(2000);

}

export let logout = () => {

    HistoryPage.getLogout().click();
    browser.driver.sleep(2000);

}

describe('History Test Case', () => {


    browser.waitForAngularEnabled(false);
      HistoryPage.browseToPage();
      browser.waitForAngular();

      it('direct to History Page', () => {
HistoryPage
        browser.driver.sleep(2000);
        welcomeLogin();
        browser.driver.sleep(2000);
        loginUserPass();
        browser.driver.sleep(2000);
        historyHB();
        browser.driver.sleep(4000);
        historyMenu();
        browser.driver.sleep(2000);
        expect<any>(HistoryPage.getHistoryPage().isPresent()).toBe(true);
        browser.driver.sleep(2000);
        firstHistory();
        browser.driver.sleep(2000);
        expect<any>(HistoryPage.getBookingInfoPage().isPresent()).toBe(true);
        browser.driver.sleep(2000)
        ridersInfo();
        browser.driver.sleep(2000)
        backBtn();
        browser.driver.sleep(2000);
        backBtnBooking();
        browser.driver.sleep(2000);
        HistoryHB_HB();
        browser.driver.sleep(2000);
        logout();
        
       
        

      



      })


})