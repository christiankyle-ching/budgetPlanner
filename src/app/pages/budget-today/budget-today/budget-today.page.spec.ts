import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BudgetTodayPage } from './budget-today.page';

describe('BudgetTodayPage', () => {
  let component: BudgetTodayPage;
  let fixture: ComponentFixture<BudgetTodayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetTodayPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BudgetTodayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
