/* eslint-disable no-unused-vars */
import { HttpErrorResponse } from '@angular/common/http'
import { throwError } from 'rxjs'
import { ErrorHandler, Injectable } from '@angular/core'

@Injectable()
export class HandleError implements ErrorHandler {
  handleError (error: HttpErrorResponse) {
    console.log(error)
    return throwError(error.error.message)
  };
}
