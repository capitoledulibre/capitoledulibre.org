import NavBar from '../components/NavBar';
import Partners from '../components/Partners'

export default function Partenaires() {
    return (
        <>
            <NavBar />

            <section id="partenaires-capitole-du-libre">
                <div className="container">
                    <div className="row">

                        <h1>Les Partenaires du Capitole du Libre</h1>


                    </div>
                </div>
            </section>


            <aside className="bg-dark">
          <div className="container text-center" id="sponsor">
            <div className="call-to-action">
              <h2>Soutenez le Capitole du Libre en devenant patenaire!</h2>
              <a href="/Capitole-du-Libre-2025-Plaquette-Partenaires.pdf" className="btn btn-default btn-xl sr-button">Téléchargez notre dossier de partenariat</a>
            </div>
          </div>
        </aside>

        <section id="partners">
          <div className="container">

            <h2>Nos partenaires 2024</h2>

            <Partners/>

          </div>
        </section>



        </>
    )
}
