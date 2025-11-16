import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DefaultLayout } from './layouts/DefaultLayout';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Home } from './pages/Home';
import { Search } from './pages/Search';
import { Library } from './pages/Library';

export function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route element={<DefaultLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/library" element={<Library />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}