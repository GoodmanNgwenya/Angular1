import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user';
import { Item } from '../_models/item';
import { AdvertService } from '../_services/advert.service';

@Component({
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {
  currentUser: User;
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

  constructor(private authenticationService: AuthenticationService, private userService: UserService, private advertService: AdvertService) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  performFilter(searchBy: string): Item[] {
    searchBy = searchBy.toLocaleLowerCase();
    return this.items.filter((item: Item) =>
      item.itemHeader.toLocaleLowerCase().indexOf(searchBy) !== -1 ||
      item.description.toLocaleLowerCase().indexOf(searchBy) !== -1);

  }

  ngOnInit(): void {
    /** 
     * Return all advert posted by a specific user 
     */
    this.advertService.getItem(this.currentUser.id)
      .subscribe({
        next: items => {
          this.items = items;
          this.filteredItems = items;
        }
      })
  }

}

