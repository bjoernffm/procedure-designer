import { Component, OnInit, Input } from '@angular/core';
import { Leg } from 'src/serializer';

@Component({
  selector: 'app-leg',
  templateUrl: './leg.component.html',
  styleUrls: ['./leg.component.css']
})
export class LegComponent implements OnInit {

  @Input() leg: Leg|null = null;

  constructor() { }

  ngOnInit(): void {
  }

}
