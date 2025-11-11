import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import Busqueda from './pages/Busqueda';
import Admin from './pages/Admin';
import RedesSociales from './pages/RedesSociales';
import Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "Catalogo": Catalogo,
    "Busqueda": Busqueda,
    "Admin": Admin,
    "RedesSociales": RedesSociales,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: Layout,
};