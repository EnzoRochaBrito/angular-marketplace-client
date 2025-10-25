import { inject } from '@angular/core';
import { ActivatedRoute, CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { UserService } from '../../service/user/user';
import { ReturnBuffer } from '../../utils/return-to';

export const authGuard: CanActivateFn = (childRoute, state) => {
  const userService = inject(UserService);
  const router = inject(Router)
  const returnBuffer = inject(ReturnBuffer)
  const isLogged: boolean = userService.isLogged()

  if (isLogged === true) return true;
  
  const redirectToBuffer = router.url
  returnBuffer.setPath(redirectToBuffer)

  router.navigate(['/login'])
  return false
};

export const authGuardChild: CanActivateChildFn = (childRoute, state) => {
  const userService = inject(UserService);
  const router = inject(Router)
  const returnBuffer = inject(ReturnBuffer)
  const isLogged: boolean = userService.isLogged()

  if (isLogged === true) return true;
  
  const redirectToBuffer = router.url
  returnBuffer.setPath(redirectToBuffer)

  router.navigate(['/login'])
  return false
};
