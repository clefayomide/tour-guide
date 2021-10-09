import React from "react";
import "./App.css";
import "./style/Card.css";

function App() {
  const [travelDestinations, setTravelDestinations] = React.useState([]);
  const [isloading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);
  const [noDestination, setNoDestination] = React.useState(false);
  React.useEffect(() => {
    fetch("https://course-api.com/react-tours-project")
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          return res.json();
        } else {
          setIsLoading(false);
          setIsError(true);
        }
      })
      .then((data) => {
        setTravelDestinations(data);
        setIsLoading(false);
      });
  }, []);

  const notInterested = (index) => {
    const interested = travelDestinations.filter(
      (destinations) => destinations.id !== index
    );
    setTravelDestinations(interested);
    if (interested.length <= 0) {
      setNoDestination(true);
    }
  };

  const handleRefresh = () => {
    window.location.reload()
  }

  if (isloading) {
    return <h1 className="loading">Loading...</h1>;
  }

  if (isError) {
    return <h1 className="error">Error...</h1>;
  }

  if (noDestination) {
    return (
      <div>
        <h1 className="no-more-destination">No more destination</h1>
        <button className="refresh-btn" onClick={handleRefresh}>Refresh</button>
      </div>
    );
  }

  return (
    <div className="App">
      <h1 className="title">Our Tours</h1>
      {travelDestinations.map((destination) => {
        return (
          <section className="card-container" key={destination.id}>
            <div className="image-container">
              <img
                src={destination.image}
                alt={destination.name}
                className="image"
              />
            </div>

            <div className="info-container">
              <div className="name-price-container">
                <p className="text-title">{destination.name}</p>
                <p className="price">${destination.price}</p>
              </div>
              <p className="info-text">{destination.info}</p>
              <button
                className="btn"
                onClick={() => notInterested(destination.id)}
              >
                Not Interested
              </button>
            </div>
          </section>
        );
      })}
    </div>
  );
}

export default App;
