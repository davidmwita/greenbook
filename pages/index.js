import Head from "next/head";
import Image from "next/image";
import Map from "../components/Map"
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import styles from "../styles/Home.module.css";

export default function Home() {
    return (<div className={styles.container}>
        <h1 className="logo-home">include</h1>
        <div className="tagline">amplify voices for inclusive healthcare</div>
        <Map />
    </div>);
}
