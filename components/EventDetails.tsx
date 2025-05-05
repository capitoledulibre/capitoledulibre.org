import Link from "next/link";

type EventDetailsCardProps = {
  faIcon: string;
  title: string;
  children: React.ReactNode;
}

const EventDetailsCard = ({faIcon, title, children}: EventDetailsCardProps) => (
    <div className="col-lg-3 col-md-6 text-center">
    <div className="service-box">
      <i className={`fa fa-4x ${faIcon} text-primary sr-icons`}></i>
      <h3>{title}</h3>
      <p className="text-muted">
        {children}
      </p>
    </div>
  </div>
)

const EventDetails = () => (
  <section id="event">
    <div className="container">
      <div className="row">
        <div className="col-lg-12 text-center">
          <h2 className="section-heading">L'évènement en détails</h2>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="row">
        <EventDetailsCard faIcon="fa-paper-plane" title="Keynotes">
            Plusieurs keynotes et tables rondes avec des intervenant⋅e⋅s prestigieux⋅ses sont organisées tout le week-end
        </EventDetailsCard>

        <EventDetailsCard faIcon="fa-bullhorn" title="Conférences">
            Autour de thématiques techniques: C++, développement Web, embarqué, DevOps; de logiciels libres de création graphique et multimédia; de jeux libres; d'enjeux du logiciel libre dans la société et des communautés.<br />
            <a href="https://2024.capitoledulibre.org/programme/#schedule">Retrouvez les conférences de l'édition 2024</a>
        </EventDetailsCard>

        <EventDetailsCard faIcon="fa-university" title="Ateliers">
            Venez découvrir le logiciel libre lors d'ateliers avec des expert⋅e⋅s pour vous assister.<br /><a href="https://capitoledulibre.org/programme/#schedule">Retrouvez les ateliers de l'édition 2024</a>
        </EventDetailsCard>

        <EventDetailsCard faIcon="fa-life-ring" title="Adoptez le logiciel libre">
            Venez-vous faire aider pour installer Linux, pour corriger les problèmes avec votre Linux ou pour toutes les questions autour du logiciel libre. Un atelier permanent est là pour ça tout le week-end.
        </EventDetailsCard>
      </div>

      <div className="row">
        <EventDetailsCard faIcon="fa-heart" title="Village associatif">
            Retrouvez les associations qui œuvrent pour le logiciel libre: Framasoft, April, Mozilla, Debian, Toulibre,.. <br/>
            <Link href="/village-associatif">Retrouvez la liste des associations présente au village associatif</Link>.
        </EventDetailsCard>

        <EventDetailsCard faIcon="fa-glass-martini" title="Cocktail">
            Un moment de convivialité le samedi soir avec intervenant⋅e⋅s, organisateur⋅trice⋅s et public
        </EventDetailsCard>

        <EventDetailsCard faIcon="fa-truck" title="Food Truck">
          Pour vous restaurer, des food truck sont à votre disposition les midis sur le site.
        </EventDetailsCard>

        <EventDetailsCard faIcon="fa-shopping-cart" title="Boutique de Goodies!">
          Repartez avec un t-shirt, un hoodie aux couleurs de votre projet libre préféré. Les ventes permettent de financer le Capitole du Libre et de financer les projets libres correspondants.
        </EventDetailsCard>        
      </div>
      
      <div className="row">

        <EventDetailsCard faIcon="fa-gamepad" title="LAN Party">
          Venez jouer avec vos ami(e)s à des jeux <a href="img/jeux.pdf">libres</a>
        </EventDetailsCard>


      </div>

      <div className="row">
          <p className="text-center"><a href="https://www.youtube.com/watch?v=b2Pgk1nzq9w" data-toggle="modal" data-target=".video-dialog" className="btn btn-primary btn-xl page-scroll">Découvrez le Capitole du Libre en vidéo</a></p>
      </div>

      <div className="row">
           <p className="text-center"><a href="https://tickets.capitoledulibre.org/cdl/2025/" className="btn btn-primary btn-xl page-scroll"><span>INSCRIPTION GRATUITE OBLIGATOIRE</span></a></p>
      </div>


    </div>
  </section>
)

export default EventDetails;
