import NavBar from '../../components/NavBar';
import styles from './index.module.css'

export default function StandCrepes() {
	return (
		<>
			<NavBar />
			<section className={styles.summary}>
				<div className={styles.container}>
					<h1 className={styles.title}>
						Les crêpes

						<a href="#license" className={styles.license}><img
							src="http://www.wtfpl.net/wp-content/uploads/2012/12/wtfpl-badge-4.png"
							width="80" height="15" alt="WTFPL" />
						</a>
					</h1>
					<img src="/img/crepes.png" alt="Crêpes" className={styles.result} title="Les crêpes du Capitole du Libre" />
				</div>
				<div className={styles.recipe}>
					<p>Pour refaire les bonnes crêpes Bretonne comme lors du Capitole du Libre, il vous faudra :</p>
					<ul>
						<li>500 grammes de farine de froment</li>
						<li>2 cuillères à soupe de farine de sarrasin</li>
						<li>6 œufs</li>
						<li>300 grammes de sucre</li>
						<li>2 sachets de sucre vanillé</li>
						<li>5 grammes de gros sel</li>
						<li>50 grammes de beurre ½ sel fondu</li>
						<li>1 litre de lait entier</li>
					</ul>

					Nous commencerons par battre les œufs, puis nous ajouterons le sucre, le sucre vanillé, le sel. Une fois bien mélangé, nous allons ajouter au fur et à mesure la farine, lorsque mélanger devient trop difficile ajouter un petit peu de lait. Nous finirons par ajouter le reste de lait et le beurre et nous mélangerons bien. Laisser posez puis faite cuire sur une billig à 230°C.
				</div>
			</section>

			<p className={styles.license_txt} id="license">
				Copyright © 2024 Capitole du Libre {"<contact@capitoledulibre.org>"}<br />
				This work is free. You can redistribute it and/or modify it under the
				terms of the Do What The Fuck You Want To Public License, Version 2,
				as published by Sam Hocevar. See <a href="http://www.wtfpl.net/">www.wtfpl.net</a> for more details.
			</p>
		</>
	)
}
