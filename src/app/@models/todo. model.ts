export interface Todo {
    Status: boolean;
    Thing: String;
    Editing: boolean;
}

export class TodoClass {
    Status: boolean;
    Thing: String;

    constructor(_thiing: string, _status: boolean = false) {
        this.Thing = _thiing;
        this.Status = _status;
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