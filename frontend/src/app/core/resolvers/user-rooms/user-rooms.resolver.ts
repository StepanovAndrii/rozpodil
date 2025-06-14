import { ResolveFn } from '@angular/router';
import { UUID } from 'crypto';
import { TokenService } from '../../services/authentication/token-service/token.service';
import { inject } from '@angular/core';
import { DataService } from '../../services/data-service/data.service';
import { validate as isValidUuid } from 'uuid';
import { IRoom } from '../../types/interfaces/room-interface';

export const userRoomsResolver: ResolveFn<IRoom[]> = async (route, state) => {
  const tokenService: TokenService = inject(TokenService);
  const dataService: DataService = inject(DataService);

  const userId: string | null = tokenService.getUserId();

  if (userId && isValidUuid(userId)) {
    return await dataService.getRoomsByUserId(userId as UUID);
  }

  return [];
};
