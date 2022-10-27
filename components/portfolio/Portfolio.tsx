import "magnific-popup/dist/magnific-popup.css";

import React, {useEffect} from "react";

import thumbnail1 from "./thumbnails/1.jpg"
import thumbnail2 from "./thumbnails/2.jpg"
import thumbnail3 from "./thumbnails/3.jpg"
import thumbnail4 from "./thumbnails/4.jpg"
import thumbnail5 from "./thumbnails/5.jpg"
import thumbnail6 from "./thumbnails/6.jpg"
import thumbnail7 from "./thumbnails/7.jpg"
import thumbnail8 from "./thumbnails/8.jpg"
import thumbnail9 from "./thumbnails/9.jpg"
import thumbnail10 from "./thumbnails/10.jpg"
import thumbnail11 from "./thumbnails/11.jpg"
import thumbnail12 from "./thumbnails/12.jpg"

import fullSize1 from "./fullsize/1.jpg"
import fullSize2 from "./fullsize/2.jpg"
import fullSize3 from "./fullsize/3.jpg"
import fullSize4 from "./fullsize/4.jpg"
import fullSize5 from "./fullsize/5.jpg"
import fullSize6 from "./fullsize/6.jpg"
import fullSize7 from "./fullsize/7.jpg"
import fullSize8 from "./fullsize/8.jpg"
import fullSize9 from "./fullsize/9.jpg"
import fullSize10 from "./fullsize/10.jpg"
import fullSize11 from "./fullsize/11.jpg"
import fullSize12 from "./fullsize/12.jpg"

const Portfolio = () => {
    useEffect(() => {
        import("magnific-popup/dist/jquery.magnific-popup").then(() => {
            window.$('#popup-gallery').magnificPopup({
                delegate: 'a', // child items selector, by clicking on it popup will open
                type: 'image',
                gallery: {
                    enabled: true,
                }
            });
        });
    }, [])

    return (
    <section className="no-padding" id="portfolio">
        <div className="container-fluid">
            <div id="popup-gallery" className="row no-gutter">
                <div className="col-lg-4 col-sm-6">
                    <a href={fullSize1.src} className="portfolio-box">
                        <img src={thumbnail1.src} className="img-responsive" alt="" />
                        <div className="portfolio-box-caption">
                            <div className="portfolio-box-caption-content">
                                <div className="project-category text-faded">
                                    Keynotes
                                </div>
                                <div className="project-name">
                                    Capitole du Libre 2016
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
                <div className="col-lg-4 col-sm-6">
                    <a href={fullSize2.src} className="portfolio-box">
                        <img src={thumbnail2.src} className="img-responsive" alt="" />
                        <div className="portfolio-box-caption">
                            <div className="portfolio-box-caption-content">
                                <div className="project-category text-faded">
                                    Ateliers
                                </div>
                                <div className="project-name">
                                    Capitole du Libre 2016
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
                <div className="col-lg-4 col-sm-6">
                    <a href={fullSize3.src} className="portfolio-box">
                        <img src={thumbnail3.src} className="img-responsive" alt="" />
                        <div className="portfolio-box-caption">
                            <div className="portfolio-box-caption-content">
                                <div className="project-category text-faded">
                                    Atelier installation Linux
                                </div>
                                <div className="project-name">
                                    Capitole du Libre 2017
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
                <div className="col-lg-4 col-sm-6">
                    <a href={fullSize4.src} className="portfolio-box">
                        <img src={thumbnail4.src} className="img-responsive" alt="" />
                        <div className="portfolio-box-caption">
                            <div className="portfolio-box-caption-content">
                                <div className="project-category text-faded">
                                    Conférences Framasoft
                                </div>
                                <div className="project-name">
                                    Capitole du Libre 2017
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
                <div className="col-lg-4 col-sm-6">
                    <a href={fullSize5.src} className="portfolio-box">
                        <img src={thumbnail5.src} className="img-responsive" alt="" />
                        <div className="portfolio-box-caption">
                            <div className="portfolio-box-caption-content">
                                <div className="project-category text-faded">
                                    Mozilla au village associatif
                                </div>
                                <div className="project-name">
                                    Capitole du Libre 2017
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
                <div className="col-lg-4 col-sm-6">
                    <a href={fullSize6.src} className="portfolio-box">
                        <img src={thumbnail6.src} className="img-responsive" alt="" />
                        <div className="portfolio-box-caption">
                            <div className="portfolio-box-caption-content">
                                <div className="project-category text-faded">
                                    Keynote du samedi soir avec FDN, la Quadrature et Framasoft
                                </div>
                                <div className="project-name">
                                    Capitole du Libre 2016
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
                <div className="col-lg-4 col-sm-6">
                    <a href={fullSize7.src} className="portfolio-box">
                        <img src={thumbnail7.src} className="img-responsive" alt="" />
                        <div className="portfolio-box-caption">
                            <div className="portfolio-box-caption-content">
                                <div className="project-category text-faded">
                                    Amphithéâtre plein pour la keynote du samedi soir!
                                </div>
                                <div className="project-name">
                                    Capitole du Libre 2016
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
                <div className="col-lg-4 col-sm-6">
                    <a href={fullSize8.src} className="portfolio-box">
                        <img src={thumbnail8.src} className="img-responsive" alt="" />
                        <div className="portfolio-box-caption">
                            <div className="portfolio-box-caption-content">
                                <div className="project-category text-faded">
                                    Conférences
                                </div>
                                <div className="project-name">
                                    Capitole du Libre 2016
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
                <div className="col-lg-4 col-sm-6">
                    <a href={fullSize9.src} className="portfolio-box">
                        <img src={thumbnail9.src} className="img-responsive" alt="" />
                        <div className="portfolio-box-caption">
                            <div className="portfolio-box-caption-content">
                                <div className="project-category text-faded">
                                    Keynote du samedi soir autour du logiciel libre
                                </div>
                                <div className="project-name">
                                    Capitole du Libre 2017
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
                <div className="col-lg-4 col-sm-6">
                    <a href={fullSize10.src} className="portfolio-box">
                        <img src={thumbnail10.src} className="img-responsive" alt="" />
                        <div className="portfolio-box-caption">
                            <div className="portfolio-box-caption-content">
                                <div className="project-category text-faded">
                                    Stands du village associatif
                                </div>
                                <div className="project-name">
                                    Capitole du Libre 2017
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
                <div className="col-lg-4 col-sm-6">
                    <a href={fullSize11.src} className="portfolio-box">
                        <img src={thumbnail11.src} className="img-responsive" alt="" />
                        <div className="portfolio-box-caption">
                            <div className="portfolio-box-caption-content">
                                <div className="project-category text-faded">
                                    Conférences (Docker!)
                                </div>
                                <div className="project-name">
                                    Capitole du Libre 2016
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
                <div className="col-lg-4 col-sm-6">
                    <a href={fullSize12.src} className="portfolio-box">
                        <img src={thumbnail12.src} className="img-responsive" alt="" />
                        <div className="portfolio-box-caption">
                            <div className="portfolio-box-caption-content">
                                <div className="project-category text-faded">
                                    L'équipe d'organisation et les bénévoles
                                </div>
                                <div className="project-name">
                                    Capitole du Libre 2017
                                </div>
                            </div>
                        </div>
                    </a>
                </div>

            </div>
        </div>
    </section>    
)
}

export default Portfolio;
