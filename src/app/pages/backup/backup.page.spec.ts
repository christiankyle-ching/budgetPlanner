import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BackupPage } from './backup.page';

describe('BackupPage', () => {
  let component: BackupPage;
  let fixture: ComponentFixture<BackupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BackupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
