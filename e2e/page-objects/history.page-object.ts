import { browser, element, by, ElementFinder } from 'protractor';



export class HistoryPageObject{

    browseToPage(){
        
        browser.get('');
        browser.driver.sleep(500);

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


    getBkRequestHB() {

        return element(by.xpath('/html/body/ion-app/ng-component/ion-nav/page-booking-requests/ion-header/ion-navbar/button[2]'));

    }

    getHistoryMenu() {

        return element(by.xpath('/html/body/ion-app/ng-component/ion-menu/div/ion-content/div[2]/ion-list/button[4]/div[1]/div'));

    }

    getFirstHistory() {

        return element(by.xpath('/html/body/ion-app/ng-component/ion-nav/page-history/ion-content/div[2]/div/div/ion-list[1]/ion-row'));
        
    }

    getRidersInfo() {

        return element(by.xpath('/html/body/ion-app/ng-component/ion-nav/page-singlebook/ion-content/div[2]/ion-list/form/ion-row[2]/button/span'));

    }

    getBackBtn() {

        return element(by.xpath('/html/body/ion-app/ng-component/ion-nav/page-riders-info/ion-header/ion-navbar/button'));

    }

    getBackBtnBooking() {

        return element(by.xpath('/html/body/ion-app/ng-component/ion-nav/page-singlebook/ion-header/ion-navbar/button'));

    }

    getHistoryHB() {

        return element(by.xpath('/html/body/ion-app/ng-component/ion-nav/page-history/ion-header/ion-navbar/button[2]'));

    }
   
    getLogout() {

        return element(by.xpath('/html/body/ion-app/ng-component/ion-menu/div/ion-content/div[2]/ion-list/ion-item/div[1]/div/ion-label'));

    }

    getHistoryPage() {

        return element(by.xpath('/html/body/ion-app/ng-component/ion-nav/page-history/ion-content/div[2]'));

    }

    getBookingInfoPage() {

        return element(by.xpath('/html/body/ion-app/ng-component/ion-nav/page-singlebook/ion-content/div[2]'));

    }

}

