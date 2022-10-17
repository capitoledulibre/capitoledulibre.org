import Link from "next/link";

import { createIcons, Send, Mic2, Code, LifeBuoy, HeartHandshake, Baby, Beer, Coins, Gamepad2, Truck, Shirt } from 'lucide';
import { useEffect } from "react";

type EventDetailsCardProps = {
  icon: string;
  title: string;
  children: React.ReactNode;
}

const EventDetailsCard = ({icon, title, children}: EventDetailsCardProps) => (
  <>
    <style jsx>{`
      svg {
        width: 56px;
        height: 56px;
      }
  `}</style>
  <div className="col-lg-3 col-md-6 text-center">
    <div className="service-box">
      <i icon-name={icon} className="text-primary sr-icons"></i>
      <h3>{title}</h3>
      <p className="text-muted">
        {children}
      </p>
    </div>
  </div>
  </>
)

const EventDetails = () => {
  useEffect(() => {
      createIcons({
          icons: {
              Send, Mic2, Code, LifeBuoy, HeartHandshake, Baby, Beer, Coins, Gamepad2, Truck, Shirt
          },
      });
  }, [])

  return (
  <section id="event">
    <div className="container">
      <div className="row">
        <div className="col-lg-12 text-center">
          <h2 className="section-heading">L'événement en détails</h2>
          <hr className="primary" />
        </div>
      </div>
    </div>
    <div className="container">
      <div className="row">
        <EventDetailsCard icon="send" title="Keynotes">
            Plusieurs keynotes et tables rondes avec des intervenant⋅e⋅s prestigieux⋅ses sont organisées tout le week-end
        </EventDetailsCard>

        <EventDetailsCard icon="mic-2" title="Conférences">
            Autour de thématiques techniques: C++, développement Web, embarqué, DevOps; de logiciels libres de création graphique et multimédia; de jeux libres; d'enjeux du logiciel libre dans la société et des communautés.<br />
            <a href="https://2019.capitoledulibre.org/programme/#schedule">Retrouvez les conférences de l'édition 2019</a>
        </EventDetailsCard>

        <EventDetailsCard icon="code" title="Ateliers">
            Venez découvrir le logiciel libre lors d'ateliers avec des expert⋅e⋅s pour vous assister.<br /><a href="https://2019.capitoledulibre.org/programme/#schedule">Retrouvez les ateliers de l'édition 2019</a>
        </EventDetailsCard>

        <EventDetailsCard icon="life-buoy" title="Adoptez le logiciel libre">
            Venez-vous faire aider pour installer Linux, pour corriger les problèmes avec votre Linux ou pour toutes les questions autour du logiciel libre. Un atelier permanent est là pour ça tout le week-end.
        </EventDetailsCard>
      </div>

      <div className="row">
        <EventDetailsCard icon="heart-handshake" title="Village associatif">
            Retrouvez les associations qui œuvrent pour le logiciel libre: Framasoft, April, Mozilla, Debian, Toulibre,.. <br/>
            <Link href="/village-associatif">Retrouvez la liste des associations présente au village associatif</Link>.
        </EventDetailsCard>

        <EventDetailsCard icon="baby" title="Ateliers pour les enfants">
            Les logiciels libres ludiques pour les plus jeunes à partir de 8 ans de 14h à 18h le samedi et de 14h à 16h le dimanche.
        </EventDetailsCard>

        <EventDetailsCard icon="beer" title="Cocktail">
            Un moment de convivialité le samedi soir avec intervenant⋅e⋅s, organisateur⋅trice⋅s et public
        </EventDetailsCard>
      </div>
      
      <div className="row">
        <EventDetailsCard icon="coins" title="Entrée">
          L'entrée à l'événement est libre et gratuite!
        </EventDetailsCard>

        <EventDetailsCard icon="gamepad-2" title="LAN Party">
          Venez jouer avec vos ami(e)s à des jeux <a href="img/jeux.pdf">libres</a>
        </EventDetailsCard>

        <EventDetailsCard icon="truck" title="Food Truck">
          Pour vous restaurer, des food truck sont à votre disposition les midis sur le site.
        </EventDetailsCard>

        <EventDetailsCard icon="shirt" title="Boutique de Goodies!">
          Repartez avec un t-shirt, un hoodie aux couleurs de votre projet libre préféré. Les ventes permettent de financer le Capitole du Libre et de financer les projets libres correspondants.
        </EventDetailsCard>
      </div>

    </div>
  </section>
)
}

export default EventDetails;
