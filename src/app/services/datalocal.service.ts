import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Article } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DatalocalService {

  private _storage: Storage | null = null;

  noticias: Article[] = []

  constructor(private storage: Storage) {
    this.init();

  }

  guardarNoticia( noticia: Article ) {

    const existe = this.noticias.find( noti => noti.title === noticia.title  );

    if ( !existe ) {
      this.noticias.unshift(noticia);
      this._storage?.set('favoritos', this.noticias)
      .then(
        () => console.log('Noticia guardada'),
        error => console.error('Error guardando noticia:', error)
      );
    }
  }

  cargarFavoritos() {

  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }
}
