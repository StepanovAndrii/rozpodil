import { ResolveFn } from '@angular/router';
import { IRoom } from '../../types/interfaces/room-interface';
import { TokenService } from '../../services/authentication/token-service/token.service';
import { DataService } from '../../services/data-service/data.service';
import { inject } from '@angular/core';
import { validate as isValidUuid } from 'uuid';
import { UUID } from 'crypto';

export const userRoomResolver: ResolveFn<IRoom | null> = async (route, state) => {
  const tokenService: TokenService = inject(TokenService);
  const dataService: DataService = inject(DataService);

  const userId: string | null = tokenService.getUserId();
  console.log(userId + "userId")

  if (userId && isValidUuid(userId)) {
    console.log(userId + "userId")
    const result = await dataService.getRoomsByUserId(userId as UUID, 1);
    return result[0];
  }
  else {
    console.log("немає userId")
  }

  return null;
};
