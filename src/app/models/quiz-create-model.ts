export class QuizCreateModel {
    Title : string;
    Description : string;

    constructor(title:string,description : string){
        this.Description = description;
        this.Title = title;
    }
}
