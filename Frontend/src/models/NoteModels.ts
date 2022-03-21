export class NoteRequestModel {
    Id?: number;//!!Need i that?
    Title: string;
    Text: string;
    Priority: number;

    constructor(title: string, text: string, priority: number, id?: number,) {
        this.Title = title;
        this.Text = text;
        this.Priority = priority;
        if(id) this.Id = id;
    }

}

export interface NoteResponseModel {
    Id: number, 
    Title: string,
    Text: string,
    Priority: number
}
