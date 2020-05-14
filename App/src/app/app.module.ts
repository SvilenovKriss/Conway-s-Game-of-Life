import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule} from '@angular/material/button';

import { AppComponent } from './app.component';
import { GridComponent } from './grid/grid.component';
import { ButtonsComponent } from './grid/buttons/buttons.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    ButtonsComponent
  ],
  imports: [
    BrowserModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
