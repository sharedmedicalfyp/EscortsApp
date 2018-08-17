import { browser, element, by, ElementFinder } from 'protractor';
import { EMLINK } from 'constants';

export class LoginPageObject{

    browseToPage(){


        browser.get('');
        browser.driver.sleep(500);


    }

    getBookingPage(){

        return element(by.xpath('/html/body/ion-app/ng-component/ion-nav/page-booking-requests/ion-content/div[2]/calendar/div'));

    }

    getLoginBtn(){
        
        return element(by.id('Log'));

    }

    getUsername(){

        return element(by.xpath('//*[@id="mail"]/input'));

    }

    getPassword(){

        return element(by.xpath('/html/body/ion-app/ng-component/ion-nav/page-login/ion-content/div[2]/ion-list/ion-item[3]/div[1]/div/ion-input/input'));


    }

    getLoginpBtn(){

        return element(by.xpath('//*[@id="loginn"]/span'));

    }

    getHamburgerLogout() {

        return element(by.xpath('/html/body/ion-app/ng-component/ion-nav/page-booking-requests/ion-header/ion-navbar/button[2]'));


    }

    getLogoutBtn(){

        return element(by.xpath('/html/body/ion-app/ng-component/ion-menu/div/ion-content/div[2]/ion-list/ion-item/div[1]/div/ion-label'));

    }

    


}
