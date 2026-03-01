import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="text-light">
            <Container>
                <Row className="gy-4">
                    <Col lg={4} md={6}>
                        <h4 className="brand-font text-gold mb-4" style={{ color: 'var(--primary-color)' }}>The Grand Bistro</h4>
                        <p className="text-muted pe-lg-4">
                            Experience the finest culinary creations in an atmosphere of elegant sophistication.
                            Where every meal is a celebration of taste and tradition.
                        </p>
                        <div className="d-flex gap-3 mt-4">
                            <a href="#" className="text-muted hover-gold"><Facebook size={20} /></a>
                            <a href="#" className="text-muted hover-gold"><Instagram size={20} /></a>
                            <a href="#" className="text-muted hover-gold"><Twitter size={20} /></a>
                        </div>
                    </Col>

                    <Col lg={2} md={6}>
                        <h5 className="mb-4">Quick Links</h5>
                        <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
                            <li><Link to="/" className="text-muted text-decoration-none">Home</Link></li>
                            <li><Link to="/menu" className="text-muted text-decoration-none">Our Menu</Link></li>
                            <li><Link to="/reservation" className="text-muted text-decoration-none">Book a Table</Link></li>
                            <li><Link to="/contact" className="text-muted text-decoration-none">Contact Us</Link></li>
                        </ul>
                    </Col>

                    <Col lg={3} md={6}>
                        <h5 className="mb-4">Opening Hours</h5>
                        <ul className="list-unstyled text-muted d-flex flex-column gap-2 mb-0">
                            <li className="d-flex justify-content-between">
                                <span>Mon - Thu:</span> <span>11:00 AM - 10:00 PM</span>
                            </li>
                            <li className="d-flex justify-content-between">
                                <span>Fri - Sat:</span> <span>11:00 AM - 11:30 PM</span>
                            </li>
                            <li className="d-flex justify-content-between">
                                <span>Sunday:</span> <span>10:00 AM - 9:00 PM</span>
                            </li>
                        </ul>
                    </Col>

                    <Col lg={3} md={6}>
                        <h5 className="mb-4">Contact Info</h5>
                        <ul className="list-unstyled text-muted d-flex flex-column gap-3 mb-0">
                            <li className="d-flex gap-3 align-items-start">
                                <MapPin size={20} className="text-gold flex-shrink-0 mt-1" style={{ color: 'var(--primary-color)' }} />
                                <span>123 Culinary Boulevard,<br />New York, NY 10001</span>
                            </li>
                            <li className="d-flex gap-3 align-items-center">
                                <Phone size={20} className="text-gold" style={{ color: 'var(--primary-color)' }} />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="d-flex gap-3 align-items-center">
                                <Mail size={20} className="text-gold" style={{ color: 'var(--primary-color)' }} />
                                <span>hello@grandbistro.com</span>
                            </li>
                        </ul>
                    </Col>
                </Row>

                <Row className="mt-5 pt-4 border-top border-secondary">
                    <Col className="text-center text-muted">
                        <p className="mb-0">&copy; {new Date().getFullYear()} The Grand Bistro. All rights reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
