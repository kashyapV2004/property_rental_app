import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddListing() {
  const navigate = useNavigate();
  const location = useLocation();

  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("http://localhost:8080/listings/new", {
          withCredentials: true,
        });
      } catch (err) {
        if (err.response && err.response.status === 401) {
          navigate("/login", { state: { from: location.pathname } });
          toast.info("You have to login first...");
        }
      }
    };
    checkAuth();
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    price: 0,
    location: "",
    country: "",
  });

  const [errors, setErrors] = useState({});
  const [previewImage, setPreviewImage] = useState(null);

  // Validate form
  const validateForm = () => {
    const tempErrors = {};

    if (!formData.title.trim()) tempErrors.title = "Title is required";
    if (!formData.description.trim())
      tempErrors.description = "Description is required";
    if (!formData.image) tempErrors.image = "Image is required";
    if (!formData.price.trim()) tempErrors.price = "Price is required";
    if (!formData.location.trim()) tempErrors.location = "Location is required";
    if (!formData.country.trim()) tempErrors.country = "Country is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setFormData({ ...formData, image: file });
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setPreviewImage(reader.result);
        reader.readAsDataURL(file);
      } else {
        setPreviewImage(null);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }

    // Clear individual error while typing
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const data = new FormData();
      // Wrap fields under "listing" to match backend
      data.append("listing[title]", formData.title);
      data.append("listing[description]", formData.description);
      data.append("listing[price]", Number(formData.price));
      data.append("listing[location]", formData.location);
      data.append("listing[country]", formData.country);
      if (formData.image) data.append("image", formData.image);

      await axios.post("http://localhost:8080/listings", data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Reset form
      setFormData({
        title: "",
        description: "",
        image: null,
        price: 0,
        location: "",
        country: "",
      });
      setPreviewImage(null);
      navigate("/listings");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to create listing");
    }
  };

  return (
    <div className="row mt-3">
      <div className="col-lg-8 offset-2">
        <h3 className="mb-3">Create a New Listing</h3>
        <form onSubmit={handleSubmit} noValidate encType="multipart/form-data">
          {/* Title */}
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={`form-control ${errors.title ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.title}</div>
          </div>

          {/* Description */}
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className={`form-control ${
                errors.description ? "is-invalid" : ""
              }`}
            ></textarea>
            <div className="invalid-feedback">{errors.description}</div>
          </div>

          {/* Image */}
          <div className="mb-3">
            <label className="form-label">Upload Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleInputChange}
              className={`form-control ${errors.image ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.image}</div>
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="mt-2"
                style={{ maxWidth: "200px", maxHeight: "200px" }}
              />
            )}
          </div>

          <div className="row">
            {/* Price */}
            <div className="mb-3 col-lg-6">
              <label className="form-label">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className={`form-control ${errors.price ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">{errors.price}</div>
            </div>

            {/* Location */}
            <div className="mb-3 col-lg-6">
              <label className="form-label">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className={`form-control ${errors.location ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">{errors.location}</div>
            </div>
          </div>

          {/* Country */}
          <div className="mb-3">
            <label className="form-label">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className={`form-control ${errors.country ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.country}</div>
          </div>

          <button className="btn btn-dark mt-3 mb-3">Add Listing</button>
        </form>
      </div>
    </div>
  );
}
