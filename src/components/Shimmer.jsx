import "../App.css";


const Shimmer = () => {
    return (
      <div className="shimmer-container">
        {[...Array(9)].map((_, index) => (
          <div key={index} className="shimmer-card">
            <div className="shimmer-img shine"></div>
            <div className="shimmer-details">
              <div className="shimmer-title shine"></div>
              <div className="shimmer-location shine"></div>
              <div className="shimmer-price shine"></div>
              <div className="shimmer-cuisine shine"></div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  

export default Shimmer;
