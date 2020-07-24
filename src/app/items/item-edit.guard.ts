import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, from } from 'rxjs';
import { ItemAddComponent } from './item-add.component';

@Injectable({
  providedIn: 'root'
})
export class ItemEditGuard implements CanDeactivate<ItemAddComponent> {
  canDeactivate( component: ItemAddComponent): Observable<boolean> | Promise<boolean> | boolean {
     if (component.advertForm.dirty) {
        const itemHeader = component.advertForm.get('itemHeader').value || 'New Item';
        return confirm(`Navigate away and lose all changes to ${itemHeader}?`);
      }
    return true;
  }
  
}