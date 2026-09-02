// import { Service, inject } from '@angular/core';

// import { HttpClient } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { Status } from '../models/interfaces/status.interface';
// import { Call } from '../models/classes/call.model';
// import { ConfigService } from '../core/config-service/config-service';

// @Service()
// export class CallsService {
//   http = inject(HttpClient);
//   configService = inject(ConfigService);

//   getCalls(): Observable<Call[]> {
//     return this.http.get<Call[]>(this.configService.appConfig.callsApiUrl)
//     .pipe(
// 			catchError(error => {
// 				return throwError(() => error);  // Re-throw the error to be caught by subscribe or bubble to top to common handling error logic
// 		}));
//   }

//   getStatusLookup(): Observable<Status[]> {
//     return this.http.get<Status[]>(this.configService.appConfig.statusApiUrl)
//     .pipe(
// 			catchError(error => {
// 				return throwError(() => error);
// 		}));
//   }

//   createCall(call: Call): Observable<Call> {
//     return this.http.post<Call>(this.configService.appConfig.callsApiUrl, call)
//     .pipe(
// 			catchError(error => {
// 				return throwError(() => error);
// 		}));
//   }

// }
