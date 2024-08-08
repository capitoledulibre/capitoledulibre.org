import Head from 'next/head'
import React from "react";

import About from '../components/About';
import EventDetails from '../components/EventDetails';
import Header from '../components/header/Header';
import NavBar from '../components/NavBar';
import NavBarBottom from '../components/NavBarBottom';
import Portfolio from "../components/portfolio/Portfolio";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="" />
        <meta name="author" content="" />

        <title>Capitole du Libre 2024</title>

        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />

      </Head>

      <main id="page-top">

        <NavBar />

        <Header />

        <About />

        <EventDetails />

        <Portfolio />

        <aside className="bg-primary">
          <div className="container text-center" id="cfp">
            <div className="call-to-action">
              <h2>L'appel à participation est ouvert jusqu'au 15 septembre 23h59</h2>
              <p>Vous pouvez proposer des conférences (de 25min ou de 55min), ateliers (de 1h55) et stands (tout le week-end) jusqu'au 15 septembre 23h59. Nous encourageons tout le monde à participer, que vous soyez un speaker averti ou débutant. Une seul contrainte: la conférence doit être liée au logiciel libre ou au libre de manière générale.</p>
              <a href="https://cfp.capitoledulibre.org/cdl-2024/cfp" className="btn btn-default btn-xl sr-button">Formulaire de proposition</a>
            </div>
          </div>
        </aside>
   
        {/*
        <aside className="bg-primary">
          <div className="container text-center" id="cfp">
            <div className="call-to-action">
              <h2>Découvrez le programme de l'édition 2023</h2>
              <p>Cette année encore, un programme riche de conférences et ateliers vous attend lors du Capitole du Libre. Contsultez le programme pour découvrir tous les orateurs, conférences et ateliers de cette édition.</p>
              <a href="/programme" className="btn btn-default btn-xl sr-button">Programme complet de l'édition 2023</a>
            </div>
          </div>
        </aside>
     */}

        <aside className="bg-dark">
          <div className="container text-center" id="sponsor">
            <div className="call-to-action">
              <h2>Soutenez le Capitole du Libre en devenant sponsor!</h2>
              <a href="/Capitole-du-Libre-2024-Plaquette-Partenaires.pdf" className="btn btn-default btn-xl sr-button">Téléchargez notre dossier de partenariat</a>
            </div>
          </div>
        </aside>

        <section id="partners">
          <div className="container">

            <h2>Nos partenaires en 2023</h2>
            <div className="row text-center">
              <div className="col-xs-12 col-sm-12">
                <h3>Platine</h3>
                <a href="http://bootlin.com" target="_blank">
                    <img src="img/bootlin-logo-240.png" alt="Bootlin" className="logo-200px" title="Bootlin" />
                </a>
                &nbsp;     
                &nbsp;                                            
                <a href="https://www.csgroup.eu/fr" target="_blank">
                  <img src="img/logo_cs_fond_transparent.png" alt="CS" className="logo-200px" title="CS" />
                </a>
                &nbsp;
                &nbsp;                 
                <a href="https://www.sigb.net/" target="_blank">
                  <img src="img/logo-pmb.jpg" alt="PMB Services" className="logo-150px" title="PMB Services" />
                </a>
                &nbsp;
                &nbsp;                                                 
                <a href="https://www.thalesgroup.com" target="_blank">
                  <img src="img/logo-thales.svg" alt="Thales Group" className="logo-200px" title="Thales Group" />
                </a>                
              </div>
            </div>

            <div className="row text-center">
              <div className="col-xs-12 col-sm-12">
                <h3>Or</h3>
                <a href="https://evolix.com" target="_blank">
                  <img src="img/logo-evolix.png" alt="Evolix" className="logo-150px" title="Evolix" />
                </a>
                &nbsp;
                &nbsp;                  
                <a href="https://www.linagora.com" target="_blank">
                  <img src="img/logo-linagora.png" alt="Linagora" className="logo-150px" title="Linagora" />
                </a>
                &nbsp;
                &nbsp;                             
                <a href="https://makina-corpus.com/" target="_blank">
                  <img src="img/makina-corpus.png" alt="Makina Corpus" className="logo-100px" title="Makina Corpus" />
                </a>
                &nbsp;
                &nbsp;                 
                <a href="https://www.viveris.fr" target="_blank">
                  <img src="img/logo-viveris.svg" alt="Viveris" className="logo-150px" title="Viveris" />
                </a>
              </div>
            </div>

            <div className="row text-center">
              <div className="col-xs-12 col-sm-12">
                <h3>Argent</h3>
                <a href="https://www.data-bene.io" target="_blank">
                  <img src="img/logo-databene.png" alt="DataBene" className="logo-100px" title="DataBene" />
                </a>
                &nbsp;
                <a href="https://www.smile.eu" target="_blank">
                  <img src="img/SMILE_icone-full-orange -baseline.png" alt="Smile" className="logo-100px" title="Smile" />
                </a>
                &nbsp;                
                <a href="https://www.worteks.com" target="_blank">
                  <img src="img/logo-worteks.png" alt="Worteks" className="logo-100px" title="Worteks" />
                </a>
                &nbsp;                
              </div>
            </div>

            <div className="row text-center">
              <div className="col-xs-12 col-sm-12">
                <h3>Bronze</h3>
                <p>
                  <a href="https://bleemeo.com" target="_blank">
                    <img src="img/bleemeo_logo.svg" alt="Bleemeo" className="logo-100px" title="Bleemeo" />
                  </a>
                  &nbsp;
                  <a href="https://www.bluemind.net/" target="_blank">
                    <img src="img/logo-bluemind.png" alt="Bluemind" className="logo-100px" title="Bluemind" />
                  </a>
                  &nbsp;
                </p>
              </div>
            </div>

            <div className="row text-center">
              <div className="col-lg-4">
                <h3>Organisation</h3>
                <a href="http://toulibre.org/" target="_blank">
                  <img src="img/logo-toulibre.svg" alt="Toulibre" className="logo-150px" title="Toulibre" />
                </a>
              </div>
              <div className="col-lg-4">
                <h3>Partenaires</h3>
                <a href="http://enseeiht.fr/" target="_blank">
                  <img src="img/logo-toulouse-inp-n7.png" alt="INP-N7" className="logo-150px" title="INP-N7" />
                </a>
                &nbsp;
                <a href="http://www.frenchtechtoulouse.com" target="_blank">
                  <img src="img/logo-COULEURS-FrenchTechToulouse.png" alt="French Tech Toulouse" className="logo-150px" title="French Tech Toulouse" />
                </a>
                &nbsp;
                <a href="http://www.toulouse.fr" target="_blank">
                  <img src="img/Logo_mairie_de_Toulouse.svg" alt="Toulouse" className="logo-150px" title="Mairie de Toulouse" />
                </a>
                &nbsp;
                <a href="https://www.laregion.fr" target="_blank">
                  <img src="img/1200px-Logo_Occitanie_2017.svg.png" alt="La Region Occitanie" className="logo-100px" title="La Region Occitanie" />
                </a>
                &nbsp;
                <a href="https://www.haute-garonne.fr/" target="_blank">
                  <img src="img/logo-hg31.svg" alt="Conseil Départemetal de la Haute Garonne" className="logo-100px" title="Conseil Départemetal de la Haute Garonne" />
                </a>                
              </div>
              <div className="col-lg-4">
                <h3>Communication</h3>
                <div className="row">
                  <a href="http://www.editions-diamond.fr/" target="_blank">
                    <img src="img/logo-edition-diamonds.png" alt="Éditions Diamonds" className="logo-100px" title="Éditions Diamonds" />
                  </a>
                  &nbsp;
                  <a href="https://www.bibliotheque.toulouse.fr/" target="_blank">
                    <img src="img/logo-bibliotheque-toulouse.jpg" alt="Bibliothèque de Toulouse" className="logo-100px" title="Bibliothèque de Toulouse" />
                  </a>
                  &nbsp;
                  <a href="https://tisseo-collectivites.fr/" target="_blank">
                    <img src="img/logo-tisseo-collectivites.png" alt="Tisséo Collectivités" className="logo-100px" title="Tisséo Collectivités" />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>

        <section id="contact">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-2 text-center">
                <h2 className="section-heading">Une idée&nbsp;? Une question&nbsp;? Contactez-nous&nbsp;!</h2>
                <hr className="primary" />
                <p>Si vous avez des questions, n'hésitez pas à nous contacter&nbsp;!</p>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4 offset-4 text-center">
                <i className="fas fa-envelope fa-3x sr-contact"></i>
                <p><a href="mailto:contact@capitoledulibre.org">contact@capitoledulibre.org</a></p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-2 text-center">
                <h2 className="section-heading">Suivez-nous sur les réseaux sociaux</h2>
                <hr className="primary" />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-2 text-center">
                <p><a href="https://framapiaf.org/@capitoledulibre"><i className="fa-brands fa-mastodon fa-3x"></i></a></p>
              </div>
              <div className="col-lg-2 text-center">
                <p><a href="https://x.com/capitoledulibre"><i className="fa-brands fa-x-twitter fa-3x"></i></a></p>
              </div>
              <div className="col-lg-2 text-center">
                <p><a href="https://www.facebook.com/CapitoleDuLibre/"><i className="fa-brands fa-facebook fa-3x"></i>
                </a></p>
              </div>
              <div className="col-lg-2 text-center">
                <p><a href="https://github.com/capitoledulibre"><i className="fa-brands fa-github fa-3x"></i></a></p>
              </div>
              <div className="col-lg-2 text-center">
                <p><a href="https://linkedin.com/company/capitole-du-libre"><i className="fa-brands fa-linkedin fa-3x"></i></a></p>
              </div>
              <div className="col-lg-2 text-center">
                <p><a href="https://instagram.com/capitoledulibre"><i className="fa-brands fa-instagram fa-3x"></i></a></p>
              </div>                         
            </div>
          </div>
        </section>

        <section id="contribuer">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-2 text-center">
                <h2 className="section-heading">Une erreur&nbsp;? Une faute d'orthographe&nbsp;?</h2>
                <hr className="primary" />
                <p>Vous pouver signaler les erreurs ou proposer vos corrections&nbsp;!</p>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3 offset-3 text-center">
                <i className="fab fa-github fa-3x"></i>
                <p><a href="https://github.com/capitoledulibre/capitoledulibre.org/issues">Issues<br /><em>Signaler une erreur</em></a></p>
              </div>
              <div className="col-lg-3 text-center">
                <i className="fab fa-github fa-3x"></i>
                <p><a href="https://github.com/capitoledulibre/capitoledulibre.org/pulls">Pull request<br /><em>Proposer une modification</em></a></p>
              </div>
            </div>
          </div>
        </section>

        <NavBarBottom />

      </main>
    </>
  )
}
