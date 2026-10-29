
import { Link } from "react-router-dom";
import { ArrowRightOutlined } from "@ant-design/icons";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          <div>
            <Link to="/" className="brand footer-brand">
              <span className="brand-mark">D</span>
              <span>digipeddle<span className="brand-dot">.</span></span>
            </Link>
            <p>
              Thoughtful digital experiences.
              <br />
              Built for what comes next.
            </p>
          </div>

          <div className="footer-right">
            <span>HAVE A PROJECT IN MIND?</span>
            <a href="#contact">
              Let's talk <ArrowRightOutlined />
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Digipeddle</span>
          <span>Made with purpose.</span>
        </div>
      </div>
    </footer>
  );
}