import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import Busqueda from './pages/Busqueda';
import Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "Catalogo": Catalogo,
    "Busqueda": Busqueda,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: Layout,
};