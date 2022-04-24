import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LegEditorState } from '../state/legEditor.reducer';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-leg-editor',
  templateUrl: './leg-editor.component.html',
  styleUrls: ['./leg-editor.component.css']
})
export class LegEditorComponent implements OnInit {

  @Input() state: LegEditorState|null = null;

  ngOnInit(): void {
    console.log(this.state);
  }

}
