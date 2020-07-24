import { Component, OnInit } from '@angular/core';
import { Item } from '../_models/item';
import { AdvertService } from '../_services/advert.service'

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  pageTitle = 'Available Items';
  imageWidth = 50;
  imageMargin = 2;
  items: Item[] = [];


  constructor(private advertService: AdvertService) { }

  ngOnInit(): void {
    /** 
     * get all available advert 
     */
    this.advertService.getItems().subscribe({
      next: items => {
        this.items = items;
      }
    })
  }

}
