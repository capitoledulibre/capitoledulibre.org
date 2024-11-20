import NavBar from "../../components/NavBar"
import styles from "./index.module.css"

type Illustration = {
  ext: "png" | "svg"
  by: {
    url: string
    name: string
  }
}

export default function Logos() {
  const illustrations: Record<number, Illustration> = {
    // TODO: add past editions (idk who designed them)
    2024: {
      ext: "svg",
      by: { url: "https://gwen.works", name: "Gwen Le Bihan" },
      // blogpost: "https://gwen.works/capitole-du-libre" TODO: publish this ^^
    },
  }

  return (
    <>
      <NavBar />
      <section id="logos">
        <div className="container">
          <div className="row">
            <h1>Logos du Capitole du Libre</h1>
            <section>
              <h2>Logo permanent</h2>
              <p>Voici le logo du Captiole du Libre</p>
              <img
                className={styles.illustrationImage}
                src="/img/logo-capitoledulibre.png"
                alt="Logo permanent"
              />
            </section>
            <section>
              <h2>Illustration annuelle</h2>
              <p>
                Utilisée sur les visuels d'une édition (T-shirts, affiches,
                etc). Change chaque année.
              </p>
              {Object.entries(illustrations).map(([year, { by, ext }]) => (
                <>
                  <h3>Édition {year}</h3>
                  <figure className={styles.illustration}>
                    <img
                      className={styles.illustrationImage}
                      src={`/img/croix-${year}.${ext}`}
                      alt={`Illustration de l'édition ${year}`}
                    />
                    <figcaption className={styles.illustrationCaption}>
                      Par <a href={by.url}>{by.name}</a>
                    </figcaption>
                  </figure>
                </>
              ))}
            </section>
          </div>
        </div>
      </section>
    </>
  )
}
