import { firstValueFrom } from "rxjs";
import { AuthService } from "../services/authentication/auth-service/auth.service";
import { TokenService } from "../services/authentication/token-service/token.service";
import { APP_INITIALIZER, inject, provideAppInitializer, Provider } from "@angular/core";

export const appInitializer = provideAppInitializer(() => {
    const authService: AuthService = inject(AuthService);
    const tokenService: TokenService = inject(TokenService);

    const accessToken = tokenService.getAccessToken();
    if (!accessToken) {
        return firstValueFrom(tokenService.refreshToken()).then(newToken => {
                tokenService.setAccessToken(newToken);
                }).catch(() => {
                authService.logoutAsync()
                });
            }
            return Promise.resolve();
});