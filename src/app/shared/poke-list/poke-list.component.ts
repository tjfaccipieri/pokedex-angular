import { PokeApiService } from './../../service/poke-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent implements OnInit {

  constructor(private poke: PokeApiService) { }

  ngOnInit() {
    this.poke.apiListAllPokemons.subscribe(res => res)
  }

}
