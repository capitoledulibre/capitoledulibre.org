import NavBar from '../../components/NavBar';
import Partners from '../../components/Partners'
import styles from './index.module.css'

export default function StandCrepes() {
	return (
		<>
			<NavBar />
			<section className={styles.summary}>
				<div className={styles.container}>
					<h1 className={styles.title}>Les crêpes</h1>
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
		</>
	)
}
