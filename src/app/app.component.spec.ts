import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

let mockStudents = [
  { name: 'Ram A K', major: 'Computer Science', maths: 90, physics: 95, chemistry: 98, majorMark: 100, ncc: true, sports: null },
  { name: 'John', major: 'Computer Science', maths: 98, physics: 67, chemistry: 95, majorMark: 56, ncc: null, sports: null }
];

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  let nameError: HTMLElement;
  let mathsError: HTMLElement;
  let physicsError: HTMLElement;
  let chemistryError: HTMLElement;
  let majorError: HTMLElement;

  let addBtn: HTMLButtonElement;
  let updateBtn: HTMLButtonElement;
  let editBtn: HTMLButtonElement;
  let delBtn: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [
        AppComponent,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    addBtn = fixture.nativeElement.querySelector('#addBtn');
    updateBtn = fixture.nativeElement.querySelector('#updateBtn');

    component.ngOnInit();

    fixture.detectChanges();
  });

  it('#In Default -  cs radio is checked', async(() => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(addBtn.disabled).toBeTruthy();
    expect(updateBtn.disabled).toBeTruthy();
    expect(component.studentForm.controls['major'].value).toBe('Computer Science');
  }));

  it('#Name - form validation error', async(() => {
    fixture.whenStable().then(() => {
      let nameElm: HTMLInputElement = fixture.nativeElement.querySelector('#name');
      expect(nameElm.getAttribute('type')).toBe('text');
      nameElm.dispatchEvent(new Event('input')); nameElm.value = '';
      fixture.detectChanges();
      nameError = fixture.nativeElement.querySelector('#Alert-Invalid-Name');
      expect(nameError.innerText.trim()).toBe('Please provide a name');
      nameElm.value = 'ab'; nameElm.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(nameError.innerText.trim()).toBe('Name should be atleast 3 characters long');
      nameElm.value = 'abcdefghijklmnop'; nameElm.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(nameError.innerText.trim()).toBe('Name should be atmost 15 characters long');
      nameElm.value = 'abc1'; nameElm.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(nameError.innerText.trim()).toBe('Name should contain alphebets only');
    });
  }));

  it('#Status - form type check', async(() => {
    fixture.whenStable().then(() => {
      let radioElm1: HTMLInputElement = fixture.nativeElement.querySelector('#major1');
      expect(radioElm1.getAttribute('type')).toBe('radio');
      let radioElm2: HTMLInputElement = fixture.nativeElement.querySelector('#major2');
      expect(radioElm2.getAttribute('type')).toBe('radio');
      expect(radioElm2.getAttribute('checked')).toBe('');
    });
  }));

  it('#Maths - form validation error', async(() => {
    fixture.whenStable().then(() => {
      let mathsElm: HTMLInputElement = fixture.nativeElement.querySelector('#maths');
      expect(mathsElm.getAttribute('type')).toBe('number');
      mathsElm.dispatchEvent(new Event('input')); mathsElm.value = null;
      fixture.detectChanges();
      mathsError = fixture.nativeElement.querySelector('#Alert-Invalid-Maths');
      expect(mathsError.innerText.trim()).toBe('Please provide your maths mark');
      mathsElm.valueAsNumber = 23; mathsElm.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(mathsError.innerText.trim()).toBe('Mark should between 40 and 100');
      mathsElm.valueAsNumber = 231; mathsElm.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(mathsError.innerText.trim()).toBe('Mark should between 40 and 100');
    });
  }));

  it('#Physics - form validation error', async(() => {
    fixture.whenStable().then(() => {
      let physicsElm: HTMLInputElement = fixture.nativeElement.querySelector('#physics');
      expect(physicsElm.getAttribute('type')).toBe('number');
      physicsElm.dispatchEvent(new Event('input')); physicsElm.value = null;
      fixture.detectChanges();
      physicsError = fixture.nativeElement.querySelector('#Alert-Invalid-Physics');
      expect(physicsError.innerText.trim()).toBe('Please provide your physics mark');
      physicsElm.valueAsNumber = 23; physicsElm.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(physicsError.innerText.trim()).toBe('Mark should between 40 and 100');
      physicsElm.valueAsNumber = 231; physicsElm.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(physicsError.innerText.trim()).toBe('Mark should between 40 and 100');
    });
  }));

  it('#Chemistry - form validation error', async(() => {
    fixture.whenStable().then(() => {
      let chemistryElm: HTMLInputElement = fixture.nativeElement.querySelector('#chemistry');
      expect(chemistryElm.getAttribute('type')).toBe('number');
      chemistryElm.dispatchEvent(new Event('input')); chemistryElm.value = null;
      fixture.detectChanges();
      chemistryError = fixture.nativeElement.querySelector('#Alert-Invalid-Chemistry');
      expect(chemistryError.innerText.trim()).toBe('Please provide your chemistry mark');
      chemistryElm.valueAsNumber = 34; chemistryElm.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(chemistryError.innerText.trim()).toBe('Mark should between 40 and 100');
      chemistryElm.valueAsNumber = 341; chemistryElm.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(chemistryError.innerText.trim()).toBe('Mark should between 40 and 100');
    });
  }));

  it('#Major - form validation error', async(() => {
    fixture.whenStable().then(() => {
      let majorElm: HTMLInputElement = fixture.nativeElement.querySelector('#majorMark');
      expect(majorElm.getAttribute('type')).toBe('number');
      majorElm.dispatchEvent(new Event('input')); majorElm.value = null;
      fixture.detectChanges();
      majorError = fixture.nativeElement.querySelector('#Alert-Invalid-MajorMark');
      expect(majorError.innerText.trim()).toBe('Please provide your major mark');
      majorElm.valueAsNumber = 12; majorElm.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(majorError.innerText.trim()).toBe('Mark should between 40 and 100');
      majorElm.valueAsNumber = 123; majorElm.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(majorError.innerText.trim()).toBe('Mark should between 40 and 100');
    });
  }));

  it('#Invalid Form', async(() => {
    component.studentForm.patchValue({
      name: 'Ram Vijay',
      major: 'Computer Science',
      maths: 34,
      physics: 67,
      chemistry: 78,
      majorMark: 89
    });
    expect(component.IsForUpdate).toBeFalsy();
    fixture.detectChanges();
    expect(component.studentForm.valid).toBeFalsy();
    expect(addBtn.disabled).toBeTruthy();
    expect(updateBtn.disabled).toBeTruthy();

    component.studentForm.patchValue({
      name: 'Ra',
      major: 'Computer Science',
      maths: 34,
      physics: 67,
      chemistry: 78,
      majorMark: 89
    });
    fixture.detectChanges();
    expect(component.studentForm.valid).toBeFalsy();
    expect(addBtn.disabled).toBeTruthy();
    expect(updateBtn.disabled).toBeTruthy();

    component.studentForm.patchValue({
      name: 'Ra',
      major: 'Computer Science',
      maths: 34,
      physics: 67,
      chemistry: 785,
      majorMark: 89
    });
    fixture.detectChanges();
    expect(component.studentForm.valid).toBeFalsy();
    expect(addBtn.disabled).toBeTruthy();
    expect(updateBtn.disabled).toBeTruthy();
  }));

  it('#Valid Form', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      component.studentForm.controls['name'].setValue('Ram Vijay');
      component.studentForm.controls['major'].setValue('Computer Science');
      component.studentForm.controls['maths'].setValue(67);
      component.studentForm.controls['physics'].setValue(56);
      component.studentForm.controls['chemistry'].setValue(78);
      component.studentForm.controls['majorMark'].setValue(89);
      fixture.detectChanges();
      expect(component.studentForm.valid).toBeTruthy();
      expect(addBtn.disabled).toBeFalsy();
      expect(updateBtn.disabled).toBeTruthy();
    });
  }));

  it('#View details', async(() => {
    component.students = mockStudents;
    fixture.detectChanges();
    let resStu: HTMLElement = fixture.nativeElement.querySelector('#resStu');
    let resMat: HTMLElement = fixture.nativeElement.querySelector('#resMat');
    let resPhy: HTMLElement = fixture.nativeElement.querySelector('#resPhy');
    let resChe: HTMLElement = fixture.nativeElement.querySelector('#resChe');
    let resMaj: HTMLElement = fixture.nativeElement.querySelector('#resMaj');
    let resTot: HTMLElement = fixture.nativeElement.querySelector('#resTot');
    let resAct: HTMLElement = fixture.nativeElement.querySelector('#resAct');
    expect(resStu.textContent.trim()).toContain('Ram A K');
    expect(resMat.textContent.trim()).toBe('90');
    expect(resPhy.textContent.trim()).toBe('95');
    expect(resChe.textContent.trim()).toBe('98');
    expect(resMaj.textContent.trim()).toBe('100');
    expect(resTot.textContent.trim()).toBe('383');
    expect(resAct.textContent.trim()).toBe('NCC');
    expect(resAct).toBeTruthy();
  }));

  it('#Add student', async(() => {
    spyOn(component, 'addStudent').and.callThrough();
    component.studentForm.patchValue({
      name: 'Ram Vijay',
      major: 'Computer Science',
      maths: 56,
      physics: 67,
      chemistry: 78,
      majorMark: 89
    });
    fixture.detectChanges();
    addBtn.click();
    expect(component.addStudent).toHaveBeenCalledWith(component.studentForm);
    fixture.detectChanges();
    expect(component.students.length).toBe(3);
  }));

  it('#Edit Student', fakeAsync(() => {
    component.students = mockStudents;
    fixture.detectChanges();
    spyOn(component, 'editStudent').and.callThrough();
    editBtn = fixture.nativeElement.querySelector('#editBtn');
    editBtn.click();
    tick();
    fixture.detectChanges();
    expect(component.editStudent).toHaveBeenCalled();
    expect(component.IsForUpdate).toBeTruthy();
    expect(addBtn.disabled).toBeTruthy();
    expect(updateBtn.disabled).toBeFalsy();
    expect(component.studentForm.controls['name'].value).toBe('Ram A K');
  }));

  it('#Update Student', fakeAsync(() => {
    component.students = mockStudents;
    fixture.detectChanges();
    editBtn = fixture.nativeElement.querySelector('#editBtn');
    editBtn.click();
    tick();
    fixture.detectChanges();
    spyOn(component, 'updateStudent').and.callThrough();
    component.studentForm.controls['name'].setValue('Ram Kumar');
    fixture.detectChanges();
    updateBtn.click();
    tick();
    fixture.detectChanges();
    expect(component.updateStudent).toHaveBeenCalled();
    expect(component.students[0].name).toBe('Ram Kumar');
    expect(component.IsForUpdate).toBeFalsy();
  }));

  it('#Delete Student', fakeAsync(() => {
    component.students = mockStudents;
    fixture.detectChanges();
    spyOn(component, 'deleteStudent').and.callThrough();
    const initialLength = component.students.length;
    delBtn = fixture.nativeElement.querySelector('#delBtn');
    delBtn.click();
    tick();
    fixture.detectChanges();
    expect(component.deleteStudent).toHaveBeenCalled();
    expect(component.students.length).toBe(initialLength - 1);
  }));

});
