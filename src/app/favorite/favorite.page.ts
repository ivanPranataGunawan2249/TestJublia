import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../services/favorite.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {
  pokemon = [];

  constructor(private favoriteSvc: FavoriteService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.favoriteSvc.getFavorite().subscribe((res) => {
      this.pokemon = res;
    });
  }
}
