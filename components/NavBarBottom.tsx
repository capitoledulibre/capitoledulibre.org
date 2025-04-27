import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const NavBarBottom = () => {

  return (
<nav className="navbar bg-light">
  Éditions précédentes:
  <div className="container-fluid">
    <a className="nav-link" href="//2011.capitoledulibre.org">2011</a>
    <a className="nav-link" href="//2012.capitoledulibre.org">2012</a>
    <a className="nav-link" href="//2013.capitoledulibre.org">2013</a>
    <a className="nav-link" href="//2014.capitoledulibre.org">2014</a>
    <a className="nav-link" href="//2015.capitoledulibre.org">2015</a>
    <a className="nav-link" href="//2016.capitoledulibre.org">2016</a>
    <a className="nav-link" href="//2017.capitoledulibre.org">2017</a>
    <a className="nav-link" href="//2018.capitoledulibre.org">2018</a>
    <a className="nav-link" href="//2019.capitoledulibre.org">2019</a>    
    <a className="nav-link" href="//2022.capitoledulibre.org">2022</a>
    <a className="nav-link" href="//2023.capitoledulibre.org">2023</a>
    <a className="nav-link" href="//2024.capitoledulibre.org">2024</a>
  </div>
</nav>
  );
}

export default NavBarBottom;
