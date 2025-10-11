import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { server } from '../../utils/backend-routes/vars';
import { AuthResponse, LoginDto, RegisterDto } from '../../utils/types/auth.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(dto: LoginDto) {
    return this.http.post<AuthResponse>(server.api.auth.login, dto, { observe: 'response', withCredentials: true })
  }
  
  register(dto: RegisterDto) {
    return this.http.post<AuthResponse>(server.api.auth.register, dto, { observe: 'response', withCredentials: true })
  }
}
