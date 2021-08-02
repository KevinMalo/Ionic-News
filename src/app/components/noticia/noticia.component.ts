import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { ActionSheetController, Platform } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DatalocalService } from '../../services/datalocal.service';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() index: number;
  @Input() enFavoritos;

  constructor(public actionSheetController: ActionSheetController, private platform: Platform, private socialSharing: SocialSharing, private datalocalService: DatalocalService, private notificationsService: NotificationsService) { }

  abrirNoticia() {
    console.log('noticia', this.noticia.url);
  }

  async lanzarMenu() {

    let guardarBorrarBtn;

    if (this.enFavoritos) {
      guardarBorrarBtn = {
        text: 'Borrar Favorito',
        icon: 'trash-outline',
        handler: () => {
          this.datalocalService.borrarNoticia(this.noticia);
          this.notificationsService.presentToast('Noticia borrada');
        }
      }
    } else {
      guardarBorrarBtn = {
        text: 'Favorite',
        icon: 'heart',
        handler: () => {
          this.datalocalService.guardarNoticia(this.noticia);
          this.notificationsService.presentToast('Noticia guardada');
        }
      }
    }

    const actionSheet = await this.actionSheetController.create({
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Share',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');

          this.compartirNoticia();


        }
      }, guardarBorrarBtn, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }


  ngOnInit() { }

  compartirNoticia() {

    if ( this.platform.is('capacitor') ) {
      this.socialSharing.share(
        this.noticia.title,
        this.noticia.source.name,
        '',
        this.noticia.url
      );
    } else {
      if (navigator.share) {
        navigator.share({
          title: this.noticia.title,
          text: this.noticia.description,
          url: this.noticia.url,
        })
          .then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error));
      } else {
        console.log('Api share no soportada');

      }
    }



  }

}
