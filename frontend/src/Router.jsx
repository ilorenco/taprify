import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

export function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
                <Route element={<DefaultLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/library" element={<Library />} />
                    <Route path="/playlist-details" element={<PlaylistDetails />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/player" element={<Player />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}