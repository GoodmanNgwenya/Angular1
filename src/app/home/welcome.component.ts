import { Component, OnInit } from '@angular/core';
import { Item } from '../_models/item';
import { AdvertService } from '../_services/advert.service';

@Component({
  templateUrl: './welcome.component.html'
})
export class WelcomeComponent implements OnInit {
  pageTitle = 'Welcome to Goodies online store';
  imageWidth = 50;
  imageMargin = 2;
  _searchItem: string;


  get listItem(): string {
    return this._searchItem;
  }
  set listItem(value: string) {
    this._searchItem = value;
    this.filteredItems = this.listItem ? this.performFilter(this.listItem) : this.items;
  }

  items: Item[] = [];
  filteredItems: Item[] = [];

  constructor(private advertService: AdvertService) { }

  performFilter(searchBy: string): Item[] {
    searchBy = searchBy.toLocaleLowerCase();
    return this.items.filter((item: Item) =>
      item.itemHeader.toLocaleLowerCase().indexOf(searchBy) !== -1 ||
      item.description.toLocaleLowerCase().indexOf(searchBy) !== -1);

  }

  ngOnInit(): void {
    this.advertService.getItems().subscribe({
      next: items => {
        this.items = items;
        this.filteredItems = items;
      }
    })
  }

}
