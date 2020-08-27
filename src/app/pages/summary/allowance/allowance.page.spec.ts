import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AllowancePage } from './allowance.page';

describe('AllowancePage', () => {
  let component: AllowancePage;
  let fixture: ComponentFixture<AllowancePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllowancePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AllowancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
