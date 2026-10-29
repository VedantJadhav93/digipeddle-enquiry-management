
import { Form, Input, Select } from "antd";

const services = [
  "Web Development",
  "Mobile App Development",
  "UI/UX Design",
  "Digital Marketing",
  "Custom Software",
];

const budgets = [
  "Under ₹50,000",
  "₹50,000 - ₹1,00,000",
  "₹1,00,000 - ₹5,00,000",
  "Above ₹5,00,000",
];

export default function StepTwo() {
  return (
    <div className="form-fields">
      <Form.Item
        name="service"
        label="Which service are you interested in?"
        rules={[{ required: true, message: "Please select a service." }]}
      >
        <Select
          placeholder="Choose a service"
          options={services.map((value) => ({ label: value, value }))}
        />
      </Form.Item>

      <Form.Item
        name="budget"
        label="What is your estimated budget?"
        rules={[{ required: true, message: "Please select a budget." }]}
      >
        <Select
          placeholder="Choose your budget range"
          options={budgets.map((value) => ({ label: value, value }))}
        />
      </Form.Item>

      <Form.Item
        name="description"
        label="Tell us about your project"
        rules={[
          { required: true, message: "Please describe your project." },
          { min: 10, message: "Please enter at least 10 characters." },
          { max: 2000, message: "Maximum 2,000 characters allowed." },
        ]}
      >
        <Input.TextArea
          rows={5}
          showCount
          maxLength={2000}
          placeholder="What are you looking to build? What problem should it solve?"
        />
      </Form.Item>
    </div>
  );
}