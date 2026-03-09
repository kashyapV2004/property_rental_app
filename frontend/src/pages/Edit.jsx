import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [originalImageUrl, setOriginalImageUrl] = useState(null);
  const [listing, setListing] = useState({
    title: "",
    description: "",
    image: null,
    price: "",
    location: "",
    country: "",
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setListing((prev) => ({ ...prev, image: files[0] }));
    } else if (name === "price") {
      setListing((prev) => ({ ...prev, price: Number(value) }));
    } else {
      setListing((prev) => ({ ...prev, [name]: value }));
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/listings/${id}/edit`, {
        withCredentials: true,
      })
      .then((res) => {
        setListing(res.data.listing);
        setOriginalImageUrl(res.data.originalImageUrl);
      })
      .catch((err) => {
        toast.error(err.message);
        console.log(err);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("listing[title]", listing.title);
      formData.append("listing[description]", listing.description);
      formData.append("listing[price]", listing.price);
      formData.append("listing[location]", listing.location);
      formData.append("listing[country]", listing.country);
      if (listing.image instanceof File) {
        formData.append("image", listing.image);
      }

      await axios.put(`http://localhost:8080/listings/${id}`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Listing has been upadated successfully...");
      navigate(`/listings/${id}`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="row mt-3">
      <div className="col-lg-8 offset-2">
        <h3 className="mb-3">Edit List</h3>
        <form
          noValidate
          className="needs-validation"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={listing?.title || ""}
              onChange={handleInputChange}
              required
            />
            <div className="valid-feedback">Title looks good.</div>
            <div className="invalid-feedback">Title should be valid!</div>
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              type="text"
              name="description"
              className="form-control"
              value={listing?.description || ""}
              onChange={handleInputChange}
              required
            />
            <div className="valid-feedback">Description looks good.</div>
            <div className="invalid-feedback">Description should be valid!</div>
          </div>

          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Original image
            </label>
            <br />
            <img alt={listing?.image?.filename} src={originalImageUrl} />
          </div>

          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Upload New Image
            </label>
            <input
              type="file"
              onChange={handleInputChange}
              name="image"
              className="form-control"
            />
          </div>

          <div className="row">
            <div className="mb-3 col-lg-6">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                type="text"
                name="price"
                className="form-control"
                value={listing?.price || ""}
                onChange={handleInputChange}
                required
              />
              <div className="valid-feedback">Price looks good.</div>
              <div className="invalid-feedback">Price should be valid!</div>
            </div>

            <div className="mb-3 col-lg-6">
              <label htmlFor="location" className="form-label">
                Location
              </label>
              <input
                type="text"
                name="location"
                className="form-control"
                value={listing?.location || ""}
                onChange={handleInputChange}
                required
              />
              <div className="valid-feedback">Location looks good.</div>
              <div className="invalid-feedback">Location should be valid!</div>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="country" className="form-label">
              Country
            </label>
            <input
              type="text"
              name="country"
              className="form-control"
              value={listing?.country || ""}
              onChange={handleInputChange}
              required
            />
            <div className="valid-feedback">Country looks good.</div>
            <div className="invalid-feedback">Country should be valid!</div>
          </div>
          <button className="btn btn-dark edit-btn mt-3 mb-3">Edit</button>
        </form>
      </div>
    </div>
  );
}
