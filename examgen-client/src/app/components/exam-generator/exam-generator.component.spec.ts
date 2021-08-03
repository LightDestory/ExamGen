import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamGeneratorComponent } from './exam-generator.component';

describe('ExamGeneratorComponent', () => {
  let component: ExamGeneratorComponent;
  let fixture: ComponentFixture<ExamGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamGeneratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
