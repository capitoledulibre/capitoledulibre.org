const Header = () => (
    <header>
    <div className="header-content">
      <div className="header-content-inner">
        <h1 id="homeHeading">Capitole du Libre 2022 <br />19 &amp; 20 novembre, ENSEEIHT, Toulouse</h1>
        <hr />
        <p>Week-end dédié au logiciel libre à travers 100 conférences, 25 ateliers pour les expert⋅e⋅s et le grand public. L'événement a accueilli 1500 participant⋅e⋅s en 2019. L'entrée à l'événement est libre et gratuite!</p>
        <p><a href="https://www.youtube.com/watch?v=b2Pgk1nzq9w" data-toggle="modal" data-target=".video-dialog" className="btn btn-primary btn-xl page-scroll">Découvrez le Capitole du Libre en vidéo</a></p>
        <p><a href="https://cfp.capitoledulibre.org/cdl-2022/cfp" className="btn btn-primary btn-xl page-scroll">Proposez une conférence, un atelier, un stand jusqu'au 26 septembre 23h59</a></p>
        <p><a href="/programme/#schedule" className="btn btn-primary btn-xl page-scroll">Consultez le programme</a></p>
        <p><a href="/#sponsor" className="btn btn-primary btn-xl page-scroll">Devenez partenaire</a></p>
      </div>
    </div>
  </header>
)

export default Header;