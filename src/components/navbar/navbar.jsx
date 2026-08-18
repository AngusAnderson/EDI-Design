import "./navbar.css";

const navigationItems = [
  {
    label: "Arrivals & Departures",
    href: "#arrivals-departures",
  },
  {
    label: "Flights & Destinations",
    href: "#flights-destinations",
  },
  {
    label: "Transport Links",
    href: "#transport-links",
  },
  {
    label: "Parking",
    href: "#parking",
  },
  {
    label: "Eat, Shop & Explore",
    href: "#eat-shop-explore",
  },
  {
    label: "Mission Planning",
    href: "#Mission-planning",
  },
];

export function Navbar() {
  return (
    <nav className="navbar" aria-label="Primary navigation">
      <div className="navbar__inner">
        {navigationItems.map((item) => (
          <a
            className="navbar__link"
            href={item.href}
            key={item.label}
          >
            <span>{item.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}