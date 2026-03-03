import { useEffect, useState } from 'react';
import { Container, Row, Col, Nav, Badge, Spinner, Button } from 'react-bootstrap';
import { menuApi } from '../lib/api';

interface MenuItem {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image_url: string;
    is_available: boolean;
}

const Menu = () => {
    const [activeTab, setActiveTab] = useState("Appetizers");
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const categories = ["Appetizers", "Mains", "Desserts", "Beverages"];

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                setLoading(true);
                const response = await menuApi.getAll();
                setMenuItems(response.data);
                setError(null);
            } catch (err: any) {
                console.error('Error fetching menu:', err);
                setError('Failed to load menu. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchMenu();
    }, []);

    // Filter items based on selected category
    const filteredMenu = menuItems.filter(item => item.category === activeTab);

    return (
        <div className="menu-page">
            <div className="pt-5 mt-5">
                <Container className="py-5">
                    <div className="text-center mb-5">
                        <span className="section-subtitle">Exquisite Tastes</span>
                        <h1 className="section-title display-4 brand-font">Our Menu</h1>
                    </div>

                    <Nav variant="pills" className="justify-content-center mb-5 border-bottom border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] pb-3 gap-3">
                        {categories.map((cat, idx) => (
                            <Nav.Item key={idx}>
                                <Nav.Link
                                    className={`btn-outline-gold rounded-pill border px-4 py-2 ${activeTab === cat ? 'active bg-[var(--primary-color)] text-[var(--bg-dark)]' : 'text-[var(--text-main)] border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)]'}`}
                                    style={activeTab === cat ? { backgroundColor: 'var(--primary-color)', borderColor: 'var(--primary-color)', color: 'var(--bg-dark) !important', fontWeight: '600' } : { cursor: 'pointer' }}
                                    onClick={() => setActiveTab(cat)}
                                >
                                    {cat}
                                </Nav.Link>
                            </Nav.Item>
                        ))}
                    </Nav>

                    {loading ? (
                        <div className="text-center py-5">
                            <Spinner animation="border" variant="gold" />
                            <p className="mt-3 text-muted">Loading our delicious menu...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-5 text-danger">
                            <p>{error}</p>
                            <Button variant="outline-gold" onClick={() => window.location.reload()}>Retry</Button>
                        </div>
                    ) : (
                        <>
                            <Row className="gy-4">
                                {filteredMenu.map((item) => (
                                    <Col lg={6} key={item._id}>
                                        <div className="d-flex flex-column flex-sm-row gap-3 p-3 menu-card align-items-sm-center rounded-2xl border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] bg-blue-gradient hover-glow">
                                            <div style={{ width: '120px', height: '120px', flexShrink: 0 }} className="overflow-hidden rounded">
                                                <img
                                                    src={item.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80'}
                                                    alt={item.name}
                                                    className="w-100 h-100 object-fit-cover"
                                                    style={{ objectFit: 'cover' }}
                                                />
                                            </div>
                                            <div className="flex-grow-1 text-start">
                                                <div className="d-flex justify-content-between align-items-center mb-2 border-bottom border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] pb-2">
                                                    <h4 className="brand-font mb-0 text-[var(--text-main)] d-flex align-items-center gap-2">
                                                        {item.name}
                                                        {!item.is_available && <Badge bg="danger" className="fs-6 fw-normal ms-2">Sold Out</Badge>}
                                                    </h4>
                                                    <span className="price-tag fs-5">${item.price.toFixed(2)}</span>
                                                </div>
                                                <p className="text-[var(--text-muted)] mb-0 lh-sm">{item.description}</p>
                                            </div>
                                        </div>
                                    </Col>
                                ))}
                            </Row>

                            {filteredMenu.length === 0 && (
                                <div className="text-center py-5 text-muted">
                                    <p>No items found in this category.</p>
                                </div>
                            )}
                        </>
                    )}
                </Container>
            </div>
        </div>
    );
};

export default Menu;
