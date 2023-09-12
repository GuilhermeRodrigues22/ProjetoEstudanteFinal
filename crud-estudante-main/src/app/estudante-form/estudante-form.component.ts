import { Estudante } from './../estudantes';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-estudante-form',
  templateUrl: './estudante-form.component.html',
  styleUrls: ['./estudante-form.component.css']
})
export class EstudanteFormComponent implements OnChanges {

  @Input()
  student: Estudante = {} as Estudante;

  @Output()
  saveEvent = new EventEmitter<Estudante>();
  @Output()
  cleanEvent = new EventEmitter<void>();

 formGroupEstudante: FormGroup;
 submitted: boolean = false;
  constructor(private formBuilder: FormBuilder

  ) {
    this.formGroupEstudante = formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      curso: ['', Validators.required],
      cpf: [''],
      idade: [''],
      telefone: ['']
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.formGroupEstudante.setValue(this.student);
  }

  save() {
    this.submitted = true;
    if (this.formGroupEstudante.valid) {
      this.saveEvent.emit(this.formGroupEstudante.value);
      this.formGroupEstudante.reset();
      this.submitted = false;
    }
  }

  deletar() {
    this.cleanEvent.emit();
    this.formGroupEstudante.reset();
    this.submitted = false;
  }

  get name(): any {
    return this.formGroupEstudante.get("name");
  }
  get curso(): any {
    return this.formGroupEstudante.get("curso");
  }
}
