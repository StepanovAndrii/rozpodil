import { ResolveFn } from '@angular/router';
import { TokenService } from '../../services/authentication/token-service/token.service';
import { DataService } from '../../services/data-service/data.service';
import { inject } from '@angular/core';
import { UUID } from 'crypto';
import { validate as isValidUuid } from 'uuid';
import { IUser } from '../../types/interfaces/user-interface';

export const userResolver: ResolveFn<IUser | null> = async (route, state) => {
  const tokenService: TokenService = inject(TokenService);
  const dataService: DataService = inject(DataService);

  const userId: string | null = tokenService.getUserId();
  console.log("User ID:2", userId);
  if (userId && isValidUuid(userId)) {
    return await dataService.getUserById(userId as UUID);
  }
  console.log("User ID:34", userId);
  return null;
};
