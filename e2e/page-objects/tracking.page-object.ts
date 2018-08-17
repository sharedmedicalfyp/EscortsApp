import { browser, element, by, ElementFinder } from 'protractor';


export class TrackingPageObject{

    browseToPage(){


        browser.get('');
        browser.driver.sleep(500);


    }


    getBookingInfo() {

        return element(by.xpath('/html/body/ion-app/ng-component/ion-nav/page-tracker/ion-header/ion-navbar/ion-buttons/button'));


    }


   

 

    getBackButtonTracking() {

        return element(by.xpath('/html/body/ion-app/ng-component/ion-nav/page-singlebook/ion-header/ion-navbar/button'));


    }

}

