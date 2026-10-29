
import {
  CodeOutlined,
  AppstoreOutlined,
  BgColorsOutlined,
  RiseOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";

const services = [
  {
    number: "01",
    title: "Web Development",
    description:
      "Fast, responsive websites and web applications built around your business goals.",
    icon: <CodeOutlined />,
    color: "lavender",
  },
  {
    number: "02",
    title: "Mobile Applications",
    description:
      "Intuitive mobile experiences that connect your product with its users.",
    icon: <AppstoreOutlined />,
    color: "peach",
  },
  {
    number: "03",
    title: "UI/UX Design",
    description:
      "Clear user journeys, thoughtful interfaces and experiences people enjoy.",
    icon: <BgColorsOutlined />,
    color: "mint",
  },
  {
    number: "04",
    title: "Digital Marketing",
    description:
      "Practical digital strategies that increase visibility and support growth.",
    icon: <RiseOutlined />,
    color: "blue",
  },
];

export default function Services() {
  return (
    <section className="section services-section" id="services">
      <div className="container">
        <div className="section-heading">
          <div>
            <div className="eyebrow">WHAT WE DO</div>
            <h2>
              Everything you need
              <br />
              <span className="gradient-text">to move forward.</span>
            </h2>
          </div>

          <p>
            A thoughtful blend of strategy, creativity and engineering —
            bringing your next big idea to life.
          </p>
        </div>

        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.number}>
              <div className="service-card-top">
                <span className={`service-icon ${service.color}`}>
                  {service.icon}
                </span>
                <span className="service-number">{service.number}</span>
              </div>

              <h3>{service.title}</h3>
              <p>{service.description}</p>

              <a href="#contact" className="service-link">
                Discuss your project <ArrowRightOutlined />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}