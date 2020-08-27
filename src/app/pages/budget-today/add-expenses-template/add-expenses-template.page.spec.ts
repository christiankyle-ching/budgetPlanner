import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddExpensesTemplatePage } from './add-expenses-template.page';

describe('AddExpensesTemplatePage', () => {
  let component: AddExpensesTemplatePage;
  let fixture: ComponentFixture<AddExpensesTemplatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExpensesTemplatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddExpensesTemplatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
