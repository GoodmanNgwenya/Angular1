import { Component, OnInit, ElementRef, AfterViewInit, OnDestroy, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormControlName } from '@angular/forms';
import { Item } from '../_models/item';
import { AdvertService } from '../_services/advert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { GenericValidator } from '../shared/generic-validator';
import { Subscription, Observable, fromEvent, merge } from 'rxjs';
import { User } from '../_models/user';
import { debounceTime } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Component({
  templateUrl: './item-add.component.html',
  styleUrls: ['./item-add.component.css'],
  providers: [DatePipe]
})
export class ItemAddComponent implements AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  advertForm: FormGroup;
  pageTitle = 'Create New Advert';
  currentUser: User;
  errorMessage: string;
  date: Date;
  current_date: string;
  item: Item;
  private sub: Subscription;


  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;
 


  constructor(private fb: FormBuilder, private advertService: AdvertService,
    private route: ActivatedRoute,
    private router: Router,
    public datepipe: DatePipe,
    private authenticationService: AuthenticationService) {
    this.date = new Date();
    this.current_date = this.datepipe.transform(this.date, 'yyyy-MM-dd');
    this.currentUser = this.authenticationService.currentUserValue;

    // All validation form.
    this.validationMessages = {
      itemHeader: {
        required: 'Item name/header is required.',
        minlength: 'Item name/header must be at least three characters.',
        maxlength: 'Item name/header cannot exceed 50 characters.'
      },
      description: {
        required: 'Description is required.'
      },

    };
    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.advertForm = this.fb.group({
      itemHeader: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)]],
      price: ['', Validators.required],
      description: '',
      userId: '',
      releaseDate:''
    });

    // Read the product Id from the route parameter
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getItem(id);
      }
    );



  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    // This is required because the valueChanges does not provide notification on blur
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    // so we only need to subscribe once.
    merge(this.advertForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.advertForm);
    });
  }

  /** 
   * get advert by Id from the server 
   */
  getItem(id: number): void {
    this.advertService.getOneItem(id)
      .subscribe({
        next: (item: Item) => this.displayItem(item),
        error: err => this.errorMessage = err
      });
  }

  displayItem(item: Item): void {
    if (this.advertForm) {
      this.advertForm.reset();
    }
    this.item = item;

    if (this.item.id === 0) {
      this.pageTitle = 'Add Product';
    } else {
      this.pageTitle = `Edit Product: ${this.item.itemHeader}`;
    }

    // Update the data on the form
    this.advertForm.patchValue({
      itemHeader: this.item.itemHeader,
      price: this.item.price,
      description: this.item.description
    });

  }

  /** 
   * remove advert from the list 
   */
  deleteItem(): void {
    if (this.item.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Are you sure you want to remove: ${this.item.itemHeader}?`)) {
        this.advertService.deleteAdvert(this.item.id)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
      }
    }
  }

  /** 
   * create new advert and save it to Db 
   */
  saveItem(): void {
    if (this.advertForm.valid) {
      if (this.advertForm.dirty) {
        this.advertForm.controls['releaseDate'].setValue(this.current_date);
        this.advertForm.controls['userId'].setValue(this.currentUser.id);
        const p = { ...this.item, ...this.advertForm.value };

        if (p.id === 0) {
          this.advertService.addAdvert(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        } else {
          this.advertService.updateAdvert(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        }
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  /** 
   * navigate back to advert list if saved or updated successful 
   */
  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.advertForm.reset();
    alert("Success");
    this.router.navigate(['/editItem']);
  }

}
