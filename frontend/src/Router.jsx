import { Routes, Route } from 'react-router-dom';
import { DefaultLayout } from './layouts/DefaultLayout';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Home } from './pages/Home';
import { Search } from './pages/Search';
import { Library } from './pages/Library';
import { PlaylistDetails } from './pages/PlaylistDetails';
import { Profile } from './pages/Profile';
import { NotFound } from './pages/NotFound';
import { Player } from './pages/Player';
import { PrivateRoute } from './components/PrivateRoute';

export function Router() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
            <Route
                element={
                    <PrivateRoute>
                        <DefaultLayout />
                    </PrivateRoute>
                }
            >
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/library" element={<Library />} />
                <Route path="/playlist/:albumId" element={<PlaylistDetails />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/player" element={<Player />} />
            </Route>
        </Routes>
    )
}