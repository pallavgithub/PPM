import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
// import { SessionService } from '../services/session.service';
import { LoadingUIService } from '../_services/loadingUI.service';
//import { UserService } from '../services/user.service';
//import { MessageModalService } from '../services/messagemodal.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap';
import { ModalDirective } from 'ngx-bootstrap';

declare var $: any;

@Component({
    selector: 'secure',
    templateUrl: 'Secure.component.html',
    styleUrls: ['Secure.component.css']
})

export class SecureComponent implements AfterViewInit {
    public divtitle: string;
    public isLoggedIn: boolean;
    public loading: boolean = false;
    public username: string;
    public modalMessage: string;
    public subscription:Subscription;
    public modalSubscription: Subscription;
    public userNameSubscription: Subscription;
    public confirmSubscription: Subscription;
    @ViewChild('childMessageModal') public childMessageModal: ModalDirective;
    @ViewChild('childConfirmModal') public childConfirmModal: ModalDirective;

    public constructor(private titleService: Title, 
      //private sessionService: SessionService,
       //private loadingUIService: LoadingUIService, 
       //private userService: UserService,
      private router: Router
    //  , private messageModalService: MessageModalService
    ) {

        this.divtitle = this.titleService.getTitle()
        //this.sessionService.sessionEvent.subscribe(res => this.testAuth(res));
        //this.subscription = this.loadingUIService.showloading$
          //  .subscribe(item => this.loading = item)

        // this.userNameSubscription = this.sessionService.sessionEvent$
        //     .subscribe(item => { this.username = item.firstName });

        // this.modalSubscription = this.messageModalService.alertMessage$
        //     .subscribe(item => this.openModal(item))
    

        //this.getUserDetails();
        
    }

    ngAfterViewInit() {
       // test();
    }

    public openModal(text) {
      this.modalMessage = text;
        if (text != null)
        this.childMessageModal.show();
    }
  
    // public getUserDetails() {
    //     this.userService.GetUserDetails()
    //         .subscribe(res => this.getUserDetailsOnSuccess(res), err => this.getUserDetailsOnError(err));
    // }

    // private getUserDetailsOnSuccess(res) {
    //     this.username = res.firstName + res.lastName;
    //     //this.sessionService.authenticated(res);
    //     //this.router.navigate(['/dashboard']);
    // }

    // private getUserDetailsOnError(err) {
    //     //this.LoginErrorMessage = 'Something went wrong';
    // }

    public signOut() {
        this.loading = true;
        // this.userService.logout()
        //     .subscribe(res => this.signOutOnSuccess(), err => this.signOutOnError());
    }

    // private signOutOnSuccess() {
    //     this.loading = false;
    //     localStorage.removeItem('SNQAuthToken');
    //     this.router.navigate(['/login']);
    // }

    // private signOutOnError() {
    //     this.loading = false;
    // }

    public setTitle(newTitle: string) {
        this.titleService.setTitle(newTitle);
    }
    
    public hideMessageModal() {
        this.childMessageModal.hide();
    }
    public showConfirmModal() {
      this.childConfirmModal.show();
    }
    public hideConfirmModal() {
      this.childConfirmModal.hide();
    }
}

export function test() {
    var trigger = $('.hamburger'),
        overlay = $('.overlay'),
        isClosed = false;

    trigger.click(function () {
        hamburger_cross();
    });

    function hamburger_cross() {

        if (isClosed == true) {
            overlay.hide();
            trigger.removeClass('is-open');
            trigger.addClass('is-closed');
            isClosed = false;
        } else {
            overlay.show();
            trigger.removeClass('is-closed');
            trigger.addClass('is-open');
            isClosed = true;
        }
    }

    $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
    });
}
