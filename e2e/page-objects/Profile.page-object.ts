import { browser, element, by, ElementFinder } from 'protractor';



export class ProfilePageObject{

    browseToPage(){
        
        browser.get('');
        browser.driver.sleep(500);

    }

    getBkRequestHB() {

        return element(by.xpath('/html/body/ion-app/ng-component/ion-nav/page-booking-requests/ion-header/ion-navbar/button[2]'));

    }

    getProfileMenu() {

        return element(by.xpath('/html/body/ion-app/ng-component/ion-menu/div/ion-content/div[2]/ion-list/button[1]/div[1]/div'));

    }

    getUpdateButton() {

        return element(by.xpath('/html/body/ion-app/ng-component/ion-nav/page-profile/ion-content/div[2]/div/div/button/span'));

    }

    getUpdateAddress() {

        return element(by.xpath('/html/body/ion-app/ng-component/ion-nav/page-updateprofile/ion-content/div[2]/ion-list/form/ion-item[5]/div[1]/div/ion-input/input'));

    }

    getclkUpdate() {

        return element(by.xpath('/html/body/ion-app/ng-component/ion-nav/page-updateprofile/ion-content/div[2]/button/span'));

    }

    getProfileUpdateOK() {

        return element(by.xpath('/html/body/ion-app/ion-alert/div/div[3]/button/span'));

    }

    getNewPassword() {

        return element(by.xpath('/html/body/ion-app/ng-component/ion-nav/page-profile/ion-content/div[2]/ion-list[2]/ion-item[1]/div[1]/div/ion-input/input'));


    }

    getPasswordConfirm() {

        return element(by.xpath('/html/body/ion-app/ng-component/ion-nav/page-profile/ion-content/div[2]/ion-list[2]/ion-item[2]/div[1]/div/ion-input/input'));

    }

    getUpdatePassword() {

        return element(by.xpath('//*[@id="UpdatePass"]/span'));

    }

    getPasswordVerification() {

        return element(by.xpath('/html/body/ion-app/ion-modal/div/page-reauthenticate/ion-content/div[2]/ion-scroll/div/div/ion-list/ion-item/div[1]/div/ion-input/input'));

    }

    getConfirmBtn() {

        return element(by.xpath('/html/body/ion-app/ion-modal/div/page-reauthenticate/ion-content/div[2]/ion-scroll/div/div/ion-list/button/span'));

    }

    getConfirmBtnOK() {

        return element(by.xpath('/html/body/ion-app/ion-alert/div/div[3]/button/span'));

    }
 
}