import { ReactNode, useEffect, useState } from "react";

export default function Stars({
    maxRating,
    ratingOfProduct,
    fillColor,
}: {
    maxRating: number;
    ratingOfProduct: number;
    fillColor?: string;
}) {
    const stars: ReactNode[] = [];
    const distributedRating: number[] = Array(maxRating).fill(0);
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    const breakPoint = windowSize < 1280 ? "50" : "20";
    const color = fillColor ? fillColor : "black";

    let rating = ratingOfProduct;

    useEffect(() => {
        const handleResize = () => {
            setWindowSize(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    for (let i = 0; i < distributedRating.length; i++) {
        if (rating <= 0) break;
        if (rating > 1) {
            distributedRating[i] = 1;
        } else {
            distributedRating[i] = rating;
        }
        rating -= 1;
    }

    for (let j = 0; j < distributedRating.length; j++) {
        stars.push(
            <svg viewBox="0 0 576 512" width={`${breakPoint}`}>
                <defs>
                    <clipPath id="star">
                        <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
                    </clipPath>
                </defs>

                <rect x="0" y="0" fill={color} width="100%" height="100%" clipPath="url(#star)" />
                <rect
                    x={`${distributedRating[j] * 100}%`}
                    y="0"
                    fill="rgb(217,217,217)"
                    width="100%"
                    height="100%"
                    clipPath="url(#star)"
                />
            </svg>
        );
    }
    return (
        <div style={{ display: "flex" }}>
            {stars.map((star, index) => {
                return <div key={index}>{star}</div>;
            })}
        </div>
    );
}
