import NavBar from '../components/NavBar';

export default function KeySigningParty() {
    return (
        <>
            <NavBar />

            <section id="ksp">

                <div className="container">
                    <div className="row">

                        <h1>Key Signing Party au Capitole du Libre</h1>

                        <p>Cette année encore la Key signing party pour clef gpg/pgp se déroulera comme pour le <a href="https://fosdem.org">FOSDEM</a>. C’est-à-dire qu’il faudra s’inscrire à l’avance, mais que cela simplifiera considérablement la partie administrative d’un tel évènement.</p>

                        {/* <p>La ksp aura lieu le <strong>dimanche 19 novembre 2017 à 12:30</strong>; Rendez-vous dans l’amphithéâtre B00.</p> */}

                        <p>La méthode du FOSDEM permet de se débarrasser des empreintes de clef individuelles et donc de la possibilité de perdre les petits bouts de papier.</p>

                        <h2>Inscription</h2>
                        <p>Après avoir créé une clef comme indiqué <a href="https://keyring.debian.org/creating-key.html">sur le site de debian</a>, il suffit d’envoyer la clef comme ceci:</p>

                        <pre>$ gpg --keyserver ksp.capitoledulibre.org --send-key 6B17EA1E
                            gpg: sending key 6B17EA1E to hkp server ksp.capitoledulibre.org</pre>

                        <p>en prenant soin d’envoyer votre clef et pas la mienne (6B17EA1E).</p>

                        <p><strong>On peut s’inscrire jusqu’au vendredi 16 novembre 2018 14h00 (heure locale de Toulouse)</strong>. Cela donne un peu de temps aux administrateurs pour générer les fichiers nécessaires à la KSP.</p>

                        <h3>Pour ceux qui n’ont pas de clef</h3>

                        {/*
<p>Le <strong>mercredi 8 novembre à 19:00</strong> au <a href="http://bellegarde.toulouse.fr/">centre culturel Bellegarde</a> aura lieu un
<strong><a href="http://blog.capitoledulibre.org/2016/11-07-introduction-a-la-cryptographie-avant-le-capitole-du-libre.html">atelier</a>
pour créer une clef et prendre en main gpg</strong>.</p>
*/}
                        <p>Un atelier d'introduction à la cryptographie vous permettra de créer votre clé quelques semaines avant le Capitole du Libre. La date sera annoncée ici et sur les réseaux sociaux.</p>


                        <h2>Avant de venir au Capitole du Libre</h2>

                        <p>Se connecter à <a href="http://ksp.capitoledulibre.org/files">cette adresse</a> pour y télécharger le fichier des participants et leurs clefs.  Il faudra vérifier le fichier en utilisant les commandes fournies et les noter dans ledit fichiers. Après on peut soit l’imprimer, soit venir avec son portable et assez de temps de batterie (il faut compter 1 heure par 100 participants).</p>

                        <h2>Le jour même</h2>

                        <p>Venir dans l’amphithéâtre B00. Nous lirons les CRC des fichiers et vous pourrez vérifier que vos fichiers sont les bons. Puis nous expliquerons la marche à suivre pour la suite. Merci de venir avec un justificatif d’identité officiel.</p>

                    </div>
                </div>

            </section>
        </>
    )
}
