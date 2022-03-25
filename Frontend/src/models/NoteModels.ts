export class NoteRequestModel {
    Title: string;
    Text: string;
    Priority: number;

    constructor(title: string, text: string, priority: number) {
        this.Title = title;
        this.Text = text;
        this.Priority = priority;
    }
}

export interface NoteResponseModel {
    Id: number, 
    Title: string,
    Text: string,
    Priority: number
}
