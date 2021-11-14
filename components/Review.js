const Review = ({name, date, review, rating}) => {
    return (
        <div>
            <p className="review-name">{name}</p>
            <p className="review-date">{date}</p>
            <p className="review-text">{review}</p>
        </div>
    );
};

export default Review;
