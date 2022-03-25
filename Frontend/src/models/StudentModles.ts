export class StudentRequestModel {
    Name: string;
    Surname: string;
    Email: string;
    Phone: string;
    
    constructor(name: string, surname: string, email: string, phone: string) {
        this.Name = name;
        this.Surname = surname;
        this.Email = email;
        this.Phone = phone;
    }
}


export interface StudentResponseModel {
    Id: number,
    Name: string,
    Surname: string,
    Email: string,
    Phone: string
}