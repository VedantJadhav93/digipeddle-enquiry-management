
import { Button } from "antd";
import { ArrowDownOutlined, ArrowRightOutlined } from "@ant-design/icons";

export default function Hero() {
  const goToContact = () => {
    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="status-dot" />
            YOUR PARTNER IN DIGITAL GROWTH
          </div>

          <h1>
            Good ideas.
            <br />
            <span className="gradient-text">Remarkable</span>
            <br />
            digital experiences.
          </h1>

          <p className="hero-description">
            We design and build digital products that help ambitious
            businesses move forward — from the first idea to the final launch.
          </p>

          <div className="hero-actions">
            <Button
              type="primary"
              size="large"
              onClick={goToContact}
              icon={<ArrowRightOutlined />}
              iconPlacement="end"
            >
              Start a project
            </Button>

            <a className="text-link" href="#services">
              Explore our services <ArrowDownOutlined />
            </a>
          </div>

          <div className="hero-proof">
            <div className="proof-avatars" aria-hidden="true">
              <span>UI</span>
              <span>UX</span>
              <span>DX</span>
            </div>
            <div>
              <strong>Ideas into impact</strong>
              <p>Thoughtful design. Reliable development.</p>
            </div>
          </div>
        </div>

        <div className="hero-visual" aria-label="Digital project illustration">
          <div className="orb orb-one" />
          <div className="orb orb-two" />

          <div className="visual-card visual-card-main">
            <div className="mock-browser">
              <span />
              <span />
              <span />
              <div className="mock-address">digipeddle.com</div>
            </div>
            <div className="mock-content">
              <div className="mock-kicker">THINK. BUILD. GROW.</div>
              <div className="mock-title">Make your next move count.</div>
              <div className="mock-line" />
              <div className="mock-line mock-line-short" />
              <div className="mock-button">Explore more ↗</div>
              <div className="mock-chart">
                <span style={{ height: "35%" }} />
                <span style={{ height: "53%" }} />
                <span style={{ height: "43%" }} />
                <span style={{ height: "72%" }} />
                <span style={{ height: "61%" }} />
                <span style={{ height: "91%" }} />
              </div>
            </div>
          </div>

          <div className="floating-note note-top">
            <span className="note-icon">✳</span>
            <div><strong>Design-led</strong><small>Every detail matters</small></div>
          </div>

          <div className="floating-note note-bottom">
            <span className="note-check">✓</span>
            <div><strong>Built to scale</strong><small>Ready for what's next</small></div>
          </div>
        </div>
      </div>

      <div className="container hero-bottom">
        <span>STRATEGY</span>
        <span className="bottom-line" />
        <span>DESIGN</span>
        <span className="bottom-line" />
        <span>DEVELOPMENT</span>
        <span className="bottom-line" />
        <span>GROWTH</span>
      </div>
    </section>
  );
}