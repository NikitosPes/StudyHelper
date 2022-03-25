export interface IStudentModel {
    Id: number,
    Name: string,
    Surname: string,
    Email: string,
    Phone: string
}

export class StudentRequestModel {
    Name: string;
    Surname: string;
    Email: string;
    Phone: string;

    constructor(name: string, surname: string, email: string, phone: string){
        this.Name = name;
        this.Surname = surname;
        this.Email = email;
        this.Phone = phone;
    }
}

export interface IScheduleRowModel {
    Id: number,
    Time: string,
    SubjectName: string
}

export interface INoteModel {
    Id: number, 
    Title: string,
    Text: string,
    Priority: number
}


export interface ISubjectModel {
    Id: number,
    Name: string,
    ClassroomURL: string
}

//NOTES

export interface ArraysOfNotes {
    urgentImportant: INoteModel[],
    notUrgentImportant: INoteModel[],
    urgentNotImportant: INoteModel[],
    notUrgentNotImportant: INoteModel[]
}

export type curentNoteType = {
    value: INoteModel | null,
    setValue: (note: INoteModel | null) => void,
    changePriority: (note: INoteModel, newPriority: number) => void, 
    setModalActive: (status: boolean) => void
}