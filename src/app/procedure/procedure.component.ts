import { Component, OnInit, Input } from '@angular/core';
import { Procedure } from 'src/serializer';

@Component({
  selector: 'app-procedure',
  templateUrl: './procedure.component.html',
  styleUrls: ['./procedure.component.css']
})
export class ProcedureComponent implements OnInit {

  @Input() procedure: Procedure|null = null;

  constructor() { }

  ngOnInit(): void {
  }

}
