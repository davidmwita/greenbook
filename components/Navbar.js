import Link from "next/link";
const Navbar = () => {
    return (
        <nav>
            <div className="logo">
                <Link href="/">
                    <a className="logo-text">include</a>
                </Link>
                {/* <img src="" alt="" /> */}
            </div>

            {/* <Link href="/">
                <a className="home">HOME</a>
            </Link> */}
            <form action="/search" method="get">
                <div className="searchbar">
                    <input
                        type="text"
                        name="search"
                        placeholder="Search a location near you"
                        className="searchbar"
                    />
                </div>
            </form>
            <Link href="/login">
                <a className="login">Sign In</a>
            </Link>
        </nav>
    );
};

export default Navbar;
