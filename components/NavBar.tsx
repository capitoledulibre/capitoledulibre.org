import Link from "next/link";

const NavBar = () => (
    <nav id="mainNav" className="navbar navbar-default navbar-fixed-top">
    <div className="container-fluid">
      {/* Brand and toggle get grouped for better mobile display */}
      <div className="navbar-header">
        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
          <span className="sr-only">Toggle navigation</span> Menu <i className="fas fa-bars"></i>
        </button>
        <Link href="/#page-top">
          <a className="navbar-brand page-scroll">Capitole du Libre 2022</a>
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
          <li>
            <a className="page-scroll" href="/#cfp">Appel à participation</a>
          </li>
          <li>
            <Link href="/programme" >
              <a className="page-scroll">Programme</a>
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
            <Link href="/code-of-conduct">
              <a className="page-scroll">Code de Conduite</a>
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
)

export default NavBar;