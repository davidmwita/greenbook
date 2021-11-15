const Review = ({name, date, review, rating}) => {
    return (
        <div className="review-box">
            <p className="review-name">Anonymous</p>
            <p className="review-date">13-11-2021</p>
            <p className="review-text">Wonderful</p>
        </div>
    );
};

export default Review;
