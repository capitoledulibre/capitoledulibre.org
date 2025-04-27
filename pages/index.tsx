import Head from 'next/head'
import React from "react";

import About from '../components/About';
import EventDetails from '../components/EventDetails';
import Header from '../components/header/Header';
import NavBar from '../components/NavBar';
import NavBarBottom from '../components/NavBarBottom';
import Partners from '../components/Partners';
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

        <title>Capitole du Libre 2025</title>

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
              <h2>L'appel à participation est ouvert jusqu'au Mardi 15 juillet 2025 23h59</h2>
              <p>Vous pouvez proposer des conférences (de 25min ou de 55min), ateliers (de 1h55) et stands (tout le week-end) jusqu'au Mardi 15 juillet 23h59. Nous encourageons tout le monde à participer, que vous soyez un speaker averti ou débutant. Une seul contrainte: la conférence doit être liée au logiciel libre ou au libre de manière générale.</p>
              <a href="https://cfp.capitoledulibre.org/cdl-2025/cfp" className="btn btn-default btn-xl sr-button">Formulaire de proposition</a>
            </div>
          </div>
        </aside>


        {/*
        <aside className="bg-primary">
          <div className="container text-center" id="cfp">
            <div className="call-to-action">
              <h2>Découvrez le programme de l'édition 2025</h2>
              <p>Cette année encore, un programme riche de conférences et ateliers vous attend lors du Capitole du Libre. Contsultez le programme pour découvrir tous les orateurs, conférences et ateliers de cette édition.</p>
              <a href="/programme" className="btn btn-default btn-xl sr-button">Programme complet de l'édition 2025</a>
            </div>
          </div>
        </aside>
        */}

        <aside className="bg-dark">
          <div className="container text-center" id="sponsor">
            <div className="call-to-action">
              <h2>Soutenez le Capitole du Libre en devenant partenaire!</h2>
              <a href="/Capitole-du-Libre-2025-Plaquette-Partenaires.pdf" className="btn btn-default btn-xl sr-button">Téléchargez notre dossier de partenariat</a>
            </div>
          </div>
        </aside>

        <section id="partners">
          <div className="container">

            <h2>Nos partenaires 2024</h2>

            <Partners />

          </div>
        </section>

        <section id="contact">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-2 text-center">
                <h2 className="section-heading">Une idée&nbsp;? Une question&nbsp;? Contactez-nous&nbsp;!</h2>
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
              </div>
            </div>
            <div className="row">
              <div className="col-lg-2 text-center offset-2">
                <p><a href="https://framapiaf.org/@capitoledulibre"><i className="fa-brands fa-mastodon fa-3x"></i></a></p>
              </div>
              <div className="col-lg-2 text-center">
                <p><a href="https://bsky.app/profile/capitoledulibre.org"><i className="fa-brands fa-bluesky fa-3x"></i></a></p>
              </div>
              <div className="col-lg-2 text-center">
                <p><a href="https://x.com/capitoledulibre"><i className="fa-brands fa-x-twitter fa-3x"></i></a></p>
              </div>
              <div className="col-lg-2 text-center">
                <p><a href="https://www.facebook.com/CapitoleDuLibre/"><i className="fa-brands fa-facebook fa-3x"></i>
                </a></p>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-2 text-center offset-3">
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
