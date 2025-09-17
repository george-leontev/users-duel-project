import { createContext, useContext } from "react";

export type AppDataContextModel = {};

const AppDataContext = createContext({} as AppDataContextModel);

export type AppDataContextProviderProps = object;

function AppDataContextProvider(props: AppDataContextProviderProps) {
    return <AppDataContext.Provider {...props} value={{}} />;
}

const useAppDataContext = () => useContext(AppDataContext);

export { AppDataContextProvider, useAppDataContext };
