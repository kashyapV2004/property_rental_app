import API from "../api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Filter from "../component/Filters";
import { toast } from "react-toastify";

export default function Listings() {
  const [allListings, setAllListings] = useState([]);

  useEffect(() => {
    API
      .get("/listings")
      .then((res) => {
        setAllListings(res.data);
      })
      .catch((err) => {
        toast.error(err);
      });
  }, []);

  return (
    <>
      <Filter />
      <div className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-1 mt-3">
        {allListings.map((list) => (
          <Link
            to={`/listings/${list._id}`}
            className="list-link"
            key={list._id}
          >
            <div className="card col listing-card">
              <img
                src={list.image?.url}
                className="card-img-top"
                style={{ height: "20rem" }}
                alt={list.image?.filename}
              />
              <div className="card-img-overlay"></div>
              <div className="card-body">
                <p className="card-text">
                  <b>&nbsp; {list.title}</b>
                  <br />
                  &nbsp; &#8377;{list.price?.toLocaleString("en-IN")} / Night
                  <i className="tax-info">&nbsp; + 18% GST</i>
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
