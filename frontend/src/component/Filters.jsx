import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Filter() {
  const navigate = useNavigate();

  const filters = [
    { label: "Trending", icon: "fa-solid fa-fire", value: "trending" },
    { label: "Rooms", icon: "fa-solid fa-bed", value: "room" },
    {
      label: "Iconic cities",
      icon: "fa-solid fa-mountain-city",
      value: "city",
    },
    { label: "Mountains", icon: "fa-solid fa-mountain", value: "mountain" },
    { label: "Castles", icon: "fa-brands fa-fort-awesome", value: "castle" },
    {
      label: "Amazing Pools",
      icon: "fa-solid fa-person-swimming",
      value: "pool",
    },
    { label: "Camping", icon: "fa-solid fa-campground", value: "camping" },
    { label: "Farms", icon: "fa-solid fa-cow", value: "farm" },
    { label: "Arctic", icon: "fa-regular fa-snowflake", value: "snow" },
  ];

  const handleClick = (search) => {
    navigate(`/listings?search=${search}`);
  };
  return (
    <div id="filters">
      {filters.map((item, index) => (
        <div
          key={index}
          onClick={() => handleClick(item.value)}
          className="filter"
        >
          <div>
            <i className={item.icon}></i>
          </div>
          <p>{item.label}</p>
        </div>
      ))}
      <div className="tax-toggle">
        <div className="form-check-reverse form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckChecked"
          />
          <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
            Display total after taxes
          </label>
        </div>
      </div>
    </div>
  );
}
