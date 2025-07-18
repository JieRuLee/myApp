export interface Todo {
    Status: boolean;
    Thing: string;
    Editing: boolean;
    TodoId: string;
}

export class TodoClass {
    Status: boolean;
    Thing: String;
    Editing: boolean;
    TodoId: string;

    constructor(_thiing: string, _status: boolean = false) {
        this.Thing = _thiing;
        this.Status = _status;
        this.Editing =  false;
        this.TodoId = '';
    }
    toggle() {
        this.Status = !this.Status;
    }
}

export enum  TodoStatusType {
    All,
    Active,
    Completed
}