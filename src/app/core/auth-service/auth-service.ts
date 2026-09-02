/* eslint-disable @typescript-eslint/no-unused-vars */
import { signal, Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//import { UserInfo } from '../../models/classes/user-info.model';
//import { UserRoles } from '../../models/enums/user-roles.enum';
import { ConfigService } from '../config-service/config-service';

@Service()
export class AuthService {
  isAuthorized = signal(false);
  //userInfo = signal<UserInfo | null>(null);

  http = inject(HttpClient);
  configService = inject(ConfigService);

  authenticate(): Promise<void> {
    return new Promise((resolve, reject) => {
      resolve();
    });

    // return new Promise((resolve, reject) => {
    //     this.http.get<UserInfo>(this.configService.appConfig.userInfoApiUrl)
    //     .subscribe({
    //       next: (user: UserInfo) => {
    //         if(user) {
    //           this.userInfo.set(user);
    //           if (user.roles && user.roles.length > 0 && (user.roles.includes(UserRoles.Admin) || user.roles.includes(UserRoles.User))) {
    //             this.isAuthorized.set(true);
    //           }
    //         }
    //         resolve();
    //       },
    //       error: (err: any) => {
    //         console.log('Error: ' + JSON.stringify(err));
    //         reject(err);
    //       }
    //     });
    // });

  }
}
