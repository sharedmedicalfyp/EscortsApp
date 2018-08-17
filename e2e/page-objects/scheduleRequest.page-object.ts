import { browser, element, by, ElementFinder } from 'protractor';



export class ScheduleRequestPageObject{

    browseToPage(){
        browser.get('');
        browser.driver.sleep(500);
    }

   getBKRequestHB() {

    return element(by.xpath('/html/body/ion-app/ng-component/ion-nav/page-booking-requests/ion-header/ion-navbar/button[2]'));

   }

   getScheduleMenu() {

    return element(by.xpath('/html/body/ion-app/ng-component/ion-menu/div/ion-content/div[2]/ion-list/button[3]'));

   }

   getScheduleList() {

    return element(by.xpath('/html/body/ion-app/ng-component/ion-nav/page-my-schedule/ion-content/div[2]/calendar/div/monthview/div/ion-list/ion-item/div[1]/div/ion-label'));

   }

   getRiderInfo() {

    return element(by.xpath('/html/body/ion-app/ng-component/ion-nav/page-singlebook/ion-content/div[2]/ion-list/form/ion-row[2]/button/span'));

   }

   getBackBtn() {

    return element(by.xpath('/html/body/ion-app/ng-component/ion-nav/page-riders-info/ion-header/ion-navbar/button'));

   }

   getStartTrip() {

    return element(by.xpath('/html/body/ion-app/ng-component/ion-nav/page-singlebook/ion-content/div[2]/ion-list/form/ion-row[3]/ion-col[1]/button/span'));

   }

   getTrackingHB() {

    return element(by.xpath('/html/body/ion-app/ng-component/ion-nav/page-tracker/ion-header/ion-navbar/button[2]'));

   }

   getLogout() {

    return element(by.xpath('/html/body/ion-app/ng-component/ion-menu/div/ion-content/div[2]/ion-list/ion-item/div[1]/div/ion-label'));

   }
   

    
}