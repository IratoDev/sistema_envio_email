import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

//icones
import { TfiAlignJustify } from "react-icons/tfi";
import { SlNote } from "react-icons/sl";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { BiMessageError } from "react-icons/bi";

import StyleNav from "./styleNav.module.css";
import Logo from "../../assets/imagens/logo.png";

export function NavBar(){
const [isClienteOpen, setIsClienteOpen] = useState(false);
const [isErroOpen, setIsErroOpen] = useState(false);

const navigate = useNavigate();
const handleNavigation = (path:string) => {
    navigate(path);
};

const handleClienteClick = () => {
    setIsClienteOpen(!isClienteOpen);
};

const handleErroClick = () => {
    setIsErroOpen(!isErroOpen);
};

return(

<>

<header>

<div id={StyleNav.ConteinerNav}>

    <div className={StyleNav.BoxLogo}><img src={Logo} alt="" /></div>

    <nav className={StyleNav.ConteinerButton}>

    <div className={StyleNav.BoxButton}>
        <button onClick={() => handleNavigation('/')}><FaHome/></button>
        <button onClick={handleClienteClick} ><SlNote/>
        {isClienteOpen && (
                <div className={StyleNav.dropdownMenu}>
                <button onClick={() => handleNavigation('/cadastro/cliente')}>Cadastrar</button>
                <button onClick={() => handleNavigation('/consulta/cliente')}>Consultar</button>
                </div>
            )}</button>
        <button onClick={handleErroClick}><BiMessageError />
        {isErroOpen && (
                <div className={StyleNav.dropdownMenu}>
                <button onClick={() => handleNavigation('/cadastrar/erros')}>Cadastrar</button>
                <button onClick={() => handleNavigation('/consulta/erros')}>Consultar</button>
                </div>
            )}</button>
        <button onClick={() => handleNavigation('/email')}><MdOutlineMailOutline/></button>
    
    </div>

    </nav>

</div>

</header>

</>

)

}