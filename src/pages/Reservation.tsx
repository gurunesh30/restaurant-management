import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { CalendarCheck, Users, Clock, User, Phone, Mail, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface TableData {
    id: number;
    seats: number;
    status: 'available' | 'booked';
    label: string;
    x: number;
    y: number;
}

const TABLES: TableData[] = [
    { id: 1, seats: 2, status: 'available', label: 'T-01', x: 20, y: 30 },
    { id: 2, seats: 2, status: 'available', label: 'T-02', x: 20, y: 70 },
    { id: 3, seats: 4, status: 'booked', label: 'T-03', x: 50, y: 30 },
    { id: 4, seats: 4, status: 'available', label: 'T-04', x: 50, y: 70 },
    { id: 5, seats: 6, status: 'available', label: 'T-05', x: 80, y: 50 },
    { id: 6, seats: 2, status: 'available', label: 'T-06', x: 50, y: 50 },
    { id: 7, seats: 4, status: 'available', label: 'T-07', x: 35, y: 50 },
    { id: 8, seats: 8, status: 'booked', label: 'T-08', x: 80, y: 80 },
];

const Reservation = () => {
    const [selectedTable, setSelectedTable] = useState<TableData | null>(null);
    const [formData, setFormData] = useState({
        customer_name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        special_requests: ''
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedTable) return;
        setStatus('submitting');
        setTimeout(() => {
            setStatus('success');
            setTimeout(() => {
                setStatus('idle');
                setSelectedTable(null);
                setFormData({ customer_name: '', email: '', phone: '', date: '', time: '', special_requests: '' });
            }, 3000);
        }, 1500);
    };

    const handleTableClick = (table: TableData) => {
        if (table.status === 'available') {
            setSelectedTable(table);
            setStatus('idle');
        }
    };

    return (
        <div className="reservation-page" style={{ minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>

            {/* ── Page content: header + table grid ── */}
            <div style={{
                filter: selectedTable ? 'blur(6px)' : 'none',
                pointerEvents: selectedTable ? 'none' : 'auto',
                transition: 'filter 0.3s ease'
            }}>
                <Container>
                    <div className="text-center" style={{ marginBottom: '48px' }}>
                        <span className="section-subtitle d-inline-block" style={{ color: 'var(--primary-color)', marginBottom: '12px' }}>Interactive Booking</span>
                        <h1 className="section-title display-4 brand-font" style={{ color: 'var(--text-main)', marginBottom: '16px' }}>Select Your Table</h1>
                        <p style={{ color: 'var(--text-muted)', maxWidth: '560px', margin: '0 auto', fontSize: '1.1rem' }}>
                            Pick your preferred table from our floor plan below to begin your reservation.
                        </p>
                    </div>

                    {/* Legend */}
                    <div className="d-flex justify-content-center gap-4 mb-4" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        <div className="d-flex align-items-center gap-2">
                            <div style={{ width: 14, height: 14, borderRadius: 4, border: '2px solid #60a5fa', background: 'rgba(96,165,250,0.1)' }} />
                            Available
                        </div>
                        <div className="d-flex align-items-center gap-2">
                            <div style={{ width: 14, height: 14, borderRadius: 4, border: '2px solid #a1a1aa', background: 'rgba(161,161,170,0.15)' }} />
                            Booked
                        </div>
                    </div>

                    {/* ── Table Grid ── */}
                    <Row className="g-4 justify-content-center" style={{ maxWidth: '900px', margin: '0 auto' }}>
                        {TABLES.map((table) => {
                            const isAvailable = table.status === 'available';
                            return (
                                <Col xs={6} sm={4} md={3} key={table.id}>
                                    <div
                                        className={`rounded-2xl border ${isAvailable ? 'border-[rgba(96,165,250,0.5)] bg-blue-gradient hover-glow' : 'border-[rgba(161,161,170,0.3)] bg-[var(--bg-darker)]'} shadow-sm overflow-hidden`}
                                        style={{
                                            position: 'relative',
                                            width: '100%',
                                            paddingTop: '75%', /* aspect ratio */
                                            cursor: isAvailable ? 'pointer' : 'not-allowed',
                                            opacity: isAvailable ? 1 : 0.5,
                                        }}
                                        onClick={() => handleTableClick(table)}
                                    >
                                        {/* Top accent bar */}
                                        <div style={{
                                            position: 'absolute',
                                            top: 0, left: 0, right: 0,
                                            height: '4px',
                                            borderRadius: '16px 16px 0 0',
                                            background: isAvailable ? '#60a5fa' : '#a1a1aa',
                                        }} />

                                        {/* Content */}
                                        <div style={{
                                            position: 'absolute',
                                            inset: 0,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '6px',
                                        }}>
                                            <span style={{ fontWeight: 700, fontSize: '1.15rem', color: 'var(--text-main)' }}>{table.label}</span>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '4px',
                                                fontSize: '0.7rem',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.05em',
                                                fontWeight: 600,
                                                color: 'var(--text-muted)',
                                                background: 'var(--bg-dark)',
                                                padding: '3px 10px',
                                                borderRadius: '100px',
                                            }}>
                                                <Users size={10} style={{ color: isAvailable ? '#60a5fa' : '#a1a1aa' }} />
                                                {table.seats} Seats
                                            </div>
                                            {!isAvailable && (
                                                <span style={{ fontSize: '0.65rem', color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Reserved</span>
                                            )}
                                        </div>
                                    </div>
                                </Col>
                            );
                        })}
                    </Row>
                </Container>
            </div>

            {/* ── Booking Popup Overlay ── */}
            <AnimatePresence>
                {selectedTable && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        style={{
                            position: 'fixed', inset: 0, zIndex: 1050,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            padding: '24px',
                        }}
                    >
                        {/* Dim backdrop */}
                        <div
                            onClick={() => setSelectedTable(null)}
                            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)' }}
                        />

                        {/* Popup Card */}
                        <motion.div
                            initial={{ y: 40, scale: 0.96 }}
                            animate={{ y: 0, scale: 1 }}
                            exit={{ y: 20, scale: 0.97 }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                            style={{
                                position: 'relative',
                                width: '100%',
                                maxWidth: '640px',
                                maxHeight: '90vh',
                                overflowY: 'auto',
                                background: 'var(--bg-light)',
                                borderRadius: '24px',
                                padding: '32px',
                                boxShadow: '0 25px 60px rgba(0,0,0,0.25)',
                                border: '1px solid rgba(128,128,128,0.15)',
                            }}
                        >
                            {/* Close button */}
                            <button
                                onClick={() => setSelectedTable(null)}
                                style={{
                                    position: 'absolute', top: '20px', right: '20px',
                                    background: 'none', border: 'none', cursor: 'pointer',
                                    color: 'var(--text-muted)', padding: '4px', borderRadius: '50%',
                                }}
                            >
                                <X size={22} />
                            </button>

                            {/* Header with table info */}
                            <div style={{
                                marginBottom: '28px', padding: '16px 20px',
                                background: 'var(--bg-dark)', borderRadius: '16px',
                                border: '1px solid rgba(128,128,128,0.1)',
                            }}>
                                <h2 className="brand-font" style={{ color: 'var(--text-main)', fontSize: '1.6rem', margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <CalendarCheck size={22} style={{ color: 'var(--primary-color)' }} />
                                    Book {selectedTable.label}
                                </h2>
                                <div style={{ display: 'flex', gap: '20px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Users size={14} style={{ color: '#60a5fa' }} /> {selectedTable.seats} Seats</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Clock size={14} style={{ color: 'var(--primary-color)' }} /> Instant Confirmation</span>
                                </div>
                            </div>

                            {status === 'success' && (
                                <Alert variant="success" className="d-flex align-items-center gap-2 border-0 mb-4" style={{ background: 'rgba(96,165,250,0.1)', color: '#2563eb' }}>
                                    <CalendarCheck size={20} />
                                    <div><strong>Booked!</strong> Your table is confirmed for {formData.date} at {formData.time}.</div>
                                </Alert>
                            )}
                            {status === 'error' && (
                                <Alert variant="danger" className="mb-4">An error occurred. Please try again.</Alert>
                            )}

                            {/* Form */}
                            <Form onSubmit={handleSubmit}>
                                <Row className="gy-3">
                                    <Col md={6}>
                                        <Form.Label style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <User size={14} /> Full Name
                                        </Form.Label>
                                        <Form.Control type="text" name="customer_name" value={formData.customer_name} onChange={handleChange} required placeholder="John Doe"
                                            style={{ background: 'var(--bg-dark)', border: '1px solid rgba(128,128,128,0.15)', color: 'var(--text-main)', padding: '10px 14px', borderRadius: '12px' }} />
                                    </Col>
                                    <Col md={6}>
                                        <Form.Label style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <Mail size={14} /> Email
                                        </Form.Label>
                                        <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com"
                                            style={{ background: 'var(--bg-dark)', border: '1px solid rgba(128,128,128,0.15)', color: 'var(--text-main)', padding: '10px 14px', borderRadius: '12px' }} />
                                    </Col>
                                    <Col md={6}>
                                        <Form.Label style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <Phone size={14} /> Phone
                                        </Form.Label>
                                        <Form.Control type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="(555) 123-4567"
                                            style={{ background: 'var(--bg-dark)', border: '1px solid rgba(128,128,128,0.15)', color: 'var(--text-main)', padding: '10px 14px', borderRadius: '12px' }} />
                                    </Col>
                                    <Col md={6}>
                                        <Form.Label style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <CalendarCheck size={14} /> Date
                                        </Form.Label>
                                        <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} required min={new Date().toISOString().split('T')[0]}
                                            style={{ background: 'var(--bg-dark)', border: '1px solid rgba(128,128,128,0.15)', color: 'var(--text-main)', padding: '10px 14px', borderRadius: '12px' }} />
                                    </Col>
                                    <Col md={6}>
                                        <Form.Label style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <Clock size={14} /> Time
                                        </Form.Label>
                                        <Form.Select name="time" value={formData.time} onChange={handleChange} required
                                            style={{ background: 'var(--bg-dark)', border: '1px solid rgba(128,128,128,0.15)', color: 'var(--text-main)', padding: '10px 14px', borderRadius: '12px' }}>
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
                                    </Col>
                                    <Col md={6}>
                                        <Form.Label style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <Users size={14} /> Capacity
                                        </Form.Label>
                                        <div style={{ background: 'var(--bg-dark)', border: '1px solid rgba(128,128,128,0.15)', color: 'var(--text-muted)', padding: '10px 14px', borderRadius: '12px' }}>
                                            {selectedTable.seats} Guests Max
                                        </div>
                                    </Col>
                                    <Col xs={12}>
                                        <Form.Label style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '0.85rem' }}>Special Requests (Optional)</Form.Label>
                                        <Form.Control as="textarea" rows={2} name="special_requests" value={formData.special_requests} onChange={handleChange}
                                            placeholder="Allergies, anniversaries, preferred seating..."
                                            style={{ background: 'var(--bg-dark)', border: '1px solid rgba(128,128,128,0.15)', color: 'var(--text-main)', padding: '10px 14px', borderRadius: '12px' }} />
                                    </Col>
                                    <Col xs={12} className="mt-3">
                                        <Button type="submit" disabled={status === 'submitting'}
                                            style={{
                                                width: '100%', padding: '14px', fontWeight: 700, fontSize: '1rem',
                                                textTransform: 'uppercase', letterSpacing: '0.05em', borderRadius: '14px',
                                                background: 'var(--primary-color)', color: '#fff', border: '2px solid var(--primary-color)',
                                                transition: 'all 0.25s ease',
                                            }}
                                            onMouseEnter={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--primary-color)'; }}
                                            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--primary-color)'; e.currentTarget.style.color = '#fff'; }}
                                        >
                                            {status === 'submitting' ? 'Confirming...' : 'Confirm Reservation'}
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Reservation;
