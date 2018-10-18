import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
// import { SessionService } from '../services/session.service';
import { LoadingUIService } from '../_services/loadingUI.service';
//import { UserService } from '../services/user.service';
//import { MessageModalService } from '../services/messagemodal.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap';
import { ModalDirective } from 'ngx-bootstrap';
import { UserInfo } from '../_models/UserInfo';
import { UserService } from '../_services';
import { PetrolPumpService } from '../_services/petrolpump.service';
import { IncompleteDailyData } from '../_models/IncompleteDailyData';
import { IncompleteProducts } from '../_models/IncompleteProducts';
import { IncompleteTanks } from '../_models/IncompleteTanks';
import { IncompleteNozzles } from '../_models/IncompleteNozzles';

declare var $: any;

@Component({
    selector: 'public',
    templateUrl: 'Public.component.html',
    styleUrls: ['Public.component.css']
})

export class PublicComponent implements AfterViewInit {
    public divtitle: string;
    public isLoggedIn: boolean;
    public loading: boolean = false;
    public username: string;
    public userData: UserInfo;
    public pumpCode: string;
    public isPermit: boolean;
    public incompleteDailyData: IncompleteDailyData;
    public incompleteProducts: IncompleteProducts[];
    public incompleteTanks: IncompleteTanks[];
    public incompleteNozzles: IncompleteNozzles[];
    public modalMessage: string;
    public subscription: Subscription;
    public modalSubscription: Subscription;
    public userNameSubscription: Subscription;
    public confirmSubscription: Subscription;
    @ViewChild('childMessageModal') public childMessageModal: ModalDirective;
    @ViewChild('childConfirmModal') public childConfirmModal: ModalDirective;

    public constructor(private titleService: Title,
        //private sessionService: SessionService,
        //private loadingUIService: LoadingUIService, 
        private userService: UserService,
        private petrolPumpService: PetrolPumpService,
        private activatedRoute: ActivatedRoute,
        private router: Router
        //  , private messageModalService: MessageModalService
    ) {

        this.divtitle = this.titleService.getTitle();
        let urlPathName: string;
        urlPathName = window.location.pathname;
        this.pumpCode = urlPathName.substring(urlPathName.lastIndexOf("/") + 1);
        //   this.navigationSubscription = this.router.events.subscribe((e: any) => {
        //     if (e instanceof NavigationEnd) {
        //       this.ngOnInit();
        //     }
        //   });
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
        this.getUserDate(this.pumpCode);       
    }
    // ngOnInit() {        
    //     this.getUserDate(this.pumpCode);        
    // }
    getPumpIncompleteDailyData(pumpCode) {
        if (this.userData && this.userData.RoleID != -2 && this.userData.RoleID != 2) {
            this.petrolPumpService.getPumpIncompleteDailyData(pumpCode).subscribe(res => {
                this.incompleteDailyData = new IncompleteDailyData();
                this.incompleteProducts = res.IncompleteProducts;
                this.incompleteTanks = res.IncompleteTanks;
                this.incompleteNozzles = res.IncompleteNozzles;
                if ((this.incompleteProducts && this.incompleteProducts.length > 0) ||
                 (this.incompleteTanks && this.incompleteTanks.length > 0) || (this.incompleteNozzles && this.incompleteNozzles.length > 0)) {
                    this.isPermit = false;
                }
                else {
                    this.isPermit = true;
                }
            });
        }
        else
        {
            this.isPermit = true;
        }
    }
    getUserDate(pumpCode) {
        this.userService.getUserDetailInfo().subscribe((res:any) => {
            this.userData = res;
            this.getPumpIncompleteDailyData(res.PetrolPumpCode);
        });
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
