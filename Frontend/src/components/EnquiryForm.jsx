
import { useState } from "react";
import { Alert, Button, Form, Steps, Result } from "antd";
import {
    ArrowLeftOutlined,
    ArrowRightOutlined,
    CheckCircleOutlined,
    SendOutlined,
} from "@ant-design/icons";
import httpClient from "../services/httpClient";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";

const stepFields = [
    ["fullName", "email", "mobile"],
    ["service", "budget", "description"],
];

export default function EnquiryForm() {
    const [form] = Form.useForm();
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    const goNext = async (event) => {
        event?.preventDefault?.();

        if (currentStep !== 0) return;

        try {
            await form.validateFields(stepFields[0]);
            setErrorMessage("");
            setCurrentStep(1);
        } catch {
            // Ant Design displays validation errors.
        }
    };


    const goBack = () => {
        if (loading) return;

        setErrorMessage("");
        setCurrentStep(0);
    };

    const handleSubmit = async (values) => {

        console.log("handleSubmit called", { currentStep, values });
        if (currentStep !== 1 || loading || submitted) return;

        setErrorMessage("");
        setLoading(true);

        try {
            await form.validateFields(stepFields[1]);

            const allValues = form.getFieldsValue(true);

            await httpClient.post("/enquiries", allValues);

            setSubmitted(true);
            form.resetFields();
        } catch (error) {
            if (error.errorFields) {
                // Validation errors are displayed by Ant Design.
            } else {
                const response = error.response?.data;

                if (response?.errors?.length) {
                    response.errors.forEach((item) => {
                        form.setFields([
                            {
                                name: item.field,
                                errors: [item.message],
                            },
                        ]);
                    });

                    setErrorMessage(
                        "Please review the highlighted fields."
                    );
                } else {
                    setErrorMessage(
                        response?.message ||
                        "We couldn't submit your enquiry. Please try again."
                    );
                }
            }
        } finally {
            setLoading(false);
        }
    };

    const startAgain = () => {
        form.resetFields();
        setCurrentStep(0);
        setSubmitted(false);
        setErrorMessage("");
    };

    return (
        <section className="section contact-section" id="contact">
            <div className="container contact-grid">
                <div className="contact-copy">
                    <div className="eyebrow">LET'S WORK TOGETHER</div>

                    <h2>
                        Your next big
                        <br />
                        idea starts <span className="gradient-text">here.</span>
                    </h2>

                    <p>
                        Tell us a little about yourself and your project. We'll
                        use your details to understand your needs and follow up.
                    </p>

                    <div className="contact-promise">
                        <CheckCircleOutlined />
                        <span>No commitment required</span>
                    </div>

                    <div className="contact-promise">
                        <CheckCircleOutlined />
                        <span>A clear, thoughtful conversation</span>
                    </div>

                    <div className="contact-promise">
                        <CheckCircleOutlined />
                        <span>Your information stays private</span>
                    </div>
                </div>

                <div className="form-card">
                    {submitted ? (
                        <Result
                            status="success"
                            title="Thank you for reaching out!"
                            subTitle="Your enquiry has been submitted successfully."
                            extra={
                                <Button type="primary" onClick={startAgain}>
                                    Submit another enquiry
                                </Button>
                            }
                        />
                    ) : (
                        <>
                            <div className="form-card-heading">
                                <span className="form-kicker">
                                    PROJECT ENQUIRY
                                </span>
                                <h3>Let's get to know you.</h3>
                                <p>Complete these two quick steps to get started.</p>
                            </div>

                            <Steps
                                className="enquiry-steps"
                                current={currentStep}
                                size="small"
                                items={[
                                    { title: "Your details" },
                                    { title: "Your project" },
                                ]}
                            />

                            {errorMessage && (
                                <Alert
                                    className="form-alert"
                                    type="error"
                                    showIcon
                                    message={errorMessage}
                                />
                            )}

                            <Form
                                form={form}
                                layout="vertical"
                                requiredMark={false}
                                scrollToFirstError
                                onFinish={handleSubmit}
                            >
                                {currentStep === 0 ? (
                                    <StepOne />
                                ) : (
                                    <StepTwo />
                                )}

                                <div className="form-actions">
                                    {currentStep === 1 ? (
                                        <Button
                                            htmlType="button"
                                            onClick={goBack}
                                            icon={<ArrowLeftOutlined />}
                                            disabled={loading}
                                        >
                                            Back
                                        </Button>
                                    ) : (
                                        <span className="step-counter">
                                            STEP 1 OF 2
                                        </span>
                                    )}

                                    {currentStep === 0 ? (
                                        <Button
                                            htmlType="button"
                                            type="primary"
                                            onClick={goNext}
                                            icon={<ArrowRightOutlined />}
                                            iconPlacement="end"
                                        >
                                            Next step
                                        </Button>
                                    ) : (
                                        <Button
                                            htmlType="submit"
                                            type="primary"
                                            loading={loading}
                                            icon={<SendOutlined />}
                                            iconPlacement="end"
                                        >
                                            Submit enquiry
                                        </Button>
                                    )}
                                </div>
                            </Form>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}