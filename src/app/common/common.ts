import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export function transformError(error: HttpErrorResponse | string) {
  let errorMessage = 'Error desconocido';
  if (typeof error === 'string') {
    errorMessage = error;
  } else if (error.error instanceof ErrorEvent) {
    errorMessage = `Error! ${error.error.message}`;
  } else if (error.status) {
    errorMessage = `La solicitud fallo con error ${error.status} ${error.statusText}`;
  }
  return throwError(errorMessage);
}
