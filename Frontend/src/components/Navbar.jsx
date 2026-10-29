
import { Button } from "antd";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="brand">
          <span className="brand-mark">D</span>
          <span>digipeddle<span className="brand-dot">.</span></span>
        </Link>

        <nav className="nav-links">
          <a href="#services">Services</a>
          <a href="#process">Our process</a>
          <a href="#contact">Contact</a>
        </nav>

        <Button
          type="primary"
          className="nav-cta"
          onClick={() =>
            document.getElementById("contact")?.scrollIntoView({
              behavior: "smooth",
            })
          }
        >
          Let's talk <span aria-hidden="true">↗</span>
        </Button>
      </div>
    </header>
  );
}