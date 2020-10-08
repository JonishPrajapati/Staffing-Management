import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class DialogBoxService {

constructor(private snacBar: MatSnackBar) { }
openSnackBar(message,action){
  this.snacBar.open(message, action,{
    duration:3000,
    panelClass: ['login-snackbar'],
    verticalPosition: 'top',
    horizontalPosition: 'right',
  })
}

}
