import { browser, element, by, ElementFinder } from 'protractor';
import { describe } from 'selenium-webdriver/testing';
//import { LoginPageObject} from './page-objects/login.page-object';
import { BookingRequestPageObject } from './page-objects/bookingRequest.page-object';
import { protractor } from 'protractor/built/ptor';
import{ LoginPageObject } from './page-objects/login.page-object';

let bookingPage = new BookingRequestPageObject();
let loginPage = new LoginPageObject();
var until = protractor.ExpectedConditions;


export let login = () =>{
    bookingPage.getLoginBtn().click();
    browser.driver.sleep(2000);
    bookingPage.getUsername().sendKeys('joshuahozy@gmail.com');
    browser.driver.sleep(2000);
    bookingPage.getPassword().sendKeys('22222222');
    browser.driver.sleep(2000);
    bookingPage.getLoginpBtn().click();
    browser.driver.sleep(2000);
};

export let bookingList = () => {
    bookingPage.getBookingList().click();
    browser.driver.sleep(4000);
};

export let ridersInfo = () =>{
    
    bookingPage.getRiderInfo().click();
    browser.driver.sleep(2000);
};


export let backBtn = () => {

    bookingPage.getBackBtn().click();
    browser.driver.sleep(2000);
};

export let acceptBooking = () => {

    bookingPage.getAcceptBooking().click();
    browser.driver.sleep(2000);
    bookingPage.getAcceptYes().click();

}

export let logout = () => {
    browser.driver.sleep(2000);
    bookingPage.getScheduleHB().click();
    browser.driver.sleep(2000);
    bookingPage.getLogoutBtn().click();

}



describe('booking Request', () => {

    browser.waitForAngularEnabled(false);
      bookingPage.browseToPage();
    

    it('See Booking Request', () => {

        login();
        browser.driver.sleep(2000);
        bookingList();
        browser.driver.sleep(2000);
        expect<any>(bookingPage.getBookingInfoPage().isPresent()).toBe(true);
      //  browser.driver.sleep(2000)
    });

    it('Booking Info', () => {

        ridersInfo();
        browser.driver.sleep(2000);
        
    })

    it('Accept the Booking', () =>{

        backBtn();
        browser.driver.sleep(2000);
        expect<any>(bookingPage.getBookingInfoPage().isPresent()).toBe(true);
        acceptBooking();
        browser.driver.sleep(2000);
        expect<any>(bookingPage.getSchedulePage().isPresent()).toBe(true);  
        browser.driver.sleep(2000);
        logout();
        browser.driver.sleep(2000);
        

    })
    

});

