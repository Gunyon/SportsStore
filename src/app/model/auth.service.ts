import { Injectable } from '@angular/core';
import { RestDataSource } from './rest.datasource';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private datasource: RestDataSource) { }

  authenticate(username: string, password: string) {
    return this.datasource.authenticate(username, password);
  }

  get authenticated(): boolean {
    return this.datasource.auth_token !== null;
  }

  clear() {
    this.datasource.auth_token = null;
  }
}
