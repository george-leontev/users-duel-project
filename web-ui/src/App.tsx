import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider, useAuth } from "./contexts/app-auth-context";
import { HomePage } from "./pages/home-page";
import { AppDataContextProvider } from "./contexts/app-data-context";
import { SighInPage } from "./pages/sign-in-page";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated() ? <>{children}</> : <Navigate to='/sign-in' />;
};

function App() {
    return (
        <Router>
            <AuthProvider>
                <AppDataContextProvider>
                    <Routes>
                        <Route path='/sign-in' element={<SighInPage />} />
                        <Route
                            path='/home'
                            element={
                                <ProtectedRoute>
                                    <HomePage />
                                </ProtectedRoute>
                            }
                        />
                        <Route path='/' element={<Navigate to='/home' />} />
                    </Routes>
                </AppDataContextProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
