import { Component, OnInit } from '@angular/core';
import { Procedure } from 'src/app/state/procedures.model';
import { Store } from '@ngrx/store';
import { setData } from 'src/app/state/procedures.actions';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {

  inputControl = new FormControl("SID:010,5,DOME2C,RW25, , , , ,    , ,   ,CA, , , , , ,      ,    ,    ,2500,    ,+,00600,     ,05000, ,   ,    ,   ,EDDG,ED,P,A, , , , ;\nSID:020,5,DOME2C,RW25,DG021,ED,P,C,E   , ,   ,DF, , , , , ,      ,    ,    ,    ,    , ,     ,     ,     , ,   ,    ,   , , , , , , , , ;\nSID:030,5,DOME2C,RW25,DOMEG,ED,E,A,EE  , ,   ,TF, , , , , ,      ,    ,    ,    ,    , ,     ,     ,     , ,   ,    ,   , , , , , , , , ;\nAPPCH:010,A,I27,WRB,WRB,ED,D, ,V  C, ,   ,IF, , , , , ,      ,    ,    ,    ,    , ,     ,     ,     , ,   ,    ,   , , , , , ,0,D,S;\nAPPCH:020,A,I27,WRB,WRB,ED,D, ,V   , ,   ,FD, ,WRB,ED,D, ,      ,0000,0000,0950,0183,+,03000,     ,     , ,   ,    ,   , , , , , ,0,D,S;\nAPPCH:030,A,I27,WRB,CI27,ED,P,C,EE  ,R,   ,CF,Y,IKSW,ED,P,I,      ,0929,0082,2730,0010,+,02500,     ,     , ,   ,    ,   , , , , , ,0,D,S;\nAPPCH:010,I,I27, ,CI27,ED,P,C,E  I, ,   ,IF, ,IKSW,ED,P,I,      ,0929,0082,    ,    ,J,02500,02500,     , ,   ,    ,   , , , , , ,0,D,S;\nAPPCH:020,I,I27, ,LALTU,ED,P,C,E  F, ,   ,CF, ,IKSW,ED,P,I,      ,0929,0067,2730,0015,H,02500,02500,     , ,   ,-300,   ,EDVK,ED,P,A, ,0,D,S;\nAPPCH:030,I,I27, ,RW27,ED,P,G,G  M, ,   ,CF, ,IKSW,ED,P,I,      ,0929,0015,2730,0052, ,00852,     ,     , ,   ,-300,   , , , , , ,0,D,S;\nAPPCH:040,I,I27, ,RW27,ED,P,G,G M , ,   ,FD, ,DKS,ED,D, ,      ,    ,0002,2730,0056, ,     ,     ,     , ,   ,    ,   , , , , , ,0,D,S;\nAPPCH:050,I,I27, ,WRB,ED,D, ,VE H, ,   ,CF, ,WRB,ED,D, ,      ,0000,0000,3110,0080, ,04000,     ,     , ,   ,    ,   , , , , , ,0,D,S;\nSTAR:010,4,ANJLL4,OTOOL,OTOOL,K2,E,A,E   , ,   ,IF, , , , , ,      ,    ,    ,    ,    , ,     ,     ,18000, ,   ,    ,   , , , , , , , , ;\nSTAR:020,4,ANJLL4,OTOOL,BCALL,K2,E,A,E   , ,   ,TF, , , , , ,      ,    ,    ,    ,    ,B,FL280,FL240,     , ,280,    ,   , , , , , , , , ;\nSTAR:030,4,ANJLL4,OTOOL,LEMMN,K2,P,C,E   , ,   ,TF, , , , , ,      ,    ,    ,    ,    ,+,FL240,     ,     , ,   ,    ,   , , , , , , , , ;\nSTAR:040,4,ANJLL4,OTOOL,ANJLL,K2,E,A,EE H, ,   ,TF, , , , , ,      ,    ,    ,    ,    ,B,FL240,FL190,     , ,   ,    ,   , , , , , , , , ;\nSTAR:010,5,ANJLL4,ALL,ANJLL,K2,E,A,E  H, ,   ,IF, , , , , ,      ,    ,    ,    ,    ,B,FL240,FL190,18000, ,   ,    ,   , , , , , , , , ;\nSTAR:020,5,ANJLL4,ALL,CAANN,K2,E,A,E   , ,   ,TF, , , , , ,      ,    ,    ,    ,    ,+,17000,     ,     , ,   ,    ,   , , , , , , , , ;\nSTAR:030,5,ANJLL4,ALL,BOYEL,K2,E,A,E  H, ,   ,TF, , , , , ,      ,    ,    ,    ,    ,+,14000,     ,     , ,   ,    ,   , , , , , , , , ;\nSTAR:040,5,ANJLL4,ALL,CRCUS,K2,E,A,EE H, ,   ,TF, , , , , ,      ,    ,    ,    ,    ,B,14000,12000,     , ,270,    ,   , , , , , , , , ;");

  constructor(private store: Store<{ procedures: Procedure[] }>) {
  }

  parse() {
    this.store.dispatch(setData({data: this.inputControl.value}));
    //this.procedures = Serializer.deserialize(this.favoriteColorControl.value);
    //console.log(this.procedures);
  }

}
