import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Todo, TodoClass, TodoStatusType } from './@models/todo. model';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'myApp';
  placeholder = 'What needs to be done?'
  toggleAllBtn = false;
  nowTodoStatusType = TodoStatusType.All;
  TodoStatusType = TodoStatusType;

  todoDataList: Todo[] = [
    {
      Status: true,
      Thing: '第一件事',
      Editing: false
    },
    {
      Status: false,
      Thing: '第二件事',
      Editing: false
    },
    {
      Status: true,
      Thing: '第三件事',
      Editing: false
    }
  ]

  toggleAll() {
    this.toggleAllBtn = !this.toggleAllBtn;
    this.todoDataList.forEach(data =>{
      data.Status = this.toggleAllBtn;
    })
  }

  clickCheck(item: Todo) {
    item.Status = !item.Status;
    if(this.todoCompleted.length === this.todoDataList.length){
      this.toggleAllBtn = true;
    } else {
      this.toggleAllBtn = false;
    }
  }

  delete(todo: Todo) {
    this.todoDataList = this.todoDataList.filter(data => data !== todo)
    console.log(this.todoDataList)
  }

  add(value: string) {
    const todo: Todo = {
      Status: false,
      Thing: value,
      Editing: false
    }
    this.todoDataList.push(todo)
  }

  edit(item: Todo){
    item.Editing = true;
  }

  update(item: Todo, value: string){
    item.Thing = value;
    item.Editing = false;
  }

  setTodoStatusType(type: number){
    this.nowTodoStatusType = type;
  }

  get nowToddoList(): Todo[]{
    let list : Todo[] = [];
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


  get todoActive(): Todo[]{
    return this.todoDataList.filter(data => !data.Status)
  }

  get todoCompleted(): Todo[]{
    return this.todoDataList.filter(data => data.Status)
  }

  clearCompleted(){
    this.todoDataList = this.todoActive;
  }
}
