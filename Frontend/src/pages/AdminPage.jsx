import { useState } from "react";
import {
    Alert,
    Button,
    Card,
    Input,
    Select,
    Space,
    Table,
    Tag,
    Typography,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import httpClient from "../services/httpClient";

const { Title, Text } = Typography;

export default function AdminPage() {
    const [adminKey, setAdminKey] = useState("");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [enquiries, setEnquiries] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [authenticated, setAuthenticated] = useState(false);

    const loadEnquiries = async (
        nextPage = 1,
        nextSearch = search,
        nextLimit = limit
    ) => {
        if (!adminKey.trim()) {
            setErrorMessage("Enter the admin key configured in server/.env.");
            return;
        }

        setLoading(true);
        setErrorMessage("");

        try {
            const response = await httpClient.get("/enquiries", {
                params: {
                    page: nextPage,
                    limit: nextLimit,
                    search: nextSearch,
                },
                headers: {
                    "x-admin-key": adminKey,
                },
            });

            setEnquiries(response.data.data);
            setTotal(response.data.pagination.total);
            setPage(nextPage);
            setAuthenticated(true);
        } catch (error) {
            setEnquiries([]);
            setTotal(0);
            setAuthenticated(false);
            setErrorMessage(
                error.response?.data?.message ||
                "Unable to load enquiries. Check the API and admin key."
            );
        } finally {
            setLoading(false);
        }
    };


    const columns = [
        {
            title: "Sr. No.",
            key: "srNo",
            render: (text, record, index) => (page - 1) * limit + index + 1,
        },
        {
            title: "Name",
            dataIndex: "fullName",
            key: "fullName",
            sorter: (a, b) => a.fullName.localeCompare(b.fullName),
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Mobile",
            dataIndex: "mobile",
            key: "mobile",
        },
        {
            title: "Service",
            dataIndex: "service",
            key: "service",
            filters: [
                { text: "Web Development", value: "Web Development" },
                { text: "Mobile App Development", value: "Mobile App Development" },
                { text: "UI/UX Design", value: "UI/UX Design" },
                { text: "Digital Marketing", value: "Digital Marketing" },
                { text: "Custom Software", value: "Custom Software" },
            ],
            onFilter: (value, record) => record.service === value,
            render: (value) => <Tag color="purple">{value}</Tag>,
        },
        {
            title: "Budget",
            dataIndex: "budget",
            key: "budget",
            filters: [
                { text: "Under ₹50,000", value: "Under ₹50,000" },
                { text: "₹50,000 - ₹1,00,000", value: "₹50,000 - ₹1,00,000" },
                { text: "₹1,00,000 - ₹5,00,000", value: "₹1,00,000 - ₹5,00,000" },
                { text: "Above ₹5,00,000", value: "Above ₹5,00,000" },
            ],
            onFilter: (value, record) => record.budget === value,
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            render: (value = "") => (
                <span title={value}>
                    {value.length > 60 ? `${value.slice(0, 60)}…` : value}
                </span>
            ),
        },
        {
            title: "Submitted",
            dataIndex: "createdAt",
            key: "createdAt",
            sorter: (a, b) =>
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime(),
            defaultSortOrder: "descend",
            render: (value) => new Date(value).toLocaleString(),
        },
    ];

    return (
        <main className="admin-page">
            <div className="admin-header">
                <Link to="/" className="brand">
                    <span className="brand-mark">D</span>
                    <span>digipeddle<span className="brand-dot">.</span></span>
                </Link>
                <Text type="secondary">Enquiry management</Text>
            </div>

            <div className="admin-content">
                <Title level={2}>Submitted enquiries</Title>
                <Text type="secondary">
                    Review and search the enquiries saved in MongoDB.
                </Text>

                <Card className="admin-filter-card">
                    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                        <label htmlFor="admin-key">Admin key</label>
                        <Input.Password
                            id="admin-key"
                            value={adminKey}
                            onChange={(event) => setAdminKey(event.target.value)}
                            placeholder="Enter your server ADMIN_KEY"
                            autoComplete="current-password"
                        />

                        <Button
                            type="primary"
                            onClick={() => loadEnquiries(1, search)}
                            loading={loading}
                        >
                            Load enquiries
                        </Button>
                    </Space>
                </Card>

                {errorMessage && (
                    <Alert
                        type="error"
                        showIcon
                        title={errorMessage}
                        className="admin-alert"
                    />
                )}

                {authenticated && (

                    <Card>
                        <div className="admin-table-heading">
                            <div>
                                <Title level={4} style={{ margin: 0 }}>
                                    All enquiries
                                </Title>
                                <Text type="secondary">
                                    {total} total enquiries
                                </Text>
                            </div>

                            <Space wrap style={{ padding: 8 }}>
                                <Input.Search
                                    value={search}
                                    onChange={(event) => setSearch(event.target.value)}
                                    onSearch={(value) => loadEnquiries(1, value.trim())}
                                    placeholder="Search name, email, mobile or service"
                                    enterButton={<SearchOutlined />}
                                    allowClear
                                    style={{ width: 280, maxWidth: "100%" }}
                                />

                                <Space size="small">
                                    <Text type="secondary">Rows per page</Text>
                                    <Select
                                        value={limit}
                                        style={{ width: 100 }}
                                        options={[
                                            { label: "10", value: 10 },
                                            { label: "20", value: 20 },
                                            { label: "50", value: 50 },
                                            { label: "100", value: 100 },
                                        ]}
                                        onChange={(value) => {
                                            setLimit(value);
                                            loadEnquiries(1, search.trim(), value);
                                        }}
                                    />
                                </Space>
                            </Space>
                        </div>

                        <Table
                            rowKey="_id"
                            columns={columns}
                            dataSource={enquiries}
                            loading={loading}
                            scroll={{ x: 1100 }}
                            pagination={{
                                current: page,
                                pageSize: limit,
                                total,
                                showSizeChanger: false,
                                showTotal: (count, range) =>
                                    `${range[0]}–${range[1]} of ${count} enquiries`,
                                onChange: (nextPage) =>
                                    loadEnquiries(nextPage, search.trim()),
                            }}
                        />
                    </Card>
                )}
            </div>
        </main>
    );
}