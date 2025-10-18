import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { server } from '../../utils/backend-routes/backend.routes';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isLogged = signal<boolean>(false)

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get(server.api.user.base, { observe: 'response' })
  }
}
