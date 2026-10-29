
import { Form, Input } from "antd";
import { UserOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";

const mobilePattern = /^[0-9]{10}$/;

export default function StepOne() {
  return (
    <div className="form-fields">
      <Form.Item
        name="fullName"
        label="Full name"
        rules={[
          { required: true, message: "Please enter your full name." },
          { min: 2, message: "Name must be at least 2 characters." },
          { max: 100, message: "Name cannot exceed 100 characters." },
          {
            pattern: /^[\p{L}\p{M} .'-]+$/u,
            message: "Please enter a valid name.",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined />}
          placeholder="e.g. Vedant Jadhav"
          autoComplete="name"
          maxLength={100}
        />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email address"
        rules={[
          { required: true, message: "Please enter your email address." },
          { type: "email", message: "Please enter a valid email address." },
          { max: 254, message: "Email address is too long." },
        ]}
      >
        <Input
          prefix={<MailOutlined />}
          placeholder="you@example.com"
          autoComplete="email"
          maxLength={254}
        />
      </Form.Item>

      <Form.Item
        name="mobile"
        label="Mobile number"
        rules={[
          { required: true, message: "Please enter your mobile number." },
          {
            pattern: mobilePattern,
            message: "Mobile number must contain exactly 10 digits.",
          },
        ]}
      >
        <Input
          prefix={<PhoneOutlined />}
          placeholder="Enter 10-digit mobile number"
          autoComplete="tel"
          maxLength={10}
          inputMode="numeric"
        />
      </Form.Item>

      <p className="form-privacy">
        Your contact details will only be used to respond to your enquiry.
      </p>
    </div>
  );
}