import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SummaryDayPage } from './summary-day.page';

describe('SummaryDayPage', () => {
  let component: SummaryDayPage;
  let fixture: ComponentFixture<SummaryDayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryDayPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SummaryDayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
