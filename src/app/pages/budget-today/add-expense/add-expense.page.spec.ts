import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddExpensePage } from './add-expense.page';

describe('AddExpensePage', () => {
  let component: AddExpensePage;
  let fixture: ComponentFixture<AddExpensePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExpensePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddExpensePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
