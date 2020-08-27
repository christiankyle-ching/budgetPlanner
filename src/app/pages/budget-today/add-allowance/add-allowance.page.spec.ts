import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddAllowancePage } from './add-allowance.page';

describe('AddAllowancePage', () => {
  let component: AddAllowancePage;
  let fixture: ComponentFixture<AddAllowancePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAllowancePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddAllowancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
