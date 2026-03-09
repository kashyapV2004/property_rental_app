import { useState } from "react";

export default function StarRating({ rating, setRating }) {
  const [hover, setHover] = useState(null);

  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{
            fontSize: "28px",
            cursor: "pointer",
            color: star <= (hover || rating) ? "#ffc107" : "#e4e5e9",
          }}
          onClick={() => setRating(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(null)}
        >
          &#9734;
        </span>
      ))}
    </div>
  );
}