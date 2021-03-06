import { Component, OnInit } from '@angular/core';

import * as constants from '../../constants';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  public grid: Array<number[]>;
  public speed: number = constants.maxSpeed;
  public gameStarted: boolean = false;
  public interval;

  ngOnInit(): void {
    this.grid = this.createGrid();
  }

  public createGrid(): Array<number[]> {
    let arr = new Array(constants.rows);
    for(let i = 0; i < constants.cols; i++) {
      arr[i] = new Array(constants.cols).fill(0);
    }
    return arr;
  }

  public startGame(): void {
    this.gameStarted = true;
    this.interval = setInterval(() => {
      console.log(typeof this.interval)
      const nextGrid = this.createGrid();

      for(let i = 0; i < constants.rows; i++) {
        for(let j = 0; j < constants.cols; j++) {
          const neighbours = this.countneighbours(i, j);
          if(this.grid[i][j] === 1) {
            if(neighbours < 2) {
              nextGrid[i][j] = 0;
            } else if(neighbours > 3) {
              nextGrid[i][j] = 0;
            } else if(neighbours >= 2 && neighbours <= 3) {
              nextGrid[i][j] = 1;
            }
          } else if(neighbours === 3) {
            nextGrid[i][j] = 1;
          }
        }
      }
      this.grid = nextGrid;
    }, this.speed);
  }

  private countneighbours(row: number, col: number): number {
    let neighbours = 0;
     for(let i = row-1; i<=row+1; i++){
       for(let j= col-1; j<=col+1; j++){
         if((i != row || j!=col) && this.grid[i] && this.grid[i][j]){
           if(this.grid[i][j] === 1){
            neighbours++;
           }
         }
       }
     }
     return neighbours;
  }

  public addCell(row: number, col: number): void {
    const cell = this.grid[row][col];
    this.grid[row][col] = cell === 1 ? 0 : 1;
  }

  public resetGame(): void {
    this.grid = this.createGrid();
  }

  public stopGame(): void {
    this.gameStarted = false;
    clearInterval(this.interval);
  }

  public inreaseSpeed(): void {
    if(this.speed-100 >= constants.maxSpeed) {
      this.speed-=100;
      if(this.gameStarted) {
        setTimeout(() => {
          this.stopGame();
          this.startGame();
        }, 300);
      }
    }
  }
  
  public decreaseSpeed(): void {
    if(this.speed+100 <= constants.minSpeed && this.gameStarted) {
      this.speed+=100;
      if(this.gameStarted) {
        setTimeout(() => {
          this.stopGame();
          this.startGame();
        }, 300);
      }
    }
  }
}
