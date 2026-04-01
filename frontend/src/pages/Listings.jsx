import API from "../api";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Filter from "../component/Filters";
import { toast } from "react-toastify";

export default function Listings() {
  const [allListings, setAllListings] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get("search");

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await API.get(`/listings?search=${search || ""}`);
        setAllListings(res.data);
      } catch (err) {
        toast.error(err);
      }
    };
    fetchListing();
  }, [search]);

  return (
    <>
      <Filter allList={allListings} />
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
