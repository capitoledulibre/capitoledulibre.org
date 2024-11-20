import NavBar from '../components/NavBar';

export default function FAQ() {
    return (
        <>
            <NavBar />

            <section id="faq">
                <div className="container">
                    <div className="row">

                        <h1>Questions Fréquences</h1>

                        <p>Retrouvez ici les questions que l'on nous pose fréquemment à propos de l'évènement.</p>

                        <h2>L'évènement est gratuit?</h2>

                        <p>L'évènement est gratuit et ouvert à toutes et tous. Depuis 2023, il faut au préalable s'inscrire sur Internet pour disposer d'un billet valide. Nous ne procédons pas à des vérifications d'identité, mais un contrôle des sacs est effectué à l'entrée du site.</p>

                        <h2>Comment venir?</h2>

                        <p>Nous avons dédié une <a href="/venir">page</a> aux accès à l'évènement.</p>

                        <h2>Puis-je venir avec mes enfants ? Ma famille ?</h2>

                        <p>Toutes et tous sont les bienvenus. Des conférences sont accessibles à tous les niveaux, de l'initiation à l'expertise. Pour les plus jeunes, des ateliers et initation sont mis en place chaque année.</p>

                        <h2>J'aime beaucoup le logo / la croix occitane stylisée. Je peux la trouver quelque part?</h2>

                        <p>Merci! Les illustrations de toutes les années, ainsi que le logo du Capitole du libre, sont <a href="/logos">listées ici</a></p>

                    </div>
                </div>

            </section>
        </>
    )
}
