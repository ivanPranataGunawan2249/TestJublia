import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  offset = 0;
  pokemon = [];
  typePokemon = [];
  search = false;
  @ViewChild(IonInfiniteScroll) infinite: IonInfiniteScroll;

  constructor(private pokeSvc: PokemonService, private route: Router) {}

  ngOnInit(): void {
    this.loadPokemon();
    this.loadTypePokemon();
  }

  loadPokemon(loadMore = false, event?) {
    if (loadMore) {
      this.offset += 25;
    }
    this.pokeSvc.getPokemonList(this.offset).subscribe((res) => {
      this.pokemon = [...this.pokemon, ...res];

      if (event) {
        event.target.complete();
      }
    });
  }

  loadTypePokemon() {
    this.pokeSvc.getPokemonTypeList().subscribe((res) => {
      this.typePokemon = res;
    });
  }

  onFilterChange(e) {
    this.pokemon = [];
    if (e.detail.value) {
      this.pokeSvc.getPokemonByType(e.detail.value).subscribe((res) => {
        const allData = res;
        const dataPoke = [];
        this.search = true;

        allData.map((data) => {
          dataPoke.push(data.pokemon);

          this.pokeSvc
            .getPokemonDetailSort(data.pokemon.url)
            .subscribe((res) => {
              const dataTemp = {
                name: res['name'],
                pokeIndex: res['id'],
                image: res['sprites']['front_default'],
              };

              this.pokemon.push(dataTemp);
            });
        });
      });
    } else {
      this.offset = 0;
      this.search = false;
      this.loadPokemon();
    }
  }

  onSearchChange(e) {
    let value = e.detail.value;

    if (value == '') {
      this.offset = 0;
      this.loadPokemon();
      this.search = false;
      this.pokemon = [];
      return;
    } else {
      this.search = true;
    }

    this.pokeSvc.findPokemon(value).subscribe(
      (res) => {
        this.pokemon = [res];
      },
      (err) => {
        this.pokemon = [];
      }
    );
  }

  favPage() {
    this.route.navigate(['/favorite']);
  }
}
