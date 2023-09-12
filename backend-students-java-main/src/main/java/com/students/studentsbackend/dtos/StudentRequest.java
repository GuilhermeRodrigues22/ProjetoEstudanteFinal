package com.students.studentsbackend.dtos;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public record StudentRequest(
    
    @NotBlank(message = "Nome não pode ser em branco")
    String name,
    
    @Min(value = 0, message = "CPF não pode ser em branco")
    String cpf,

    @Min(value = 0, message = "Idade não pode ser em branco")
    String idade,

    @NotBlank(message = "Telefone não pode ser em branco")
    String telefone,

    @NotBlank(message = "Curso não pode ser em branco")
    String curso
) {
    
}