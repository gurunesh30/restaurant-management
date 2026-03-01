import { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { Lock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate JWT authentication
        if (credentials.username === 'admin' && credentials.password === 'password') {
            localStorage.setItem('admin_token', 'demo-jwt-token');
            navigate('/admin/dashboard');
        } else {
            setError('Invalid admin credentials. Use admin / password');
        }
    };

    return (
        <div className="login-page py-5 mt-5 d-flex align-items-center" style={{ minHeight: '80vh' }}>
            <Container>
                <Row className="justify-content-center">
                    <Col md={6} lg={5} xl={4}>
                        <div className="bg-light p-4 p-md-5 rounded shadow border" style={{ borderColor: 'rgba(212,175,55,0.2)' }}>
                            <div className="text-center mb-4">
                                <div className="bg-dark d-inline-block p-3 rounded-circle mb-3" style={{ color: 'var(--primary-color)' }}>
                                    <Lock size={32} />
                                </div>
                                <h3 className="brand-font text-white">Admin Login</h3>
                                <p className="text-muted small">Secure Access Dashboard</p>
                            </div>

                            {error && <Alert variant="danger" className="small">{error}</Alert>}

                            <Form onSubmit={handleLogin}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-muted fw-bold small">Username</Form.Label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-dark border-secondary text-muted"><User size={16} /></span>
                                        <Form.Control
                                            type="text"
                                            className="border-start-0"
                                            placeholder="Enter username"
                                            value={credentials.username}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCredentials({ ...credentials, username: e.target.value })}
                                            required
                                        />
                                    </div>
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label className="text-muted fw-bold small">Password</Form.Label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-dark border-secondary text-muted"><Lock size={16} /></span>
                                        <Form.Control
                                            type="password"
                                            className="border-start-0"
                                            placeholder="Enter password"
                                            value={credentials.password}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCredentials({ ...credentials, password: e.target.value })}
                                            required
                                        />
                                    </div>
                                </Form.Group>

                                <Button type="submit" className="btn-gold w-100 py-2 shadow-sm d-flex align-items-center justify-content-center gap-2">
                                    <Lock size={16} /> Access Dashboard
                                </Button>
                            </Form>

                            <div className="text-center mt-4">
                                <p className="text-muted small mb-0">Demo Credentials: admin / password</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AdminLogin;
