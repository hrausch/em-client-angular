/**
 * Created by hrausch on 29/07/16.
 */

export class Student {
    idAluno: number;
    foto: string;
    matricula: string;
    nome: string;
}


export class StudentSummary {

    student : Student;
    alertaSinal: number;
    numeroMediasPerdida:number;
    menorNotaBimestre: number;
    mediaNotaBimestre:number;
    desvioNotaBimestre: number;
    numeroComentarios: number;

}