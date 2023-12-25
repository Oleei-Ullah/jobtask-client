/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// ReviewCard.js

import SectionHeading from "./SectionHeading";


const ReviewCard = ({ reviews }) => {
    return (

        <div>
            <SectionHeading heading={"Viewers Reviews"} />
            {!reviews.length &&
             <h1 className='text-2xl text-center py-5 font-semibold text-red-600'>Product have no review yet</h1>
            }
            <div className="flex items-center flex-wrap justify-center">
                {
                    reviews?.map(({ authorImg, author, rating, review, _id }) => {
                        return <div key={_id} className="max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-md mb-4">
                            <div className="flex items-center px-6 py-4">
                                <img
                                    className="h-12 w-12 rounded-full object-cover"
                                    src={authorImg}
                                    alt={`Profile of ${author}`}
                                />
                                <div className="ml-4">
                                    <h2 className="text-xl font-semibold text-gray-800">{author}</h2>
                                    <div className="flex items-center mt-1">
                                        <span className="font-bold">Rating:</span>
                                        <span className="ml-1 text-gray-600">{rating}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="px-6 py-4">
                                <p className="text-gray-700 text-base">{review}</p>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>

    )
};

export default ReviewCard;
