import { createContext, useCallback, useContext } from "react";
import type { PlayerModel } from "../models/player-model";
import routes from "../constants/app-api-routes";
import { useAuthHttpRequest } from "./use-auth-http-request";
import { HttpConstants } from "../constants/app-http-constants";

export type AppDataContextModel = {
    getUsersAsync: () => Promise<PlayerModel[] | undefined>;
};

const AppDataContext = createContext({} as AppDataContextModel);

export type AppDataContextProviderProps = object;

function AppDataContextProvider(props: AppDataContextProviderProps) {
    const authHttpRequest = useAuthHttpRequest();

    const getPlayersAsync = useCallback(async () => {
        try {
            const responce = await authHttpRequest({
                method: "GET",
                url: routes.players,
            });

            if (responce && responce.status == HttpConstants.StatusCodes.Ok) {
                return responce.data as PlayerModel[];
            }
        } catch (error) {
            console.log(error);
        }
    }, [authHttpRequest]);

    return <AppDataContext.Provider {...props} value={{ getUsersAsync: getPlayersAsync }} />;
}

const useAppDataContext = () => useContext(AppDataContext);

export { AppDataContextProvider, useAppDataContext };
