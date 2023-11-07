import { Student } from '../students';
import { StudentsService } from '../students.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-estudante',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  students: Student[] = [];
  student: Student = {} as Student;
  isEditing: boolean = false;
  isSubmitted: boolean = false;
  constructor(private StudentsService: StudentsService) {
  }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.StudentsService.getStudents().subscribe({
      next: data => this.students = data
    });
  }

  onCleanEvent() {
    this.student = {} as Student;
    this.isSubmitted = false;
    this.isEditing = false;
  }

  onSaveEvent(student: Student) {
    if (this.isEditing) {
      this.StudentsService.update(student).subscribe(
        {
          next: () => {
            this.loadStudents();
            this.isEditing = false;
            this.isSubmitted = true;
          }

        }
      );
    }
    else {
      this.StudentsService.save(student).subscribe(
        {
          next: data => {
            this.students.push(data);
            this.isSubmitted = false;
          }
        }
      );
    }
}

edit(Student: Student) {
  this.student = Student;
  this.isEditing = true;
}

delete(student: Student) {
  this.StudentsService.delete(student).subscribe(
    {
      next: () => this.loadStudents()
    }
  );
}
}
