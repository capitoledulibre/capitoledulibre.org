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
    <nav id="mainNav" ref={navRef} className={`navbar navbar-default navbar-fixed-top ${transparent ? 'affix-top' : 'affix'}`}>
      <div className="container-fluid">
        {/* Brand and toggle get grouped for better mobile display */}
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
            <span className="sr-only">Toggle navigation</span> Menu <i className="fas fa-bars"></i>
          </button>
          <Link href="/#page-top" className="navbar-brand page-scroll">
            Capitole du Libre 2023
          </Link>
        </div>

        {/* Collect the nav links, forms, and other content for toggling */}
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a className="page-scroll" href="/#about">About</a>
            </li>
            <li>
              <a className="page-scroll" href="/#event">L'événement</a>
            </li>
            {/*
            <li>
              <a className="page-scroll" href="/#cfp">Appel à participation</a>
  </li> */}
            <li>
              <Link href="/programme" className="page-scroll">
                Programme
              </Link>
            </li>
            <li>
              <a className="page-scroll" href="/#portfolio">Quelques images</a>
            </li>
            <li>
              <a className="page-scroll" href="/#partners">Partenaires</a>
            </li>
            <li>
              <a className="page-scroll" href="/#contact">Nous contacter</a>
            </li>
            <li>
              <Link href="/code-of-conduct" className="page-scroll">
                Code de Conduite
              </Link>
            </li>
            <li>
              <a className="page-scroll" href="/#come">Venir</a>
            </li>
            <li>
              <a className="page-scroll" href="/#accomodation">Se loger</a>
            </li>
          </ul>
        </div>
        {/* /.navbar-collapse */}
      </div>
      {/* /.container-fluid */}
    </nav>
  );
}

export default NavBar;