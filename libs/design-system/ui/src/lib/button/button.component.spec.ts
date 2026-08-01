import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default variant as primary', () => {
    expect(component.variant()).toBe('primary');
  });

  it('should have default size as md', () => {
    expect(component.size()).toBe('md');
  });

  it('should not be disabled by default', () => {
    expect(component.disabled()).toBe(false);
  });

  it('should not be loading by default', () => {
    expect(component.loading()).toBe(false);
  });

  it('should compute correct host classes', () => {
    expect(component.hostClasses()).toContain('ds-btn');
    expect(component.hostClasses()).toContain('ds-btn--primary');
    expect(component.hostClasses()).toContain('ds-btn--md');
  });
});
