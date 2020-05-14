import { Component, OnInit } from '@angular/core';

import * as constants from '../../constants';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  public grid: any;
  public interval: any;

  ngOnInit(): void {
    this.grid = this.createGrid();
  }

  public createGrid() {
    let arr = new Array(constants.rows);
    for(let i = 0; i < constants.cols; i++) {
      arr[i] = new Array(constants.cols);
      for (let j = 0; j < constants.rows; j++) {
        arr[i][j] = 0;        
      }
    }
    return arr;
  }

  public startGame() {
    this.interval = setInterval(() => {
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
    }, 300);
  }

  private countneighbours(row: number, col: number): number {
    let count = 0;
     for(let i = row-1; i<=row+1; i++){
       for(let j= col-1; j<=col+1; j++){
         if((i != row || j!=col) && this.grid[i] && this.grid[i][j]){
          //  The example of the first condition: (0 != 0 || 1!=0) so..
          //if it's false the first it will go to the second one 1!=0.
          //And with this check it wont count mu self as a neighbor.
           if(this.grid[i][j] === 1){
             count++;;
           }
         }
       }
     }
     return count;
  }

  public addCell(i: number, j: number): void {
    const cell = this.grid[i][j];
    this.grid[i][j] = cell === 1 ? 0 : 1;
    console.log(this.countneighbours(i,j));
  }

  public reset() {
    this.grid = this.createGrid();
  }

  public stop() {
    clearInterval(this.interval);
  }
}
