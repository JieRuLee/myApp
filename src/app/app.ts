import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'myApp';
  placeholder = 'What needs to be done?'

  toggleAllBtn = false;
  check1 = false;
  check2 = false;

  todoDataList = [
    {
      Status: true,
      Thing: '第一件事'
    },
    {
      Status: false,
      Thing: '第二件事'
    },
    {
      Status: true,
      Thing: '第三件事'
    }
  ]

  toggleAll() {
    this.toggleAllBtn = !this.toggleAllBtn;
    this.check1 = this.toggleAllBtn;
    this.check2 = this.toggleAllBtn;
  }

  clickCheck(item: any) {
    item.Status = !item.Status
  }

  delete(index: number) {
    this.todoDataList.splice(index, 1)
  }

  add(event: KeyboardEvent, input: HTMLInputElement) {
    if (event.key === 'Enter') {
      const value = (event.target as HTMLInputElement).value;
      this.todoDataList.push({
        Status: false,
        Thing: input.value
      });
      input.value = '';
    }
  }
}
