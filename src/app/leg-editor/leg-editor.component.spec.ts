import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegEditorComponent } from './leg-editor.component';

describe('LegEditorComponent', () => {
  let component: LegEditorComponent;
  let fixture: ComponentFixture<LegEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LegEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
