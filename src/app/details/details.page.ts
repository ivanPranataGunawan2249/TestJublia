import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Platform, ToastController } from '@ionic/angular';
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper';
import { FavoriteService } from '../services/favorite.service';
import { PokemonService } from '../services/pokemon.service';

SwiperCore.use([Autoplay, Pagination, Navigation]);

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DetailsPage implements OnInit {
  details: any;

  dataFav = [];

  favorite;

  favStatus = false;

  constructor(
    private route: ActivatedRoute,
    private pokeSvc: PokemonService,
    private favoriteSvc: FavoriteService
  ) {}

  ngOnInit() {
    let index = this.route.snapshot.paramMap.get('index');

    this.favoriteSvc.getFavorite().subscribe((res) => {
      this.dataFav = res;

      const checkData = this.dataFav.find((check) => check.pokeIndex == index);

      this.favorite = checkData;

      if (checkData) {
        this.favStatus = true;
      } else {
        this.favStatus = false;
      }
    });

    this.pokeSvc.getPokemonDetails(index).subscribe((res) => {
      this.details = res;
    });
  }

  favoritePoke(stat) {
    const tempData = {
      name: stat.name,
      image: stat.sprites.front_default,
      pokeIndex: stat.id,
    };

    this.favoriteSvc.AddFavorite(tempData);
  }

  async deleteFavoritePoke() {
    this.favoriteSvc.deleteNote(this.favorite);
  }
}
