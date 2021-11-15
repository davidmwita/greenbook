import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import "../styles/globals.css";
import "../styles/map.css";

function MyApp({Component, pageProps}) {
    return (
        <>
            <Navbar />
            <Component {...pageProps} />
        </>
        // <Layout>
        //     <Component {...pageProps} />
        // </Layout>
    );
}

export default MyApp;
