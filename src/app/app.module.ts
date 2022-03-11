import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { ProcedureComponent } from './procedure/procedure.component';
import { LegComponent } from './leg/leg.component';
import { LegEditorComponent } from './leg-editor/leg-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    ProcedureComponent,
    LegComponent,
    LegEditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
