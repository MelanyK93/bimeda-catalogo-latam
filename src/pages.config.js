import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import Busqueda from './pages/Busqueda';
import Admin from './pages/Admin';
import Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "Catalogo": Catalogo,
    "Busqueda": Busqueda,
    "Admin": Admin,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: Layout,
};