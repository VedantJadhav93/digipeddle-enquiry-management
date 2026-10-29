
const steps = [
  {
    number: "01",
    title: "Discover",
    description:
      "We learn about your goals, your users and what success looks like.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "We turn ideas into a clear plan and a thoughtful user experience.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "We develop, test and refine a solution ready for real-world use.",
  },
  {
    number: "04",
    title: "Launch",
    description:
      "We help you launch confidently and identify opportunities to improve.",
  },
];

export default function Process() {
  return (
    <section className="section process-section" id="process">
      <div className="container">
        <div className="process-heading">
          <div className="eyebrow">A BETTER WAY TO BUILD</div>
          <h2>Simple process. <span className="gradient-text">Real progress.</span></h2>
          <p>Clear communication and considered decisions at every stage.</p>
        </div>

        <div className="process-grid">
          {steps.map((step) => (
            <article className="process-step" key={step.number}>
              <span className="process-number">{step.number}</span>
              <div className="process-connector" />
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>

        <div className="process-callout">
          <div>
            <span className="callout-label">HAVE SOMETHING IN MIND?</span>
            <h3>Let's make it happen.</h3>
          </div>
          <a href="#contact" className="callout-link">
            Tell us about your project <span>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}