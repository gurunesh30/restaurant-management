import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
    return (
        <div className="contact-page py-5 mt-5">
            <Container className="py-5">
                <div className="text-center mb-5 pb-3">
                    <span className="section-subtitle">Get in Touch</span>
                    <h1 className="section-title display-4 brand-font">Contact Us</h1>
                    <p className="text-muted max-w-lg mx-auto">
                        We'd love to hear from you. For private events, special requests, or general inquiries, drop us a line below.
                    </p>
                </div>

                <Row className="gy-5">
                    <Col lg={4}>
                        <div className="d-flex flex-column gap-4 pe-lg-4">
                            <div className="p-4 bg-light rounded border" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                                <div className="d-flex gap-3 align-items-start mb-3 border-bottom border-secondary pb-3">
                                    <div className="bg-dark p-2 rounded text-gold" style={{ color: 'var(--primary-color)' }}>
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h5 className="mb-1 brand-font text-white">Location</h5>
                                        <p className="text-muted mb-0 small">
                                            123 Culinary Boulevard,<br />
                                            New York, NY 10001
                                        </p>
                                    </div>
                                </div>

                                <div className="d-flex gap-3 align-items-start mb-3 border-bottom border-secondary pb-3">
                                    <div className="bg-dark p-2 rounded text-gold" style={{ color: 'var(--primary-color)' }}>
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h5 className="mb-1 brand-font text-white">Call Us</h5>
                                        <p className="text-muted mb-0 small">+1 (555) 123-4567</p>
                                        <p className="text-muted mb-0 small">Mon-Sun, 9AM - 10PM</p>
                                    </div>
                                </div>

                                <div className="d-flex gap-3 align-items-start">
                                    <div className="bg-dark p-2 rounded text-gold" style={{ color: 'var(--primary-color)' }}>
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h5 className="mb-1 brand-font text-white">Email Us</h5>
                                        <p className="text-muted mb-0 small">hello@grandbistro.com</p>
                                        <p className="text-muted mb-0 small">events@grandbistro.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>

                    <Col lg={8}>
                        <div className="bg-light p-4 p-md-5 rounded shadow">
                            <h3 className="brand-font mb-4 text-white">Send a Message</h3>
                            <Form onSubmit={(e: React.FormEvent) => e.preventDefault()}>
                                <Row className="gy-4">
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label className="text-muted fw-bold">Your Name</Form.Label>
                                            <Form.Control type="text" placeholder="John Doe" required />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label className="text-muted fw-bold">Your Email</Form.Label>
                                            <Form.Control type="email" placeholder="john@example.com" required />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12}>
                                        <Form.Group>
                                            <Form.Label className="text-muted fw-bold">Subject</Form.Label>
                                            <Form.Control type="text" placeholder="How can we help?" required />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12}>
                                        <Form.Group>
                                            <Form.Label className="text-muted fw-bold">Message</Form.Label>
                                            <Form.Control as="textarea" rows={5} placeholder="Type your message here..." required />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12}>
                                        <Button type="submit" className="btn-gold py-2 px-4 shadow-sm w-100 d-md-inline-block w-md-auto">
                                            Send Message <Send size={16} className="ms-2" />
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

export default Contact;
