import { Component, OnInit, Input } from '@angular/core';
import { Leg, Procedure } from 'src/app/state/procedures.model';
import { LegEditorState } from 'src/app/state/legEditor.reducer';
import { setSelectedLeg } from 'src/app/state/legEditor.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-procedure',
  templateUrl: './procedure.component.html',
  styleUrls: ['./procedure.component.css']
})
export class ProcedureComponent implements OnInit {

  @Input() procedure: Procedure|null = null;

  constructor(private store: Store<{ legEditor: LegEditorState }>) {
  }

  clickLeg(leg: Leg) {
    this.store.dispatch(setSelectedLeg({leg}));
  }

  ngOnInit(): void {
  }

}
