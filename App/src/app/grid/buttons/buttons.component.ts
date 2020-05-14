import { Component, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent {
  @Output() startGame = new EventEmitter();
  @Output() resetGame = new EventEmitter();
  @Output() stopGame = new EventEmitter();

  public start(): void {
    this.startGame.emit();  
  }

  public reset(): void {
    this.resetGame.emit();
  }

  public stop() {
    this.stopGame.emit();
  }
}
