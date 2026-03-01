import { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Button, Badge, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, Utensils, CalendarDays, Plus } from 'lucide-react';

const dummyReservations = [
    { id: 1, name: 'Michael Scott', date: '2026-03-05', time: '19:00', guests: 4, status: 'Confirmed' },
    { id: 2, name: 'Dwight Schrute', date: '2026-03-05', time: '18:30', guests: 2, status: 'Pending' },
    { id: 3, name: 'Jim Halpert', date: '2026-03-06', time: '20:00', guests: 2, status: 'Confirmed' },
];

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('reservations');

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

    return (
        <div className="admin-dashboard py-5 mt-5">
            <Container fluid className="py-4 px-lg-5">
                <Row>
                    {/* Sidebar */}
                    <Col lg={2} md={3} className="mb-4">
                        <div className="bg-light rounded p-3 h-100 border text-white" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                            <h5 className="brand-font mb-4 text-center pb-3 border-bottom border-secondary text-gold" style={{ color: 'var(--primary-color)' }}>Admin Panel</h5>
                            <div className="d-flex flex-column gap-2 mb-5">
                                <Button
                                    variant={activeTab === 'dashboard' ? 'gold' : 'dark'}
                                    className={`text-start d-flex align-items-center gap-2 border-0 ${activeTab === 'dashboard' ? 'bg-gold text-dark' : 'text-muted'}`}
                                    style={activeTab === 'dashboard' ? { backgroundColor: 'var(--primary-color)' } : {}}
                                    onClick={() => setActiveTab('dashboard')}
                                >
                                    <LayoutDashboard size={18} /> Overview
                                </Button>
                                <Button
                                    variant={activeTab === 'reservations' ? 'gold' : 'dark'}
                                    className={`text-start d-flex align-items-center gap-2 border-0 ${activeTab === 'reservations' ? 'bg-gold text-dark' : 'text-muted'}`}
                                    style={activeTab === 'reservations' ? { backgroundColor: 'var(--primary-color)' } : {}}
                                    onClick={() => setActiveTab('reservations')}
                                >
                                    <CalendarDays size={18} /> Reservations
                                </Button>
                                <Button
                                    variant={activeTab === 'menu' ? 'gold' : 'dark'}
                                    className={`text-start d-flex align-items-center gap-2 border-0 ${activeTab === 'menu' ? 'bg-gold text-dark' : 'text-muted'}`}
                                    style={activeTab === 'menu' ? { backgroundColor: 'var(--primary-color)' } : {}}
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
                        <div className="bg-light rounded p-4 border" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                            <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom border-secondary text-white">
                                <h2 className="brand-font m-0 text-white">
                                    {activeTab === 'dashboard' && 'Dashboard Overview'}
                                    {activeTab === 'reservations' && 'Manage Reservations'}
                                    {activeTab === 'menu' && 'Menu Management'}
                                </h2>
                                {activeTab === 'menu' && (
                                    <Button className="btn-gold d-flex align-items-center gap-2 shadow-sm">
                                        <Plus size={18} /> Add Item
                                    </Button>
                                )}
                            </div>

                            {activeTab === 'dashboard' && (
                                <Row className="gy-4 text-white">
                                    <Col md={4}>
                                        <Card className="bg-dark border-secondary text-center py-4">
                                            <Card.Body>
                                                <h1 className="display-4 text-gold mb-2" style={{ color: 'var(--primary-color)' }}>24</h1>
                                                <p className="text-muted mb-0">Reservations Today</p>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col md={4}>
                                        <Card className="bg-dark border-secondary text-center py-4">
                                            <Card.Body>
                                                <h1 className="display-4 text-gold mb-2" style={{ color: 'var(--primary-color)' }}>8</h1>
                                                <p className="text-muted mb-0">Active Menu Items</p>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col md={4}>
                                        <Card className="bg-dark border-secondary text-center py-4">
                                            <Card.Body>
                                                <h1 className="display-4 text-gold mb-2" style={{ color: 'var(--primary-color)' }}>$1.2k</h1>
                                                <p className="text-muted mb-0">Projected Revenue</p>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            )}

                            {activeTab === 'reservations' && (
                                <div className="table-responsive">
                                    <Table variant="dark" hover className="align-middle border-secondary text-white">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Customer Name</th>
                                                <th>Date</th>
                                                <th>Time</th>
                                                <th>Guests</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dummyReservations.map(res => (
                                                <tr key={res.id}>
                                                    <td>#{res.id + 1000}</td>
                                                    <td className="fw-bold">{res.name}</td>
                                                    <td>{res.date}</td>
                                                    <td>{res.time}</td>
                                                    <td>{res.guests}</td>
                                                    <td>
                                                        <Badge bg={res.status === 'Confirmed' ? 'success' : 'warning'} text="dark">
                                                            {res.status}
                                                        </Badge>
                                                    </td>
                                                    <td>
                                                        <Button size="sm" variant="outline-light" className="me-2 text-white">View</Button>
                                                        <Button size="sm" variant="outline-danger">Cancel</Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            )}

                            {activeTab === 'menu' && (
                                <div className="text-center py-5 text-muted">
                                    <Utensils size={48} className="mb-3 opacity-50" />
                                    <h4>Menu Management</h4>
                                    <p>In a fully integrated environment, you would see a table of menu items enabling CRUD operations here.</p>
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AdminDashboard;
