import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { server } from '../../utils/backend-routes/backend.routes';
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

  refreshRotation() {
    return this.http.get<{acessToken: string}>(server.api.auth.refreshRotation, {observe: 'response', withCredentials: true })
  }
}
