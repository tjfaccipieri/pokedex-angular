import { PokeApiService } from './../../service/poke-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss'],
})
export class PokeListComponent implements OnInit {
  private setAllPokemons: any;
  public getAllPokemons: any;

  public apiError: boolean = false;
  public listError: boolean = false;

  collection: any = [];
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [5, 10, 15, 20];

  config = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: this.collection.count
  };

  constructor(private poke: PokeApiService) {}

  ngOnInit() {
    this.pushPokemons();
  }

  pushPokemons() {
    this.poke.apiListAllPokemons.subscribe({
      next: (res) => {
        this.setAllPokemons = res.results;
        this.getAllPokemons = this.setAllPokemons;
        console.log(res.results);
        this.collection = this.getAllPokemons
      },
      error: (error) => {
        this.apiError = true;
      },
    });
  }

  public getSearch(value: string) {
    const filter = this.setAllPokemons.filter((resp: any) => {
      return !resp.name.indexOf(value.toLowerCase());
    });

    if (filter.length > 0) {
      this.getAllPokemons = filter;
      this.listError = false;
    } else {
      this.getAllPokemons = [];
      this.listError = true;
    }
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getAllPokemons;
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAllPokemons;
  }
}
