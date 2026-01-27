import Admin from './pages/Admin';
import Busqueda from './pages/Busqueda';
import Catalogo from './pages/Catalogo';
import Home from './pages/Home';
import RedesSociales from './pages/RedesSociales';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Admin": Admin,
    "Busqueda": Busqueda,
    "Catalogo": Catalogo,
    "Home": Home,
    "RedesSociales": RedesSociales,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};