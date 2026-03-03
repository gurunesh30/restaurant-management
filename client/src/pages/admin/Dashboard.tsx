import { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Button, Badge, Card, Form, Modal, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, Utensils, CalendarDays, Plus, Trash2, Mail, CheckCircle2 } from 'lucide-react';

import { menuApi, reservationApi, contactApi } from '../../lib/api';

interface MenuItem {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    is_available: boolean;
}

interface Reservation {
    _id: string;
    customer_name: string;
    date: string;
    time: string;
    guests: number;
    status: string;
    table_id: string;
}

interface ContactMessage {
    _id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    is_read: boolean;
    createdAt: string;
}

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('reservations');
    const [showAddModal, setShowAddModal] = useState(false);
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [newItem, setNewItem] = useState({ name: '', description: '', price: '', category: 'Mains', image_url: '' });
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            const menuRes = await menuApi.getAll();
            const resRes = await reservationApi.getAll();
            const contactRes = await contactApi.getAll();
            setMenuItems(menuRes.data);
            setReservations(resRes.data);
            setMessages(contactRes.data);
        } catch (err) {
            console.error('Error fetching admin data:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Simple mock auth guard
        if (!localStorage.getItem('admin_token')) {
            navigate('/admin');
        } else {
            fetchData();
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        navigate('/admin');
    };

    const handleAddItem = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Remove $ if present and parse
            const rawPrice = newItem.price.toString().replace('$', '').trim();
            const priceNum = parseFloat(rawPrice);

            if (isNaN(priceNum)) {
                alert('Please enter a valid price');
                return;
            }

            await menuApi.create({ ...newItem, price: priceNum });
            setNewItem({ name: '', description: '', price: '', category: 'Mains', image_url: '' });
            setShowAddModal(false);
            fetchData();
        } catch (err) {
            console.error('Error adding menu item:', err);
            alert('Failed to add item');
        }
    };

    const handleDeleteItem = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;
        try {
            await menuApi.delete(id);
            fetchData();
        } catch (err) {
            console.error('Error deleting item:', err);
        }
    };
    const handleToggleAvailability = async (id: string, currentStatus: boolean) => {
        try {
            await menuApi.update(id, { is_available: !currentStatus });
            fetchData();
        } catch (err) {
            console.error('Error updating availability:', err);
        }
    };

    const handleUpdateReservationStatus = async (id: string, status: string) => {
        try {
            await reservationApi.update(id, { status });
            fetchData();
        } catch (err) {
            console.error('Error updating reservation:', err);
        }
    };

    const handleMarkMessageRead = async (id: string) => {
        try {
            await contactApi.update(id, { is_read: true });
            fetchData();
        } catch (err) {
            console.error('Error updating message:', err);
        }
    };

    const handleDeleteMessage = async (id: string) => {
        if (!window.confirm('Delete this message?')) return;
        try {
            await contactApi.delete(id);
            fetchData();
        } catch (err) {
            console.error('Error deleting message:', err);
        }
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
                                <Button
                                    variant={activeTab === 'messages' ? 'gold' : 'dark'}
                                    className={`text-start d-flex align-items-center gap-2 border-0 rounded-3 py-2 px-3 ${activeTab === 'messages' ? 'bg-[var(--primary-color)] text-white shadow-sm' : 'bg-transparent text-[var(--text-muted)]'}`}
                                    onClick={() => setActiveTab('messages')}
                                >
                                    <Mail size={18} /> Messages
                                    {messages.filter(m => !m.is_read).length > 0 && (
                                        <Badge bg="danger" pill className="ms-auto" style={{ fontSize: '0.65rem' }}>
                                            {messages.filter(m => !m.is_read).length}
                                        </Badge>
                                    )}
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
                                    {activeTab === 'messages' && 'Contact Inquiries'}
                                </h2>
                                {activeTab === 'menu' && (
                                    <Button className="btn-gold d-flex align-items-center gap-2 shadow-sm" onClick={() => setShowAddModal(true)}>
                                        <Plus size={18} /> Add Item
                                    </Button>
                                )}
                            </div>

                            {activeTab === 'dashboard' && (
                                <Row className="gy-4">
                                    <Col md={3}>
                                        <Card className="bg-[var(--bg-dark)] border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] text-center py-4 rounded-2xl bg-blue-gradient hover-glow h-100">
                                            <Card.Body>
                                                <h1 className="display-4 text-[var(--primary-color)] mb-2">{reservations.filter(r => r.status !== 'Cancelled').length}</h1>
                                                <p className="text-[var(--text-muted)] mb-0">Active Reservations</p>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col md={3}>
                                        <Card className="bg-[var(--bg-dark)] border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] text-center py-4 rounded-2xl bg-blue-gradient hover-glow h-100">
                                            <Card.Body>
                                                <h1 className="display-4 text-[var(--primary-color)] mb-2">{menuItems.length}</h1>
                                                <p className="text-[var(--text-muted)] mb-0">Menu Items</p>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col md={3}>
                                        <Card className="bg-[var(--bg-dark)] border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] text-center py-4 rounded-2xl bg-blue-gradient hover-glow h-100">
                                            <Card.Body>
                                                <h1 className="display-4 text-[var(--primary-color)] mb-2">{messages.filter(m => !m.is_read).length}</h1>
                                                <p className="text-[var(--text-muted)] mb-0">New Messages</p>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col md={3}>
                                        <Card className="bg-[var(--bg-dark)] border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] text-center py-4 rounded-2xl bg-blue-gradient hover-glow h-100">
                                            <Card.Body>
                                                <h1 className="display-4 text-[var(--primary-color)] mb-2">
                                                    ${menuItems.length > 0 ? (menuItems.length * 25).toLocaleString() : '0'}
                                                </h1>
                                                <p className="text-[var(--text-muted)] mb-0">Proj. Revenue</p>
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
                                            {loading ? (
                                                <tr><td colSpan={7} className="text-center py-4"><Spinner animation="border" size="sm" /> Loading...</td></tr>
                                            ) : reservations.map((res: Reservation) => (
                                                <tr key={res._id} style={{ color: 'var(--text-main)', borderBottom: '1px solid rgba(128,128,128,0.08)' }}>
                                                    <td style={{ color: 'var(--text-muted)' }}>{res._id.substring(res._id.length - 6).toUpperCase()}</td>
                                                    <td className="fw-bold" style={{ color: 'var(--text-main)' }}>{res.customer_name}</td>
                                                    <td style={{ color: 'var(--text-main)' }}>{res.date}</td>
                                                    <td style={{ color: 'var(--text-main)' }}>{res.time}</td>
                                                    <td style={{ color: 'var(--text-main)' }}>{res.guests}</td>
                                                    <td>
                                                        <Badge bg={res.status === 'Confirmed' ? 'success' : res.status === 'Cancelled' ? 'danger' : 'warning'} text="dark">
                                                            {res.status}
                                                        </Badge>
                                                    </td>
                                                    <td>
                                                        {res.status === 'Pending' && (
                                                            <Button size="sm" variant="outline-success" className="me-2" onClick={() => handleUpdateReservationStatus(res._id, 'Confirmed')}>Confirm</Button>
                                                        )}
                                                        {res.status !== 'Cancelled' && (
                                                            <Button size="sm" variant="outline-danger" onClick={() => handleUpdateReservationStatus(res._id, 'Cancelled')}>Cancel</Button>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                    {reservations.length === 0 && !loading && (
                                        <div className="text-center py-5 opacity-50">
                                            <CalendarDays size={48} className="mb-3" />
                                            <p>No reservations found.</p>
                                        </div>
                                    )}
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
                                            {loading ? (
                                                <tr><td colSpan={5} className="text-center py-4"><Spinner animation="border" size="sm" /> Loading...</td></tr>
                                            ) : menuItems.map((item: MenuItem) => (
                                                <tr key={item._id} style={{ borderBottom: '1px solid rgba(128,128,128,0.06)' }}>
                                                    <td className="fw-bold" style={{ color: 'var(--text-main)' }}>{item.name}</td>
                                                    <td style={{ maxWidth: '300px', color: 'var(--text-muted)' }} className="small">{item.description}</td>
                                                    <td className="text-[var(--primary-color)] fw-bold">${item.price.toFixed(2)}</td>
                                                    <td><Badge bg="secondary" className="fw-normal">{item.category}</Badge></td>
                                                    <td>
                                                        <Form.Check
                                                            type="switch"
                                                            checked={item.is_available}
                                                            onChange={() => handleToggleAvailability(item._id, item.is_available)}
                                                            className="d-inline-block me-3"
                                                            title={item.is_available ? 'Available' : 'Sold Out'}
                                                        />
                                                        <Button size="sm" variant="link" className="text-danger p-0" title="Delete" onClick={() => handleDeleteItem(item._id)}><Trash2 size={16} /></Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                    {menuItems.length === 0 && !loading && (
                                        <div className="text-center py-5 opacity-50">
                                            <Utensils size={48} className="mb-3" />
                                            <p>No menu items available. Start by adding one!</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'messages' && (
                                <div className="table-responsive">
                                    <Table className="align-middle text-[var(--text-main)]" style={{ color: 'var(--text-main)', '--bs-table-bg': 'transparent', '--bs-table-hover-bg': 'rgba(139,157,195,0.06)' } as React.CSSProperties} hover>
                                        <thead>
                                            <tr style={{ borderBottom: '1px solid rgba(128,128,128,0.15)' }}>
                                                <th className="py-3" style={{ color: 'var(--text-muted)' }}>From</th>
                                                <th className="py-3" style={{ color: 'var(--text-muted)' }}>Subject</th>
                                                <th className="py-3" style={{ color: 'var(--text-muted)' }}>Message</th>
                                                <th className="py-3" style={{ color: 'var(--text-muted)' }}>Date</th>
                                                <th className="py-3" style={{ color: 'var(--text-muted)' }}>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {loading ? (
                                                <tr><td colSpan={5} className="text-center py-4"><Spinner animation="border" size="sm" /> Loading...</td></tr>
                                            ) : messages.map((msg: ContactMessage) => (
                                                <tr key={msg._id} style={{ borderBottom: '1px solid rgba(128,128,128,0.08)', opacity: msg.is_read ? 0.7 : 1 }}>
                                                    <td>
                                                        <div className="fw-bold" style={{ color: 'var(--text-main)' }}>{msg.name}</div>
                                                        <div className="small text-[var(--text-muted)]">{msg.email}</div>
                                                    </td>
                                                    <td style={{ color: msg.is_read ? 'var(--text-muted)' : 'var(--primary-color)', fontWeight: msg.is_read ? 400 : 600 }}>
                                                        {msg.subject}
                                                    </td>
                                                    <td style={{ maxWidth: '300px', color: 'var(--text-muted)' }} className="small">
                                                        {msg.message}
                                                    </td>
                                                    <td className="small" style={{ color: 'var(--text-muted)' }}>
                                                        {new Date(msg.createdAt).toLocaleDateString()}
                                                    </td>
                                                    <td>
                                                        <div className="d-flex gap-2">
                                                            {!msg.is_read && (
                                                                <Button size="sm" variant="outline-success" onClick={() => handleMarkMessageRead(msg._id)} title="Mark as read">
                                                                    <CheckCircle2 size={16} />
                                                                </Button>
                                                            )}
                                                            <Button size="sm" variant="outline-danger" onClick={() => handleDeleteMessage(msg._id)} title="Delete">
                                                                <Trash2 size={16} />
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                    {messages.length === 0 && !loading && (
                                        <div className="text-center py-5 opacity-50">
                                            <Mail size={48} className="mb-3" />
                                            <p>No messages yet.</p>
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
                                                        <option value="Appetizers">Appetizers</option>
                                                        <option value="Mains">Mains</option>
                                                        <option value="Desserts">Desserts</option>
                                                        <option value="Beverages">Beverages</option>
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Form.Group className="mb-4">
                                            <Form.Label className="text-[var(--text-muted)] small fw-bold">IMAGE URL (OPTIONAL)</Form.Label>
                                            <Form.Control
                                                type="url"
                                                placeholder="https://images.unsplash.com/..."
                                                className="bg-[var(--bg-dark)] border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] text-[var(--text-main)] rounded-3"
                                                value={newItem.image_url}
                                                onChange={e => setNewItem({ ...newItem, image_url: e.target.value })}
                                            />
                                            <Form.Text className="text-muted small">
                                                Leave blank to use a default placeholder image.
                                            </Form.Text>
                                        </Form.Group>
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
