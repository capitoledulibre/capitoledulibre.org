import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Props = {
  transparentOnTop?: boolean
}

const NavBar = ({transparentOnTop}: Props) => {
  const navRef = useRef();
  const [transparent, setTransparent] = useState<boolean>(!!transparentOnTop)

  useEffect(() => {
    if (!transparent) return

    let lastKnownScrollPosition = 0;
    let ticking = false;

    const listener = () => {
      lastKnownScrollPosition = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          setTransparent(lastKnownScrollPosition < 100);
          ticking = false;
        });

        ticking = true;
      }
    }
    window.addEventListener('scroll', listener,{
      capture: false,
      passive: true,
    })


    return () => {
      window.removeEventListener('scroll', listener)
    }
  }, [transparentOnTop, navRef])

  return (
<nav className="navbar navbar-expand-lg bg-light">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTopToggler" aria-controls="navbarTopToggler" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <a className="navbar-brand" href="/"><img src="/img/logo-capitoledulibre.png" height="30px"></img></a>
    <div className="collapse navbar-collapse" id="navbarTopToggler">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link" href="/programme">Programme</a>
        </li>
        {/*
        <li className="nav-item">
          <a className="nav-link" href="/cfp">Appel à participation</a>
        </li>
        */}
        <li className="nav-item">
          <a className="nav-link" href="/venir">Venir</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/partenaires">Nos partenaires</a>
        </li>           
        <li className="nav-item">
          <a className="nav-link" href="/code-of-conduct">Code de conduite</a>
        </li>    
        <li className="nav-item">
          <a className="nav-link" href="/faq">Questions fréquentes</a>
        </li>              
      </ul>
    </div>
  </div>
</nav>


  );
}

export default NavBar;
