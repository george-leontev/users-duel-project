import axios from "axios";
import { createContext, useCallback, useContext } from "react";
import type { PlayerModel } from "../models/player-model";

export type AppDataContextModel = {
    getUsersAsync: () => Promise<PlayerModel[] | undefined>;
};

const AppDataContext = createContext({} as AppDataContextModel);

export type AppDataContextProviderProps = object;

function AppDataContextProvider(props: AppDataContextProviderProps) {
    const getPlayersAsync = useCallback(async () => {
        try {
            const responce = await axios.request({
                method: "GET",
                url: "http://localhost:3000/api/players",
            });

            if (responce && responce.status == 200) {
                return responce.data as PlayerModel[];
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    return <AppDataContext.Provider {...props} value={{ getUsersAsync: getPlayersAsync }} />;
}

const useAppDataContext = () => useContext(AppDataContext);

export { AppDataContextProvider, useAppDataContext };
