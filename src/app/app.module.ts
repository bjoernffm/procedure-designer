import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { proceduresReducer } from 'src/app/state/procedures.reducer';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { ProcedureComponent } from './procedure/procedure.component';
import { LegComponent } from './leg/leg.component';
import { LegEditorComponent } from './leg-editor/leg-editor.component';
import { InputComponent } from './input/input.component';
import { legEditorReducer } from 'src/app/state/legEditor.reducer';

@NgModule({
  declarations: [
    AppComponent,
    ProcedureComponent,
    LegComponent,
    LegEditorComponent,
    InputComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ procedures: proceduresReducer, legEditor: legEditorReducer }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
