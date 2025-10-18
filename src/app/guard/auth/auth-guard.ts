import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { UserService } from '../../service/user/user';

export const authGuard: CanActivateFn = (childRoute, state) => {
  const userService = inject(UserService);
  const isLogged: boolean = userService.isLogged()

  if (isLogged === true) return true;
  
  const router = inject(Router)
  router.navigate(['/login'])
  return false
};

export const authGuardChild: CanActivateChildFn = (childRoute, state) => {
  const userService = inject(UserService);
  const isLogged: boolean = userService.isLogged()

  if (isLogged === true) return true;
  
  const router = inject(Router)
  router.navigate(['/login'])
  return false
};
