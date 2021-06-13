import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  // @ViewChild(IonSegment) segment: IonSegment;

  categorias = ['business','entertainment','general','health','science','sports','technology']
  noticias: Article[] = [];

  constructor( private noticiasService: NoticiasService ) {}

  cambioCategoria( event ) {
    this.noticias.length = 0;
    this.cargarNoticias( event.detail.value );
  }

  cargarNoticias(categoria: string) {
    console.log(categoria);

    this.noticiasService.getTopHeadlinesCategoria( categoria ).subscribe(
      resp => {console.log(resp)
        this.noticias.push(...resp.articles)
      }

    );
  }

  ngOnInit() {
    this.cargarNoticias(this.categorias[0]);
  }

}
