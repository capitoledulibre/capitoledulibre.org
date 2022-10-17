import { createIcons, Car, Train, Bus, Plane, User, Bike } from 'lucide';
import { useEffect } from "react";

const Come = () => {
    useEffect(() => {
        createIcons({
            icons: {
                Car, Train, Bus, Plane, User, Bike
            },
        });
    }, [])
  
    return (
      <section id="come">
      <style jsx>{`
          svg {
              width: 56px;
              height: 56px;
          }
          iframe#carte {
            width: 70%;
            height: 300px;
            border: 1px solid lightgrey;
          }
      `}</style>
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
                <i icon-name="car" className="text-primary sr-icons"></i>
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
                <i icon-name="train" className="text-primary sr-icons"></i>
                <h3>En train</h3>
                <p className="text-muted">Le TGV vous dépose à la gare de Toulouse en plein centre ville, marchez environ 10min le long du Canal du Midi.</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 text-center">
              <div className="service-box">
                <i icon-name="bus" className="text-primary sr-icons"></i>
                <h3>En bus</h3>
                <p className="text-muted">Ouibus, par exemple, propose plusieurs liaisons quotidiennes Paris-Toulouse en 9 heures.</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 text-center">
              <div className="service-box">
                <i icon-name="plane" className="text-primary sr-icons"></i>
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
                <p>Le Capitole du Libre sera hébergé à l'<a href="http://www.enseeiht.fr">INP-ENSEEIHT</a>, 2 rue Charles Camichel, 31000 Toulouse.</p>
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
                  <i icon-name="user" className="text-primary sr-icons"></i>
                  <h3>À pied</h3>
                  <p className="text-muted">L'école est idéalement située en centre ville. Si vous êtes en ville, vous pouvez rejoindre l'école située sur les bords du canal à pied.
                    Vous êtes situé⋅e⋅s à moins de 10min à pied de la fameuse place du Capitole.</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 text-center">
                <div className="service-box">
                  <i icon-name="train" className="text-primary sr-icons"></i>
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
                  <i icon-name="bus" className="text-primary sr-icons"></i>
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
                  <i icon-name="bike" className="text-primary sr-icons"></i>
                  <h3>En vélo libre service</h3>
                  <p className="text-muted">Toulouse dispose d'un système de vélos en libre service complémentaire des transports en commun : <a href="http://www.velo.toulouse.fr/">Vélô Toulouse</a>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}

export default Come;
