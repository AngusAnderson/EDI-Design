export function DestinationSelector({ destinations, onSelect }) {
    return (
      <div className="destination-selector">
        {destinations.map((destination) => (
          <button
            className="destination-selector__card"
            key={destination.id}
            type="button"
            onClick={() => onSelect(destination)}
          >
            <span
              className="destination-selector__planet"
              style={{
                background: `radial-gradient(
                  circle at 32% 28%,
                  ${destination.ringColor},
                  ${destination.color} 58%,
                  #101420 100%
                )`,
              }}
            />
  
            <span className="destination-selector__content">
              <strong>{destination.name}</strong>
              <small>{destination.type}</small>
            </span>
  
            <span className="destination-selector__arrow" aria-hidden="true">
              →
            </span>
          </button>
        ))}
      </div>
    );
  }