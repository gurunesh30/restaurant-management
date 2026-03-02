import { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Button, Badge, Card, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, Utensils, CalendarDays, Plus, Trash2, Edit } from 'lucide-react';

interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: string;
    category: string;
}

const dummyReservations = [
    { id: 1, name: 'Michael Scott', date: '2026-03-05', time: '19:00', guests: 4, status: 'Confirmed' },
    { id: 2, name: 'Dwight Schrute', date: '2026-03-05', time: '18:30', guests: 2, status: 'Pending' },
    { id: 3, name: 'Jim Halpert', date: '2026-03-06', time: '20:00', guests: 2, status: 'Confirmed' },
];

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('reservations');
    const [showAddModal, setShowAddModal] = useState(false);
    const [menuItems, setMenuItems] = useState<MenuItem[]>([
        { id: 1, name: 'Truffle Ribeye', description: 'Prime cut ribeye with black truffle butter.', price: '$45', category: 'Main Course' },
        { id: 2, name: 'Seared Scallops', description: 'Pan-seared jumbo scallops over sweet corn purée.', price: '$32', category: 'Starters' },
    ]);
    const [newItem, setNewItem] = useState({ name: '', description: '', price: '', category: 'Main Course' });

    useEffect(() => {
        // Simple mock auth guard
        if (!localStorage.getItem('admin_token')) {
            navigate('/admin');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        navigate('/admin');
    };

    const handleAddItem = (e: React.FormEvent) => {
        e.preventDefault();
        const id = menuItems.length > 0 ? Math.max(...menuItems.map((i: MenuItem) => i.id)) + 1 : 1;
        setMenuItems([...menuItems, { ...newItem, id }]);
        setNewItem({ name: '', description: '', price: '', category: 'Main Course' });
        setShowAddModal(false);
    };

    const handleDeleteItem = (id: number) => {
        setMenuItems(menuItems.filter((item: MenuItem) => item.id !== id));
    };

    return (
        <div className="admin-dashboard py-5 mt-5">
            <Container fluid className="py-4 px-lg-5">
                <Row>
                    {/* Sidebar */}
                    <Col lg={2} md={3} className="mb-4">
                        <div className="bg-[var(--bg-light)] rounded-2xl p-3 h-100 border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.05)] text-[var(--text-main)] bg-blue-gradient">
                            <h5 className="brand-font mb-4 text-center pb-3 border-bottom border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] text-[var(--primary-color)]">Admin Panel</h5>
                            <div className="d-flex flex-column gap-2 mb-5">
                                <Button
                                    variant={activeTab === 'dashboard' ? 'gold' : 'dark'}
                                    className={`text-start d-flex align-items-center gap-2 border-0 rounded-3 py-2 px-3 ${activeTab === 'dashboard' ? 'bg-[var(--primary-color)] text-white shadow-sm' : 'bg-transparent text-[var(--text-muted)]'}`}
                                    onClick={() => setActiveTab('dashboard')}
                                >
                                    <LayoutDashboard size={18} /> Overview
                                </Button>
                                <Button
                                    variant={activeTab === 'reservations' ? 'gold' : 'dark'}
                                    className={`text-start d-flex align-items-center gap-2 border-0 rounded-3 py-2 px-3 ${activeTab === 'reservations' ? 'bg-[var(--primary-color)] text-white shadow-sm' : 'bg-transparent text-[var(--text-muted)]'}`}
                                    onClick={() => setActiveTab('reservations')}
                                >
                                    <CalendarDays size={18} /> Reservations
                                </Button>
                                <Button
                                    variant={activeTab === 'menu' ? 'gold' : 'dark'}
                                    className={`text-start d-flex align-items-center gap-2 border-0 rounded-3 py-2 px-3 ${activeTab === 'menu' ? 'bg-[var(--primary-color)] text-white shadow-sm' : 'bg-transparent text-[var(--text-muted)]'}`}
                                    onClick={() => setActiveTab('menu')}
                                >
                                    <Utensils size={18} /> Menu Items
                                </Button>
                            </div>
                            <Button
                                variant="outline-danger"
                                className="w-100 mt-auto d-flex align-items-center justify-content-center gap-2"
                                onClick={handleLogout}
                            >
                                <LogOut size={16} /> Logout
                            </Button>
                        </div>
                    </Col>

                    {/* Main Content */}
                    <Col lg={10} md={9}>
                        <div className="bg-[var(--bg-light)] rounded-2xl p-4 border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.05)] shadow-sm">
                            <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] text-[var(--text-main)]">
                                <h2 className="brand-font m-0 text-[var(--text-main)]">
                                    {activeTab === 'dashboard' && 'Dashboard Overview'}
                                    {activeTab === 'reservations' && 'Manage Reservations'}
                                    {activeTab === 'menu' && 'Menu Management'}
                                </h2>
                                {activeTab === 'menu' && (
                                    <Button className="btn-gold d-flex align-items-center gap-2 shadow-sm" onClick={() => setShowAddModal(true)}>
                                        <Plus size={18} /> Add Item
                                    </Button>
                                )}
                            </div>

                            {activeTab === 'dashboard' && (
                                <Row className="gy-4">
                                    <Col md={4}>
                                        <Card className="bg-[var(--bg-dark)] border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] text-center py-4 rounded-2xl bg-blue-gradient hover-glow">
                                            <Card.Body>
                                                <h1 className="display-4 text-[var(--primary-color)] mb-2">24</h1>
                                                <p className="text-[var(--text-muted)] mb-0">Reservations Today</p>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col md={4}>
                                        <Card className="bg-[var(--bg-dark)] border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] text-center py-4 rounded-2xl bg-blue-gradient hover-glow">
                                            <Card.Body>
                                                <h1 className="display-4 text-[var(--primary-color)] mb-2">8</h1>
                                                <p className="text-[var(--text-muted)] mb-0">Active Menu Items</p>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col md={4}>
                                        <Card className="bg-[var(--bg-dark)] border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] text-center py-4 rounded-2xl bg-blue-gradient hover-glow">
                                            <Card.Body>
                                                <h1 className="display-4 text-[var(--primary-color)] mb-2">$1.2k</h1>
                                                <p className="text-[var(--text-muted)] mb-0">Projected Revenue</p>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            )}

                            {activeTab === 'reservations' && (
                                <div className="table-responsive">
                                    <Table className="align-middle text-[var(--text-main)]" style={{ color: 'var(--text-main)', '--bs-table-bg': 'transparent', '--bs-table-hover-bg': 'rgba(139,157,195,0.06)' } as React.CSSProperties} hover>
                                        <thead>
                                            <tr style={{ borderBottom: '1px solid rgba(128,128,128,0.15)' }}>
                                                <th className="py-3" style={{ color: 'var(--text-muted)' }}>ID</th>
                                                <th className="py-3" style={{ color: 'var(--text-muted)' }}>Customer Name</th>
                                                <th className="py-3" style={{ color: 'var(--text-muted)' }}>Date</th>
                                                <th className="py-3" style={{ color: 'var(--text-muted)' }}>Time</th>
                                                <th className="py-3" style={{ color: 'var(--text-muted)' }}>Guests</th>
                                                <th className="py-3" style={{ color: 'var(--text-muted)' }}>Status</th>
                                                <th className="py-3" style={{ color: 'var(--text-muted)' }}>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dummyReservations.map(res => (
                                                <tr key={res.id} style={{ color: 'var(--text-main)', borderBottom: '1px solid rgba(128,128,128,0.08)' }}>
                                                    <td style={{ color: 'var(--text-muted)' }}>#{res.id + 1000}</td>
                                                    <td className="fw-bold" style={{ color: 'var(--text-main)' }}>{res.name}</td>
                                                    <td style={{ color: 'var(--text-main)' }}>{res.date}</td>
                                                    <td style={{ color: 'var(--text-main)' }}>{res.time}</td>
                                                    <td style={{ color: 'var(--text-main)' }}>{res.guests}</td>
                                                    <td>
                                                        <Badge bg={res.status === 'Confirmed' ? 'success' : 'warning'} text="dark">
                                                            {res.status}
                                                        </Badge>
                                                    </td>
                                                    <td>
                                                        <Button size="sm" variant="outline-secondary" className="me-2" style={{ color: 'var(--text-main)', borderColor: 'rgba(128,128,128,0.3)' }}>View</Button>
                                                        <Button size="sm" variant="outline-danger">Cancel</Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            )}

                            {activeTab === 'menu' && (
                                <div className="table-responsive">
                                    <Table className="align-middle text-[var(--text-main)]" style={{ color: 'var(--text-main)', '--bs-table-bg': 'transparent', '--bs-table-hover-bg': 'rgba(139,157,195,0.06)' } as React.CSSProperties} hover>
                                        <thead>
                                            <tr style={{ borderBottom: '1px solid rgba(128,128,128,0.15)' }}>
                                                <th className="py-3" style={{ color: 'var(--text-muted)' }}>Dish Name</th>
                                                <th className="py-3" style={{ color: 'var(--text-muted)' }}>Description</th>
                                                <th className="py-3" style={{ color: 'var(--text-muted)' }}>Price</th>
                                                <th className="py-3" style={{ color: 'var(--text-muted)' }}>Category</th>
                                                <th className="py-3" style={{ color: 'var(--text-muted)' }}>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {menuItems.map((item: MenuItem) => (
                                                <tr key={item.id} style={{ borderBottom: '1px solid rgba(128,128,128,0.06)' }}>
                                                    <td className="fw-bold" style={{ color: 'var(--text-main)' }}>{item.name}</td>
                                                    <td style={{ maxWidth: '300px', color: 'var(--text-muted)' }} className="small">{item.description}</td>
                                                    <td className="text-[var(--primary-color)] fw-bold">{item.price}</td>
                                                    <td><Badge bg="secondary" className="fw-normal">{item.category}</Badge></td>
                                                    <td>
                                                        <Button size="sm" variant="link" className="text-[var(--text-muted)] p-0 me-3"><Edit size={16} /></Button>
                                                        <Button size="sm" variant="link" className="text-danger p-0" onClick={() => handleDeleteItem(item.id)}><Trash2 size={16} /></Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                    {menuItems.length === 0 && (
                                        <div className="text-center py-5 opacity-50">
                                            <Utensils size={48} className="mb-3" />
                                            <p>No menu items available. Start by adding one!</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Add Item Modal */}
                            <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered contentClassName="bg-[var(--bg-light)] border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] rounded-2xl">
                                <Modal.Header closeButton closeVariant={document.documentElement.classList.contains('dark') ? 'white' : undefined} className="border-bottom border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] p-4">
                                    <Modal.Title className="brand-font text-[var(--text-main)]">Add New Dish</Modal.Title>
                                </Modal.Header>
                                <Modal.Body className="p-4">
                                    <Form onSubmit={handleAddItem}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="text-[var(--text-muted)] small fw-bold">DISH NAME</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="e.g. Lobster Thermidor"
                                                className="bg-[var(--bg-dark)] border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] text-[var(--text-main)] rounded-3"
                                                value={newItem.name}
                                                onChange={e => setNewItem({ ...newItem, name: e.target.value })}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="text-[var(--text-muted)] small fw-bold">DESCRIPTION</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                placeholder="Brief description of the dish..."
                                                className="bg-[var(--bg-dark)] border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] text-[var(--text-main)] rounded-3"
                                                value={newItem.description}
                                                onChange={e => setNewItem({ ...newItem, description: e.target.value })}
                                                required
                                            />
                                        </Form.Group>
                                        <Row>
                                            <Col md={6}>
                                                <Form.Group className="mb-4">
                                                    <Form.Label className="text-[var(--text-muted)] small fw-bold">PRICE</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="e.g. $24"
                                                        className="bg-[var(--bg-dark)] border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] text-[var(--text-main)] rounded-3"
                                                        value={newItem.price}
                                                        onChange={e => setNewItem({ ...newItem, price: e.target.value })}
                                                        required
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-4">
                                                    <Form.Label className="text-[var(--text-muted)] small fw-bold">CATEGORY</Form.Label>
                                                    <Form.Select
                                                        className="bg-[var(--bg-dark)] border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] text-[var(--text-main)] rounded-3"
                                                        value={newItem.category}
                                                        onChange={e => setNewItem({ ...newItem, category: e.target.value })}
                                                    >
                                                        <option>Starters</option>
                                                        <option>Main Course</option>
                                                        <option>Desserts</option>
                                                        <option>Beverages</option>
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Button type="submit" className="btn-gold w-100 py-2 rounded-3 fw-bold">
                                            SAVE DISH
                                        </Button>
                                    </Form>
                                </Modal.Body>
                            </Modal>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AdminDashboard;
