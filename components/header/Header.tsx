import bgImage from "./header.jpg"
import Link from "next/link";

const Header = () => (
  <>
    <style jsx>{`
      header, header .header-content {
        position: relative;
        width: 100%;
        text-align: center
      }
      header {
        min-height: auto;
        background-size: cover;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-position: center;
        background-image: url(${bgImage.src});
        color: #fff
      }
      
      header .header-content {
        padding: 100px 15px
      }
      
      header .header-content .header-content-inner h1 {
        font-weight: 700;
        text-transform: uppercase;
        margin-top: 0;
        margin-bottom: 0;
        font-size: 30px
      }
      
      header .header-content .header-content-inner hr {
        margin: 30px auto
      }
      
      header .header-content .header-content-inner p {
        font-weight: 300;
        color: rgba(255, 255, 255, .7);
        font-size: 16px;
        margin-bottom: 50px
      }
      
      @media (min-width:768px) {
        header {
          height: 100vh;
        }
    
        header .header-content {
          position: absolute;
          top: 50%;
          -webkit-transform: translateY(-50%);
          -ms-transform: translateY(-50%);
          transform: translateY(-50%);
          padding: 0 50px
        }
    
        header .header-content .header-content-inner {
          max-width: 1000px;
          margin-left: auto;
          margin-right: auto
        }
    
        header .header-content .header-content-inner h1 {
          font-size: 50px
        }
    
        header .header-content .header-content-inner p {
          font-size: 18px;
          max-width: 80%;
          margin-left: auto;
          margin-right: auto
        }

        .registration {
          font-size: 200%;
        }
      }
    `}</style>
    <header>
      <div className="header-content">
        <div className="header-content-inner">
          <h1 id="homeHeading">Capitole du Libre 2025 <br />Samedi 15 &amp; Dimanche 16 novembre<br/>ENSEEIHT, Toulouse</h1>
          <hr />
          <p>Week-end dédié au logiciel libre à travers plus de 100 conférences, et plus de 20 ateliers pour les expert⋅e⋅s et le grand public. L'évènement a accueilli 1200 participant⋅e⋅s en 2024. L'évènement est ouvert à tous sur inscription en ligne gratuite préalable!</p>
          <p><a href="https://cfp.capitoledulibre.org/cdl-2025/cfp" className="btn btn-primary btn-xl page-scroll">Proposez une conférence, un atelier, un stand jusqu'au mardi 15 juillet 23h59</a></p>
          <p><a href="https://tickets.capitoledulibre.org/cdl/2024/" className="btn btn-primary btn-xl page-scroll"><span className="registration">INSCRIPTION GRATUITE OBLIGATOIRE</span></a></p>
          {/* <p><a href="/programme" className="btn btn-primary btn-xl page-scroll"> Consultez le programme de l'édition 2024</a></p>*/}
          <p><a href="/#sponsor" className="btn btn-primary btn-xl page-scroll">Devenez partenaire</a></p>
        </div>
      </div>
    </header>
  </>
)

export default Header;
