import Head from 'next/head'
import React from "react";

import About from '../components/About';
import EventDetails from '../components/EventDetails';
import Header from '../components/header/Header';
import NavBar from '../components/NavBar';
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

        <title>Capitole du Libre 2023</title>

        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />

        {/* Custom Fonts */}
        <link href='//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800' rel='stylesheet' type='text/css' />
        <link href='//fonts.googleapis.com/css?family=Merriweather:400,300,300italic,400italic,700,700italic,900,900italic' rel='stylesheet' type='text/css' />
      </Head>

      <main id="page-top">

        <NavBar transparentOnTop={true} />

        <Header />

        <About />

        <EventDetails />

        <Portfolio />

        <aside className="bg-primary">
          <div className="container text-center" id="cfp">
            <div className="call-to-action">
              <h2>L'appel à participation est ouvert jusqu'au 31 août 23h59</h2>
              <p>Vous pouvez proposer des conférences (de 20min ou de 50min), ateliers (de 2h) et stands (tout le week-end) jusqu'au 31 août 23h59. Nous encourageons tout le monde à participer, que vous soyez un speaker averti ou débutant. Une seul contrainte: la conférence doit être liée au logiciel libre ou au libre de manière générale.</p>
              <a href="https://cfp.capitoledulibre.org/cdl-2023/cfp" className="btn btn-default btn-xl sr-button">Formulaire de proposition</a>
            </div>
          </div>
        </aside>

        {/*
        <aside className="bg-primary">
          <div className="container text-center" id="cfp">
            <div className="call-to-action">
              <h2>Découvrez le programme de l'édition 2022</h2>
              <p>Cette année encore, un programme riche de conférences et ateliers vous attend lors du Capitole du Libre. Contsultez le programme pour découvrir tous les orateurs, conférences et ateliers de cette édition.</p>
              <Link href="/programme"><a className="btn btn-default btn-xl sr-button">Programme complet de l'édition 2022</a></Link>
            </div>
          </div>
        </aside>
        */}

        <aside className="bg-dark">
          <div className="container text-center" id="sponsor">
            <div className="call-to-action">
              <h2>Soutenez le Capitole du Libre en devenant sponsor!</h2>
              <a href="/Capitole-du-Libre-2023-Plaquette-Sponsors.pdf" className="btn btn-default btn-xl sr-button">Téléchargez notre dossier de sponsoring</a>
            </div>
          </div>
        </aside>

        <section id="partners">
          <div className="container">

            <h2>Nos partenaires en 2022</h2>
            <div className="row text-center">
              <div className="col-xs-12 col-sm-12">
                <h3>Sponsors Platine</h3>
                <a href="https://www.csgroup.eu/fr" target="_blank">
                  <img src="img/logo_cs_fond_transparent.png" alt="CS" className="logo-200px" title="CS" />
                </a>
                &nbsp;
                <a href="https://www.sogeti.com/" target="_blank">
                  <img src="img/logo-sogeti.svg" alt="Sogeti" className="logo-150px" title="Sogeti" />
                </a>                
                &nbsp;
                <a href="https://www.solibre.fr/" target="_blank">
                  <img src="img/logo-solibre.jpg" alt="Solibre" className="logo-150px" title="Solibre" />
                </a>
              </div>
            </div>

            <div className="row text-center">
              <div className="col-xs-12 col-sm-12">
                <h3>Sponsors Or</h3>
                <a href="http://bootlin.com" target="_blank">
                    <img src="img/bootlin-logo-240.png" alt="Bootlin" className="logo-100px" title="Bootlin" />
                  </a>
                  &nbsp;
                  <a href="https://www.collabora.com" target="_blank">
                  <img src="img/CollaboraLogo2017.png" alt="Collabora" className="logo-150px" title="Collabora" />
                </a>
                &nbsp;        
                <a href="http://evolix.com/" target="_blank">
                    <img src="img/logo_evolix_3.0.png" alt="Evolix" className="logo-100px" title="Evolix" />
                </a>
                &nbsp;
                <a href="https://www.linagora.com" target="_blank">
                  <img src="img/logo-linagora.png" alt="Linagora" className="logo-150px" title="Linagora" />
                </a>
                &nbsp;
                <a href="https://www.logilab.fr/" target="_blank">
                  <img src="img/logo-logilab.svg" alt="Logilab" className="logo-150px" title="Logilab" />
                </a>
                &nbsp;
                <a href="https://makina-corpus.com/" target="_blank">
                  <img src="img/makina-corpus.png" alt="Makina Corpus" className="logo-100px" title="Makina Corpus" />
                </a>
                &nbsp;
                <a href="https://www.obeosoft.com/fr/" target="_blank">
                  <img src="img/logo-obeo.png" alt="Obeo" className="logo-100px" title="Obeo" />
                </a>
                &nbsp;
                <a href="https://www.onlyoffice.com/" target="_blank">
                  <img src="img/logo-onlyoffice.svg" alt="OnlyOffice" className="logo-100px" title="OnlyOffice" />
                </a>
                &nbsp; 
                <a href="https://www.open-dsi.fr/" target="_blank">
                  <img src="img/logo-opendsi.png" alt="OpenDSI" className="logo-100px" title="OpenDSI" />
                </a>
                &nbsp;                                                           

                <a href="https://smile.eu/fr" target="_blank">
                  <img src="img/SMILE_icone-full-orange -baseline.png" alt="Smile" className="logo-150px" title="Smile" />
                </a>
                &nbsp;
                <a href="https://www.viveris.fr" target="_blank">
                  <img src="img/logo-viveris.svg" alt="Viveris" className="logo-150px" title="Viveris" />
                </a>
              </div>
            </div>

            <div className="row text-center">
              <div className="col-xs-12 col-sm-12">
                <h3>Sponsors Argent</h3>
                <a href="https://www.data-bene.io" target="_blank">
                  <img src="img/logo-databene.png" alt="DataBene" className="logo-100px" title="DataBene" />
                </a>
                &nbsp;
              </div>
            </div>

            <div className="row text-center">
              <div className="col-xs-12 col-sm-12">
                <h3>Sponsors Bronze</h3>
                <p>
                  <a href="https://bleemeo.com" target="_blank">
                    <img src="img/bleemeo_logo.svg" alt="Bleemeo" className="logo-100px" title="Bleemeo" />
                  </a>
                  &nbsp;
                  <a href="https://www.bluemind.net/" target="_blank">
                    <img src="img/bluemind.jpg" alt="Bluemind" className="logo-100px" title="Bluemind" />
                  </a>
                  &nbsp;
                  <a href="https://puri.sm" target="_blank">
                  <img src="img/purism.svg" alt="Purism" className="logo-100px" title="Purism" />
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
                  <img src="img/inpn7logo.svg" alt="ENSEEIHT" className="logo-150px" title="ENSEEIHT" />
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
                  &nbsp;
                  <a href="https://radio-fmr.net/" target="_blank">
                    <img src="img/logo-radio-fmr.jpg" alt="Radio FMR" className="logo-100px" title="Radio FMR" />
                  </a>
                  &nbsp;
                  <a href="http://www.developpez.com" target="_blank">
                    <img src="img/logo-developpez.com.png" alt="Développez.com" className="logo-100px" title="Développez.com" />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>

        <section id="come">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h2 className="section-heading">Comment vous rendre à Toulouse&nbsp;?</h2>
                <hr className="primary" />
                <p>Toulouse se trouve à 1h d'avion de Paris, et à 4h de Paris en TGV.</p>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-6 text-center">
                <div className="service-box">
                  <i className="fa fa-4x fa-car text-primary sr-icons"></i>
                  <h3>En voiture</h3>
                  <p className="text-muted">
                    Si vous souhaitez venir en voiture, nous vous invitons à partager votre trajet
                    avec d'autres personnes.
                    Vous pouvez <a href="http://www.openstreetmap.org/directions#map=9/47.9531/-1.8196">calculer votre itinéraire avec Open Street Map</a>
                  </p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 text-center">
                <div className="service-box">
                  <i className="fa fa-4x fa-train text-primary sr-icons"></i>
                  <h3>En train</h3>
                  <p className="text-muted">Le TGV vous dépose à la gare de Toulouse en plein centre ville, marchez environ 10min le long du Canal du Midi.</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 text-center">
                <div className="service-box">
                  <i className="fa fa-4x fa-bus text-primary sr-icons"></i>
                  <h3>En bus</h3>
                  <p className="text-muted">Ouibus, par exemple, propose plusieurs liaisons quotidiennes Paris-Toulouse en 9 heures.</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 text-center">
                <div className="service-box">
                  <i className="fa fa-4x fa-plane text-primary sr-icons"></i>
                  <h3>En avion</h3>
                  <p className="text-muted">Il y a un aéroport à Toulouse avec au moins un vol par jour au départ de :
                    <ul className="list-unstyled">
                      <li>Lille</li>
                      <li>Londres</li>
                      <li>Lyon</li>
                      <li>Marseille</li>
                      <li>Nantes</li>
                      <li>Nice</li>
                      <li>Paris (Orly & Charles-de-Gaulle)</li>
                      <li>Rennes</li>
                      <li>Strasbourg</li>
                    </ul>
                  </p>
                  <p className="text-muted">Plus d'informations disponibles sur le <a href="http://www.toulouse.aeroport.fr/">site de l'aéroport</a>.
                    L'aéroport est proche de la ville, prenez le tramway jusqu'au Palais de justice où la navette Air France qui vous ramènera à la gare.
                  </p>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-lg-12 text-center">
                  <h2 className="section-heading">Depuis Toulouse&nbsp;?</h2>
                  <hr className="primary" />
                  <p>Le Capitole du Libre sera hébergé à l'<a href="http://www.enseeiht.fr">INP-N7</a>, 26 rue Riquet, 31000 Toulouse.</p>
                  <p><b>Coordonnées GPS :</b>43.60215 - 1.45524</p>
                  <iframe id="carte" src="https://umap.openstreetmap.fr/fr/map/cdl_2017_campus_173723?scaleControl=true&miniMap=false&scrollWheelZoom=true&zoomControl=true&allowEdit=false&moreControl=false&datalayersControl=false&onLoadPanel=undefined&captionBar=false&datalayers=198023#17/43.60215/1.45524"></iframe>
                  <p><a href="http://umap.openstreetmap.fr/en/map/cdl_2017_campus_173723#17/43.60215/1.45524">Voir en plein écran</a></p>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-lg-3 col-md-6 text-center">
                  <div className="service-box">
                    <i className="fa fa-4x fa-male text-primary sr-icons"></i>
                    <h3>À pied</h3>
                    <p className="text-muted">L'école est idéalement située en centre ville. Si vous êtes en ville, vous pouvez rejoindre l'école située sur les bords du canal à pied.
                      Vous êtes situé⋅e⋅s à moins de 10min à pied de la fameuse place du Capitole.</p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 text-center">
                  <div className="service-box">
                    <i className="fa fa-4x fa-subway text-primary sr-icons"></i>
                    <h3>En Métro</h3>
                    <p className="text-muted">L'école est située à 5min à pied de l'arrêt François Verdier sur la ligne de métro B.
                      Les métros circulent jusqu'à 0h00 du dimanche au jeudi et jusqu'à 3h les vendredis et samedis.
                      Pour plus d'informations sur les horaires des bus et métros vous pouvez
                      consulter <a href="http://www.tisseo.fr/se-deplacer/plans">le site du Réseau Métro/Bus/Tramway de Toulouse</a>
                    </p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 text-center">
                  <div className="service-box">
                    <i className="fa fa-4x fa-bus text-primary sr-icons"></i>
                    <h3>En Bus</h3>
                    <p className="text-muted">L'école est située à proximité de nombreuses lignes de bus: 14, 22, 23, 27, 38
                      Les bus et tramway circulent jusqu'à 0h30 du dimanche au jeudi et jusqu'à 1h00 les vendredis et samedi.
                      Pour plus d'informations sur les horaires des bus et métros vous pouvez
                      consulter <a href="http://www.tisseo.fr/se-deplacer/plans">le site du Réseau Métro/Bus/Tramway de Toulouse</a>
                    </p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 text-center">
                  <div className="service-box">
                    <i className="fa fa-4x fa-bicycle text-primary sr-icons"></i>
                    <h3>En vélo libre service</h3>
                    <p className="text-muted">Toulouse dispose d'un système de vélos en libre service complémentaire des transports en commun : <a href="http://www.velo.toulouse.fr/">Vélô Toulouse</a>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="accomodation">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h2 className="section-heading">Pour se loger</h2>
                <hr className="primary" />
                <p> L'INP-ENSEEIHT est idéalement située en centre ville de Toulouse. Une fois arrivé⋅e
                  sur place, vous pourrez trouver un logement ou des points de restauration
                  accessibles à pied. Un réseau de transports en communs est accessible si vous
                  souhaitez rejoindre des ami⋅e⋅s ou vous extraire du centre ville.
                  <ul className="list-unstyled">
                    <li><a href="https://www.airbnb.fr/s/Rue-Camichel--Toulouse?checkin=16%2F11%2F2019&checkout=18%2F11%2F2019">Rechercher un AirBNB</a></li>
                    <li><a href="https://all.accor.com/hotel/B3A1/index.fr.shtml">Hotel Ibis Style</a>, situé de l'autre côté du canal par rapport au campus de l'ENSEEIHT</li>
                    <li><a href="http://www.athome-ah.com/">At Home Appart Hotel</a>, situé à quelques centaines de mètres le long du Canal du Midi</li>
                    <li><a href="https://all.accor.com/hotel/1260/index.fr.shtml">Mercure Toulouse Centre Wilson Capitole</a>, proche de l'ENSEEIHT, en centre ville et proche des transports en commun</li>
                    <li><a href="https://all.accor.com/hotel/0370/index.fr.shtml">Mercure Toulouse Centre Saint Georges</a>, prôche de l'ENSEEIHT et situé en centre ville</li>
                  </ul>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-lg-offset-2 text-center">
                <h2 className="section-heading">Une idée&nbsp;? Une question&nbsp;? Contactez-nous&nbsp;!</h2>
                <hr className="primary" />
                <p>Si vous avez des questions, n'hésitez pas à nous contacter&nbsp;!</p>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3 text-center">
                <i className="fab fa-mastodon fa-3x"></i>
                <p><a href="https://framapiaf.org/@capitoledulibre">@capitoledulibre@framapiaf.org</a></p>
              </div>
              <div className="col-lg-3 text-center">
                <i className="fab fa-twitter fa-3x"></i>
                <p><a href="https://twitter.com/capitoledulibre">@capitoledulibre</a></p>
              </div>
              <div className="col-lg-3 text-center">
                <i className="fab fa-facebook fa-3x"></i>
                <p><a href="https://www.facebook.com/CapitoleDuLibre/">Capitole Du Libre</a></p>
              </div>
              <div className="col-lg-3 text-center">
                <i className="fas fa-envelope fa-3x sr-contact"></i>
                <p><a href="mailto:contact@capitoledulibre.org">contact@capitoledulibre.org</a></p>
              </div>
              <div className="col-lg-3 text-center">
                <i className="fab fa-github fa-3x"></i>
                <p><a href="https://github.com/capitoledulibre">capitoledulibre</a></p>
              </div>
            </div>
          </div>
        </section>

        <section id="contribuer">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-lg-offset-2 text-center">
                <h2 className="section-heading">Une erreur&nbsp;? Une faute d'orthographe&nbsp;?</h2>
                <hr className="primary" />
                <p>Vous pouver signaler les erreurs ou proposer vos corrections&nbsp;!</p>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3 col-lg-offset-3 text-center">
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

      </main>
    </>
  )
}
