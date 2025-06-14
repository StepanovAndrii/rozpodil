import { OAuthProviders } from "../oauth-providers/oauth-providers";

export interface State {
    provider: OAuthProviders,
    uniqueString: string
}