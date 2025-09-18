import { createContext, useCallback, useContext } from "react";
import type { PlayerModel } from "../models/player-model";
import routes from "../constants/app-api-routes";
import { useAuthHttpRequest } from "./use-auth-http-request";
import { HttpConstants } from "../constants/app-http-constants";
import type { ChallengeModel } from "../models/challenge-model";

export type AppDataContextModel = {
    getPlayersAsync: () => Promise<PlayerModel[] | undefined>;
    getPlayerAsync: (playerId: number) => Promise<PlayerModel | undefined>;
    createChallenge: (challengerId: number, challengedId: number) => Promise<ChallengeModel | undefined>;
};

const AppDataContext = createContext({} as AppDataContextModel);

export type AppDataContextProviderProps = object;

function AppDataContextProvider(props: AppDataContextProviderProps) {
    const authHttpRequest = useAuthHttpRequest();

    const getPlayersAsync = useCallback(async () => {
        try {
            const response = await authHttpRequest({
                method: "GET",
                url: routes.players,
            });

            if (response && response.status == HttpConstants.StatusCodes.Ok) {
                return response.data as PlayerModel[];
            }
        } catch (error) {
            console.log(error);
        }
    }, [authHttpRequest]);

    const getPlayerAsync = useCallback(
        async (playerId: number) => {
            const response = await authHttpRequest({
                method: "GET",
                url: `${routes.players}/${playerId}`,
            });

            if (response && response.status == HttpConstants.StatusCodes.Ok) {
                return response.data as PlayerModel;
            }
        },
        [authHttpRequest]
    );

    const createChallenge = useCallback(
        async (challengerId: number, challengedId: number) => {
            const response = await authHttpRequest({
                method: "GET",
                url: `${routes.challenge}/${challengerId}/${challengedId}`,
            });

            if (response && response.status == HttpConstants.StatusCodes.Ok) {
                return response.data as ChallengeModel;
            }
        },
        [authHttpRequest]
    );

    return <AppDataContext.Provider {...props} value={{ getPlayersAsync, getPlayerAsync, createChallenge }} />;
}

const useAppDataContext = () => useContext(AppDataContext);

export { AppDataContextProvider, useAppDataContext };
