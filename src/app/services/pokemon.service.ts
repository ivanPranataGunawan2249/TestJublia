import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  baseUrl = 'https://pokeapi.co/api/v2';
  imageUrl =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';

  constructor(private http: HttpClient) {}

  getPokemonList(offset = 0) {
    return this.http
      .get(`${this.baseUrl}/pokemon?offset=${offset}&limit=25`)
      .pipe(
        map((result) => {
          return result['results'];
        }),
        map((pokemons) => {
          return pokemons.map((poke, index) => {
            poke.image = this.getPokemonImage(index + offset + 1);
            poke.pokeIndex = offset + index + 1;
            return poke;
          });
        })
      );
  }

  getPokemonData(idx) {
    return this.http.get(`${this.baseUrl}/pokemon/${idx}`).pipe(
      map((res) => {
        return res;
      })
    );
  }

  getPokemonImage(index) {
    return `${this.imageUrl}/${index}.png`;
  }

  findPokemon(search) {
    return this.http.get(`${this.baseUrl}/pokemon/${search}`).pipe(
      map((pokemon) => {
        pokemon['image'] = this.getPokemonImage(pokemon['id']);
        pokemon['pokeIndex'] = pokemon['id'];

        return pokemon;
      })
    );
  }

  getPokemonTypeList(offset = 0) {
    return this.http.get(`${this.baseUrl}/type`).pipe(
      map((result) => {
        return result['results'];
      }),
      map((types) => {
        return types.map((type, index) => {
          type.typeIndex = offset + index + 1;
          return type;
        });
      })
    );
  }

  getPokemonByType(index) {
    return this.http.get(`${this.baseUrl}/type/${index}`).pipe(
      map((pokemon) => {
        return pokemon['pokemon'];
      })
    );
  }

  getPokemonDetailSort(index) {
    return this.http.get(`${index}`).pipe(
      map((detail) => {
        return detail;
      })
    );
  }

  getPokemonDetails(index) {
    return this.http.get(`${this.baseUrl}/pokemon/${index}`).pipe(
      map((poke) => {
        let sprites = Object.keys(poke['sprites']);
        poke['images'] = sprites
          .map((spriteKey) => poke['sprites'][spriteKey])
          .filter((img) => img);

        let length = poke['images'].length;

        poke['images'] = poke['images'].splice(0, length - 2);

        return poke;
      })
    );
  }
}
