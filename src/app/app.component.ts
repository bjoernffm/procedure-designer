import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Procedure, Serializer } from 'src/serializer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  favoriteColorControl = new FormControl("SID:010,5,DOME2C,RW25, , , , ,    , ,   ,CA, , , , , ,      ,    ,    ,2500,    ,+,00600,     ,05000, ,   ,    ,   ,EDDG,ED,P,A, , , , ;\nSID:020,5,DOME2C,RW25,DG021,ED,P,C,E   , ,   ,DF, , , , , ,      ,    ,    ,    ,    , ,     ,     ,     , ,   ,    ,   , , , , , , , , ;\nSID:030,5,DOME2C,RW25,DOMEG,ED,E,A,EE  , ,   ,TF, , , , , ,      ,    ,    ,    ,    , ,     ,     ,     , ,   ,    ,   , , , , , , , , ;");

  procedures: Procedure[] = [];

  parse() {
    console.log(this.favoriteColorControl.value);
    this.procedures = Serializer.deserialize(this.favoriteColorControl.value);
    console.log(this.procedures);
  }
}
