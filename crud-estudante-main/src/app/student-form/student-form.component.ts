import { Student } from '../students';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnChanges {

  @Input()
  student: Student = {} as Student;

  @Output()
  saveEvent = new EventEmitter<Student>();
  @Output()
  cleanEvent = new EventEmitter<void>();

 formGroupStudent: FormGroup;
 submitted: boolean = false;
  constructor(private formBuilder: FormBuilder

  ) {
    this.formGroupStudent = formBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.pattern(/\S/)]],
      course: ['', [Validators.required, Validators.pattern(/\S/)]],
      cpf: ['',Validators.required],
      age: ['',Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/\S/)]]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.student.id){
      this.formGroupStudent.setValue(this.student);
    }
  }

  save() {
    this.submitted = true;
    if (this.formGroupStudent.valid) {
      this.saveEvent.emit(this.formGroupStudent.value);
      this.formGroupStudent.reset();
      this.submitted = false;
    }
  }

  clear() {
    this.cleanEvent.emit();
    this.formGroupStudent.reset();
    this.submitted = false;
  }

  get name(): any {
    return this.formGroupStudent.get("name");
  }
  get course(): any {
    return this.formGroupStudent.get("course");
  }
  get cpf(): any {
    return this.formGroupStudent.get("cpf");
  }
  get age(): any {
    return this.formGroupStudent.get("age");
  }
  get phone(): any {
    return this.formGroupStudent.get("phone");
  }
}
