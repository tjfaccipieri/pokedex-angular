import { PokeApiService } from './../../service/poke-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  private urlPokemon: string = 'https://pokeapi.co/api/v2/pokemon'
  private urlName: string = 'https://pokeapi.co/api/v2/pokemon-species'

  public pokemon: any
  public isLoaded: boolean = false
  public apiError: boolean = false

  constructor(
    private route: ActivatedRoute,
    private pokeService: PokeApiService
  ) { }

  ngOnInit() {
    this.getPokemon;
  }

  get getPokemon() {
    const id = this.route.snapshot.params['id']
    const pokemon = this.pokeService.apiGetPokemons(`${this.urlPokemon}/${id}`)
    const name = this.pokeService.apiGetPokemons(`${this.urlName}/${id}`)

    return forkJoin([pokemon, name]).subscribe({
      next: resp => {
        console.log(resp)
        this.pokemon = resp
        this.isLoaded = true
      },
      error: error => {
        this.apiError = true
      }
    })
  }

}
