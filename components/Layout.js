import Head from "next/head";
import Link from "next/link";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({children, home}) {
    return (
        <div>
            <Head>
                <title>include</title>
            </Head>

            <header>{home ? <></> : <></>}</header>
            <Navbar />

            <main>{children}</main>

            {!home && (
                <div>
                    <Link href="/">
                        <a>← Back to home</a>
                    </Link>
                </div>
            )}
        </div>
    );
}
