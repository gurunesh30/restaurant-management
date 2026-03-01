import { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { CalendarCheck, Users, Clock, User, Phone, Mail } from 'lucide-react';

const Reservation = () => {
    const [formData, setFormData] = useState({
        customer_name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: '2',
        special_requests: ''
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        // Simulate API call to POST /api/reservations
        setTimeout(() => {
            setStatus('success');
            setFormData({
                customer_name: '',
                email: '',
                phone: '',
                date: '',
                time: '',
                guests: '2',
                special_requests: ''
            });

            // Reset toast after 5 seconds
            setTimeout(() => setStatus('idle'), 5000);
        }, 1500);
    };

    return (
        <div className="reservation-page py-5 mt-5">
            <Container className="py-5">
                <Row className="justify-content-center">
                    <Col lg={8} xl={7}>
                        <div className="text-center mb-5">
                            <span className="section-subtitle">Secure Your Spot</span>
                            <h1 className="section-title display-4 brand-font">Book a Table</h1>
                            <p className="text-muted">
                                Reserve your table online and we'll have everything ready for your culinary journey.
                            </p>
                        </div>

                        <div className="bg-light p-4 p-md-5 rounded shadow-lg border" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                            {status === 'success' && (
                                <Alert variant="success" className="d-flex align-items-center gap-2 border-0 bg-success bg-opacity-10 text-success">
                                    <CalendarCheck size={24} />
                                    <div>
                                        <strong>Success!</strong> Your table is booked for {formData.date} at {formData.time}. We look forward to serving you!
                                    </div>
                                </Alert>
                            )}

                            {status === 'error' && (
                                <Alert variant="danger">
                                    An error occurred while booking. Please try again later.
                                </Alert>
                            )}

                            <Form onSubmit={handleSubmit}>
                                <Row className="gy-4">
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label className="d-flex align-items-center gap-2 text-muted fw-bold">
                                                <User size={16} /> Full Name
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="customer_name"
                                                value={formData.customer_name}
                                                onChange={handleChange}
                                                required
                                                placeholder="John Doe"
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label className="d-flex align-items-center gap-2 text-muted fw-bold">
                                                <Mail size={16} /> Email Address
                                            </Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                placeholder="john@example.com"
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label className="d-flex align-items-center gap-2 text-muted fw-bold">
                                                <Phone size={16} /> Phone Number
                                            </Form.Label>
                                            <Form.Control
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                                placeholder="(555) 123-4567"
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label className="d-flex align-items-center gap-2 text-muted fw-bold">
                                                <Users size={16} /> Number of Guests
                                            </Form.Label>
                                            <Form.Select
                                                name="guests"
                                                value={formData.guests}
                                                onChange={handleChange}
                                            >
                                                {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                                                    <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                                                ))}
                                                <option value="9+">9+ People (Call Us)</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>

                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label className="d-flex align-items-center gap-2 text-muted fw-bold">
                                                <CalendarCheck size={16} /> Date
                                            </Form.Label>
                                            <Form.Control
                                                type="date"
                                                name="date"
                                                value={formData.date}
                                                onChange={handleChange}
                                                required
                                                min={new Date().toISOString().split('T')[0]}
                                                className="text-white"
                                                style={{ colorScheme: 'dark' }}
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label className="d-flex align-items-center gap-2 text-muted fw-bold">
                                                <Clock size={16} /> Time
                                            </Form.Label>
                                            <Form.Select
                                                name="time"
                                                value={formData.time}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">Select Time</option>
                                                <option value="17:00">5:00 PM</option>
                                                <option value="17:30">5:30 PM</option>
                                                <option value="18:00">6:00 PM</option>
                                                <option value="18:30">6:30 PM</option>
                                                <option value="19:00">7:00 PM</option>
                                                <option value="19:30">7:30 PM</option>
                                                <option value="20:00">8:00 PM</option>
                                                <option value="20:30">8:30 PM</option>
                                                <option value="21:00">9:00 PM</option>
                                                <option value="21:30">9:30 PM</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>

                                    <Col xs={12}>
                                        <Form.Group>
                                            <Form.Label className="text-muted fw-bold">Special Requests (Optional)</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                name="special_requests"
                                                value={formData.special_requests}
                                                onChange={handleChange}
                                                placeholder="Allergies, anniversaries, preferred seating..."
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col xs={12} className="text-center mt-5">
                                        <Button
                                            type="submit"
                                            className="btn-gold btn-lg w-100 py-3 text-uppercase fw-bold shadow"
                                            disabled={status === 'submitting'}
                                        >
                                            {status === 'submitting' ? 'Confirming...' : 'Confirm Reservation'}
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Reservation;
