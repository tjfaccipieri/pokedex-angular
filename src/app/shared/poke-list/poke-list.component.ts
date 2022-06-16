import { PokeApiService } from './../../service/poke-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent implements OnInit {

  private setAllPokemons: any
  public getAllPokemons: any

  public apiError: boolean = false

  constructor(private poke: PokeApiService) { }

  ngOnInit() {
    this.poke.apiListAllPokemons.subscribe({
      next: res => {
        this.setAllPokemons = res.results
        this.getAllPokemons = this.setAllPokemons
      },
      error: error => {
        this.apiError = true
      }
    })
  }

  public getSearch(value: string) {
    // console.log(value)
    const filter = this.setAllPokemons.filter((resp: any) => {
      return !resp.name.indexOf(value.toLowerCase())
    });

    this.getAllPokemons = filter
  }


}
