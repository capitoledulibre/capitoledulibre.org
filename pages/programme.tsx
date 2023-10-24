import NavBar from "../components/NavBar";
import Head from "next/head";

const Programme = () => {
    return <>
        <Head>
            <script type="text/javascript" src="https://cfp.capitoledulibre.org/cdl-2023/schedule/widget/v2.en.js"></script>
        </Head>
        <NavBar />
        {/* @ts-ignore */}
        <pretalx-schedule
            event-url="https://cfp.capitoledulibre.org/cdl-2023/"
            locale="fr"
            format="grid"
            style={{"--pretalx-clr-primary": "#D03D00"}}
        />
        <noscript>
            <div className="pretalx-widget">
                <div className="pretalx-widget-info-message">
                    JavaScript is disabled in your browser. To access our schedule without JavaScript,
                    please <a target="_blank" href="https://cfp.capitoledulibre.org/cdl-2023/schedule/">click here</a>.
                </div>
            </div>
        </noscript>
    </>
}

export default Programme