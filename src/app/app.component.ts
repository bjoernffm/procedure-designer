import { Component, OnInit } from '@angular/core';
import { Procedure } from 'src/app/state/procedures.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LegEditorState } from './state/legEditor.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';

  procedures: Observable<Procedure[]>;
  legEditor: Observable<LegEditorState>;
  
  names: string[] = ["Kai", "Björn"];

  constructor(private store: Store<{ procedures: Procedure[], legEditor: LegEditorState }>) {
    this.procedures = store.select('procedures');
    this.legEditor = store.select('legEditor');
  }

  ngOnInit(): void {
    /*fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => console.log(json))*/
      //.then(json => json.map((item) => item.title))
  }
}
