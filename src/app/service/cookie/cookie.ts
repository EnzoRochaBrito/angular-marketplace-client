import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  setCookie(key: string, val: string, seconds?: number): void {
    document.cookie = `${key}=${val}; Path=/; Max-Age=${seconds}`
  }

  getCookie(key: string): string | void {
    const cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
      const [k, v] = cookie.split('=')
      if (k === key) {
        return v
      }
    }
  }

  delCookie(key: string): void {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'`
  }
}
