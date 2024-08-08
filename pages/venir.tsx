import NavBar from '../components/NavBar';

export default function Venir() {
    return (
        <>
            <NavBar />

            <section id="venir-capitole-du-libre">
                <div className="container">
                    <div className="row">

                        <h1>Venir au Capitole du Libre</h1>


                    </div>
                </div>
            </section>

            <section id="come">

                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <h2 className="section-heading">Le Capitole du Libre est hébergé à l'INP-N7</h2>
                            <hr className="primary" />
                            <p>Le Capitole du Libre sera hébergé à l'<a href="http://www.enseeiht.fr">INP-N7</a>, 2 rue Charles Camichel, 31000 Toulouse.</p>
                            <p><b>Coordonnées GPS :</b>43.60215 - 1.45524</p>
                            <iframe id="carte" src="https://umap.openstreetmap.fr/fr/map/cdl_2017_campus_173723?scaleControl=true&miniMap=false&scrollWheelZoom=true&zoomControl=true&allowEdit=false&moreControl=false&datalayersControl=false&onLoadPanel=undefined&captionBar=false&datalayers=198023#17/43.60215/1.45524"></iframe>
                            <p><a href="http://umap.openstreetmap.fr/en/map/cdl_2017_campus_173723#17/43.60215/1.45524">Voir en plein écran</a></p>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <h2 className="section-heading">Depuis Toulouse&nbsp;?</h2>
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
                                <p className="text-muted">Il y a un aéroport à Toulouse avec au moins un vol par jour au départ de :</p>
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
                                <p className="text-muted">Plus d'informations disponibles sur le <a href="http://www.toulouse.aeroport.fr/">site de l'aéroport</a>.
                                    L'aéroport est proche de la ville, prenez le tramway jusqu'au Palais de justice où la navette Air France qui vous ramènera à la gare.
                                </p>
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
                            </p>
                            <ul className="list-unstyled">
                                <li><a href="https://www.airbnb.fr/s/Rue-Camichel--Toulouse?checkin=17%2F11%2F2023&checkout=19%2F11%2F2023">Rechercher un AirBNB</a></li>
                                <li><a href="https://all.accor.com/hotel/B3A1/index.fr.shtml">Hotel Ibis Style</a>, situé de l'autre côté du canal par rapport au campus de l'ENSEEIHT</li>
                                <li><a href="http://www.athome-ah.com/">At Home Appart Hotel</a>, situé à quelques centaines de mètres le long du Canal du Midi</li>
                                <li><a href="https://all.accor.com/hotel/1260/index.fr.shtml">Mercure Toulouse Centre Wilson Capitole</a>, proche de l'ENSEEIHT, en centre ville et proche des transports en commun</li>
                                <li><a href="https://all.accor.com/hotel/0370/index.fr.shtml">Mercure Toulouse Centre Saint Georges</a>, prôche de l'ENSEEIHT et situé en centre ville</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>


        </>
    )
}