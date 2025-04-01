import { CanActivateFn } from '@angular/router';
import { AccessControlService } from '../../services/access-control-service/access-control.service';
import { inject } from '@angular/core';

export const canAccessGuard: CanActivateFn = () => {
  const accessControlService = inject(AccessControlService);
  return accessControlService.check();
};