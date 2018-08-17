import { browser, element, by, ElementFinder } from 'protractor';

export class BookingRequestPageObject{


    browseToPage(){

        browser.get('');
        browser.driver.sleep(500);


    }

    getLoginBtn(){
        
        return element(by.xpath('//*[@id="Log"]'));

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

    getBooking() {

        return element(by.xpath('/html/body/ion-app/ng-component/ion-nav/page-booking-requests/ion-content/div[2]/calendar/div/monthview/div/ion-list/ion-item/div[1]/div/ion-label'));

    };

    getBookingList() {

        return element(by.xpath('/html/body/ion-app/ng-component/ion-nav/page-booking-requests/ion-content/div[2]/calendar/div/monthview/div/ion-list/ion-item'));
    }

    getRiderInfo() {

        return element(by.xpath('/html/body/ion-app/ng-component/ion-nav/page-singlebook/ion-content/div[2]/ion-list/form/ion-row/ion-col[1]/button/span'));

    }

    getBackBtn() {

        return element(by.xpath('/html/body/ion-app/ng-component/ion-nav/page-riders-info/ion-header/ion-navbar/button'));

    }

    getAcceptBooking() {

        return element(by.xpath('/html/body/ion-app/ng-component/ion-nav/page-singlebook/ion-content/div[2]/ion-list/form/ion-row/ion-col[2]/button/span'));
    }

    getAcceptYes() {

        return element(by.xpath('/html/body/ion-app/ion-alert/div/div[3]/button[1]/span'));

    }
    getBookingInfoPage() {

        return element(by.xpath('/html/body/ion-app/ng-component/ion-nav/page-singlebook/ion-content/div[2]'));

    }

    getSchedulePage() {

        return element(by.xpath('/html/body/ion-app/ng-component/ion-nav/page-my-schedule/ion-content/div[2]/calendar/div'));

    }

    getScheduleHB() {

        return element(by.xpath('/html/body/ion-app/ng-component/ion-nav/page-my-schedule/ion-header/ion-navbar/button[2]'));

    }

    getLogoutBtn(){

        return element(by.xpath('/html/body/ion-app/ng-component/ion-menu/div/ion-content/div[2]/ion-list/ion-item/div[1]/div/ion-label'));

    }

  



}