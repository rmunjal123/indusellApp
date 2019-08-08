import { Component, OnInit } from '@angular/core';
import { GetcategoriesService } from 'src/app/services/getcategories.service';
import { ListingdetailsService } from 'src/app/services/listingdetails.service';
import { SellerdetailsService } from 'src/app/services/sellerdetails.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { File } from '@ionic-native/file/ngx';
import { ActionSheetController } from '@ionic/angular';


@Component({
  selector: 'app-addetails',
  templateUrl: './addetails.page.html',
  styleUrls: ['./addetails.page.scss'],
})
export class AddetailsPage implements OnInit {
  text = 'Check out the Ionic Academy!';
  url = 'https://ionicacademy.com';
  listing: any;
  id: any;
  postdetails: string;
  postreview: string; 
  posttitle: string;
  postcontact:string;
  postprice:string;
  postdescription:string;
  postreview_title: string;
  postreview_description: string;
  postreview_date: string;

  seller: any;
  sellervalues: string;
  seller_email: string;
  seller_name: string;

  slideOpts = {
    initialSlide: 1,
    speed: 400,
    direction: 'horizontal'
  }
  constructor(private getcategoriesService:GetcategoriesService, private listingdetails: ListingdetailsService,
    private sellerdetails: SellerdetailsService,private socialSharing: SocialSharing,private actionSheetController: ActionSheetController) { }

  ngOnInit() {
   
    this.listing = this.listingdetails.getAll()
    .subscribe(response => { 
      this.listing = response;
      console.log(this.listing);
      this.postdetails = this.listing['post-detail'][0];
      this.posttitle = this.postdetails["title"];
      this.postcontact = this.postdetails["contact_name"];
      this.postprice = this.postdetails["price"];
      this.postdescription = this.postdetails["description"];
      this.postreview = this.listing['product-review'];
      console.log(this.postreview);
      this.postreview_title = this.postreview["title"];
      this.postreview_description= this.postreview["description"];
      this.postreview_date= this.postreview["update_date"];

      
      console.log(this.posttitle);
    });

    this.seller = this.sellerdetails.getAll()
    .subscribe(response => { 
      this.seller = response['Seller'];
      console.log(this.seller);
      this.seller_name = this.seller["name"];
      this.seller_email= this.seller["email"];
    });
  }

  //Sharing the url code starts from here

  async share() {
    const actionSheet = await this.actionSheetController.create({
      header: "Share the Link:",
      buttons: [{
        text: 'Facebook',
        icon: "logo-facebook",
        handler: () => {
          //this.uploadImages();
          this.shareFacebook();
        }
      },
      {
        text: 'Whatsapp',
        icon: "logo-whatsapp",
        handler: () => {
          this.shareWhatsApp();
        }
      },
      {
        text: 'Twitter',
        icon: "logo-twitter",
        handler: () => {
          this.shareTwitter();
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }
  async shareTwitter() {
    // Either URL or Image
    this.socialSharing.shareViaTwitter(null, null, this.url).then(() => {
      // Success
    }).catch((e) => {
      // Error!
    });
  }
 
  async shareWhatsApp() {
    // Text + Image or URL works
    this.socialSharing.shareViaWhatsApp(this.text, null, this.url).then(() => {
      // Success
    }).catch((e) => {
      // Error!
    });
  }
 
  // async resolveLocalFile() {
  //   return this.file.copyFile(`${this.file.applicationDirectory}www/assets/imgs/`, 'shapes.svg', this.file.cacheDirectory, `${new Date().getTime()}.svg`);
  // }
 
  // removeTempFile(name) {
  //   this.file.removeFile(this.file.cacheDirectory, name);
  // }
 
  // async shareEmail() {
  //  let file = await this.resolveLocalFile();
 
  //   this.socialSharing.shareViaEmail(this.text, 'My custom subject', ['saimon@devdactic.com'], null, null, file.nativeURL).then(() => {
  //     this.removeTempFile(file.name);
  //   }).catch((e) => {
  //     // Error!
  //   });
  //}
 
  async shareFacebook() {
   // let file = await this.resolveLocalFile();
 
    // Image or URL works
    this.socialSharing.shareViaFacebook(null, null, this.url).then(() => {
      console.log('shared');
    }).catch((e) => {
      // Error!
    });
  }
}
