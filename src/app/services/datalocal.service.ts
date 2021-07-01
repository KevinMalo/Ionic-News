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
    this.cargarFavoritos();
  }

  guardarNoticia(noticia: Article) {

    const existe = this.noticias.find(noti => noti.title === noticia.title);

    if (!existe) {
      this.noticias.unshift(noticia);
      this._storage?.set('favoritos', this.noticias)
        .then(
          () => console.log('Noticia guardada'),
          error => console.error('Error guardando noticia:', error)
        );
    }
  }

  async cargarFavoritos() {

    const data = await this._storage?.get('favoritos')
    if (data) {
      this.noticias = data;
    }

  }

  async borrarNoticia(noticia: Article) {

    this.noticias = this.noticias.filter( n => n.title !== noticia.title )
    this._storage?.set('favoritos', this.noticias)

  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }
}
