import { CanMatchFn } from '@angular/router';
import { UserRole } from '../../../types/user-role-enum';
import { StorageService } from '../../../services/storage-service/storage.service';
import { inject } from '@angular/core';

export const roleMatchGuard = (allowedRoles: UserRole): CanMatchFn => {
    const stringStorage: StorageService<string> = inject(StorageService<string>);

    return (route, segments): boolean => {
        if (stringStorage.getItem<string>("token")) {
            return false;
        }
        
        return true;
    };
}