import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Todo, TodoClass, TodoStatusType } from './@models/todo. model';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [FormsModule],
})

export class App {
  title = 'myApp';
  placeholder = 'What needs to be done?'
  toggleAllBtn = false;
  nowTodoStatusType = TodoStatusType.All;
  TodoStatusType = TodoStatusType;
  todoInputModel = '';

  todoDataList: Todo[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getData()
  }

  getData(){
    this.http.get<Todo[]>('/api/todo2_16').subscribe(data => {
      this.todoDataList = data
    });
  }

  toggleAll() {
    this.toggleAllBtn = !this.toggleAllBtn;
    this.todoDataList.forEach(data => {
      data.Status = this.toggleAllBtn;
    });

    this.http.put('/api/todo2_16/Status/' + this.toggleAllBtn, null).subscribe();
  }

  clickCheck(item: Todo) {
    item.Status = !item.Status;
    this.http.put('/api/todo2_16/'+ item.TodoId, item).subscribe();
    this.checkToggleAllBtn()
  }

  checkToggleAllBtn(){
    if (this.todoCompleted.length === this.todoDataList.length) {
      this.toggleAllBtn = true;
    } else {
      this.toggleAllBtn = false;
    }
  }

  delete(item: Todo) {
    this.http.delete('/api/todo2_16/' + item.TodoId).subscribe();
    this.todoDataList = this.todoDataList.filter(data => data !== item)
  }

  update(item: Todo){
    this.http.put('/api/todo2_16/'+ item.TodoId, item).subscribe();
    item.Editing = false;
  }

  add() {
    const todo: Todo = {
      Status: false,
      Thing: this.todoInputModel,
      Editing: false,
      TodoId: '',
    }
    this.http.post<Todo>('/api/todo2_16', todo).subscribe((data) => {
      this.todoDataList.push(data);
    });
    this.todoInputModel = '';
  }

  edit(item: Todo) {
    item.Editing = true;
  }

  setTodoStatusType(type: TodoStatusType) {
    this.nowTodoStatusType = type;
  }

  get nowTodoList(): Todo[] {
    let list: Todo[] = [];
    switch (this.nowTodoStatusType) {
      case TodoStatusType.Active:
        list = this.todoActive;
        break;
      case TodoStatusType.Completed:
        list = this.todoCompleted;
        break;
      default:
        list = this.todoDataList;
        break;
    }

    return list;
  }


  get todoActive(): Todo[] {
    return this.todoDataList.filter(data => !data.Status)
  }

  get todoCompleted(): Todo[] {
    return this.todoDataList.filter(data => data.Status)
  }

  clearCompleted() {
    this.http.delete('/api/todo2_16/clearCompleted').subscribe();
    this.todoDataList = this.todoActive;
  }
}
