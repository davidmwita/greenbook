// /import firestore from '../../firebase'
import Image from "next/image";
import Review from "../components/Review";
import Link from "next/link";

const User = ({name, reviews, rating}) => {
    return (
        <div>
            <div className="profile-header">
                <h1 className="loc-name">Vancouver General Hospital</h1>
                <div className="tags">
                    <button>LGBTQ+ friendly</button>
                    <button>POC friendly</button>
                </div>

                {/* <Image src="/public/favicon.ico" width={50} height={30} /> */}
            </div>

            <button>Add Review</button>
            <Review></Review>
        </div>
    );
};

export default User;
