import { browser, element, by, ElementFinder } from 'protractor';
import { describe } from 'selenium-webdriver/testing';
import { protractor } from 'protractor/built/ptor';
import { Driver } from 'selenium-webdriver/chrome';
import { ScheduleRequestPageObject } from './page-objects/scheduleRequest.page-object';
import { LoginPageObject } from './page-objects/login.page-object';
import { ridersInfo, backBtn } from './history.e2e-spec';



let scheduleRequestPage = new ScheduleRequestPageObject();
let loginPage = new LoginPageObject();
var until = protractor.ExpectedConditions;


export let Login = () => {

    browser.driver.sleep(4000);
    loginPage.getLoginBtn().click();
    browser.driver.sleep(2000)
    loginPage.getUsername().sendKeys('Joshuahozy@gmail.com');
    browser.driver.sleep(1000);
    loginPage.getPassword().sendKeys('12345678');
    browser.driver.sleep(2000);
    loginPage.getLoginpBtn().click();
    browser.driver.sleep(2000);


}

export let ScheduleHB = () => {

    scheduleRequestPage.getBKRequestHB().click();
    browser.driver.sleep(2000);

}

export let scheduleMenu = () => {

    scheduleRequestPage.getScheduleMenu().click();
    browser.driver.sleep(2000);

}

export let scheduleList = () => {

    scheduleRequestPage.getScheduleList().click();
    browser.driver.sleep(2000);

}

export let RiderInfo = () => {

    scheduleRequestPage.getRiderInfo().click();
    browser.driver.sleep(2000);

}

export let BackBtn = () => {

    scheduleRequestPage.getBackBtn().click();
    browser.driver.sleep(2000);

}

export let StartTrip = () => {

    scheduleRequestPage.getStartTrip().click();
    browser.driver.sleep(2000);

}

export let TrackingHB = () => {

    scheduleRequestPage.getTrackingHB().click();
    browser.driver.sleep(2000);

}

export let Logout = () => {

    scheduleRequestPage.getLogout().click();
    browser.driver.sleep(2000);

}

describe('Schedule Test Case', () => {

    browser.waitForAngularEnabled(false);
      scheduleRequestPage.browseToPage();

      it ('Redirect to Schedule Page', () => {

        Login();
        browser.driver.sleep(2000);
        ScheduleHB();
        browser.driver.sleep(2000);
        scheduleMenu();
        browser.driver.sleep(2000);

      });

      it('Show Booking Information', () => {

        scheduleList();
        browser.driver.sleep(2000);

      });

      it('Show Riders information and Start Trip', () => {

            ridersInfo();
            browser.driver.sleep(2000);
            BackBtn();
            browser.driver.sleep(2000);
            StartTrip();
            browser.driver.sleep(2000);
            TrackingHB();
            browser.driver.sleep(2000);
            Logout();
            browser.driver.sleep(2000);
            

      });
      
    
});