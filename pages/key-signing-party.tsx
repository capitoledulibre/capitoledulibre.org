import NavBar from '../components/NavBar';

export default function KeySigningParty() {
    return (
        <>
            <NavBar />

            <section id="ksp">

                <div className="container">
                    <div className="row">

                        <h1>Key Signing Party au Capitole du Libre</h1>

                        <p>Cette année encore la Key signing party pour clef gpg/pgp se déroulera comme suit : venez à la KSP avec une empreinte imprimée de votre clef.</p>

                        <h2>Inscription</h2>
                        <p>Après avoir créé une clef comme indiqué <a href="https://keyring.debian.org/creating-key.html">sur le site de debian</a>, il suffit d’imprimer l'empreinte de la clef comme ceci:</p>

                        <p>
 $ gpg --list-key 34246C61F792FBCC1F23BFF296BD1F38FEA32B4D<br/>
pub   ed25519 2022-03-01 [SC]a<br/>
      34246C61F792FBCC1F23BFF296BD1F38FEA32B4D<br/>
uid           [ultimate] Ludovic Hirlimann (ECC key) &lt;ludovic@hirlimann.net&gt;<br/>
sub   cv25519 2022-03-01 [E]<br/>
                        </p>

                        <p>En utilisant bien évidement votre clef.</p>

                        <h2>Le jour même</h2>

                        <p>Venir dans l’amphithéâtre B00.  Puis nous expliquerons la marche à suivre pour la suite. Merci de venir avec un justificatif d’identité officiel.</p>

                    </div>
                </div>

            </section>
        </>
    )
}
