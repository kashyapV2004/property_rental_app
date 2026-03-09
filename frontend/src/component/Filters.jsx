export default function Filter() {
    return (
      <div id="filters">
        <div className="filter">
          <div>
            <i className="fa-solid fa-fire"></i>
          </div>
          <p>Trending</p>
        </div>
        <div className="filter">
          <div>
            <i className="fa-solid fa-bed"></i>
          </div>
          <p>Rooms</p>
        </div>
        <div className="filter">
          <div>
            <i className="fa-solid fa-mountain-city"></i>
          </div>
          <p>Iconic Cities</p>
        </div>
        <div className="filter">
          <div>
            <i className="fa-solid fa-mountain"></i>
          </div>
          <p>Mountains</p>
        </div>
        <div className="filter">
          <div>
            <i className="fa-brands fa-fort-awesome"></i>
          </div>
          <p>Castles</p>
        </div>
        <div className="filter">
          <div>
            <i className="fa-solid fa-person-swimming"></i>
          </div>
          <p>Amazing Pools</p>
        </div>
        <div className="filter">
          <div>
            <i className="fa-solid fa-campground"></i>
          </div>
          <p>Camping</p>
        </div>
        <div className="filter">
          <div>
            <i className="fa-solid fa-cow"></i>
          </div>
          <p>Farms</p>
        </div>
        <div className="filter">
          <div>
            <i className="fa-regular fa-snowflake"></i>
          </div>
          <p>Arctic</p>
        </div>
        <div className="tax-toggle">
          <div className="form-check-reverse form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckChecked"
            />
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckChecked"
            >
              Display total after taxes
            </label>
          </div>
        </div>
      </div>
    );
}