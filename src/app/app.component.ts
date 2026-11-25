import { Component, OnInit , inject} from '@angular/core';
import { NgForm, FormBuilder, Validators, FormGroup, Form } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
    ngOnInit(): void {
    this.IsForUpdate = false;
    this.studentForm = this.fb.group({
      name: ['', [Validators.required , Validators.minLength(3) , Validators.maxLength(15)]],
      major: ['Computer Science', [Validators.required ]],
      maths: ['', [Validators.min(40),Validators.max(100) , Validators.required]],
      physics: ['', [Validators.min(40), Validators.max(100),Validators.required]],
      chemistry: ['', [Validators.min(40), Validators.max(100), Validators.required]],
      majorMark: ['', [Validators.min(40), Validators.max(100), Validators.required]],
      ncc: null,
      sports: null
    });
  }

  studentForm!: FormGroup;
  updatedItem!: number ;
  IsForUpdate!: boolean ;
  students = [
    { name: 'Ram A K', major: 'Computer Science', maths: 90, physics: 95, chemistry: 98, majorMark: 100, ncc: true, sports: null },
    { name: 'John', major: 'Computer Science', maths: 98, physics: 67, chemistry: 95, majorMark: 56, ncc: null, sports: null }
  ];
  //name
  nameReqErr="Please provide a name";// for "required" error
  nameMinErr="Name should be atleast 3 characters long";//for "minlength" error
  nameMaxErr="Name should be atmost 15 characters long";//for "maxlength" error
  nameNumErr="Name should contain alphebets only";//for "pattern" error
  //maths
  mathsReqErr="Please provide your maths mark";//for "required" error
  mathsRangeErr="Mark should between 40 and 100";//for "min" and "max" error
  //physics
  phyReqErr="Please provide your physics mark";//for "required" error
  phyRangeErr="Mark should between 40 and 100";//for "min" and "max" error
  //chemistry
  chemReqErr="Please provide your chemistry mark";//for "required" error
  chemRangeErr="Mark should between 40 and 100";//for "min" and "max" error
  //major
  majorReqErr="Please provide your major mark";//for "required" error
  majorRangeErr="Mark should between 40 and 100";//for "min" and "max" error


  constructor(private fb: FormBuilder) { }



addStudent(form: FormGroup) {
  this.students.push({
    name: form.controls['name'].value,
    major: form.controls['major'].value,
    maths: form.controls['maths'].value,
    physics: form.controls['physics'].value,
    chemistry: form.controls['chemistry'].value,
    majorMark: form.controls['majorMark'].value,
    ncc: form.controls['ncc'].value,
    sports: form.controls['sports'].value
  });
  this.studentForm.reset({ major: 'Computer Science' });
}


  deleteStudent(index:number) {
    this.students.splice(index,1)
    // this.students = this.students.filter( (st,i)=>{
    //   i==index
    // })
    // delete the specific student values
  }

  editStudent(stu:any, i:number) {
    this.IsForUpdate = true;
  this.updatedItem = i;
  this.studentForm.patchValue({
    name: stu.name,
    major: stu.major,
    maths: stu.maths,
    physics: stu.physics,
    chemistry: stu.chemistry,
    majorMark: stu.majorMark,
    ncc: stu.ncc,
    sports: stu.sports
  });
  }

  updateStudent(form: FormGroup) {
    this.students[this.updatedItem] = form.value;
  this.IsForUpdate = false;
  this.studentForm.reset({ major: 'Computer Science' });
    //update the student values in the values in the form
  }

}
