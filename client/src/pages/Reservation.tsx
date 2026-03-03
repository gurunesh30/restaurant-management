import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { CalendarCheck, Users, Clock, User, Phone, Mail, X, ChefHat, Wifi, Music, Wine, Layers, Star, Utensils } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Timeline } from '../components/ui/timeline';
import { reservationApi } from '../lib/api';

/* ─────────────────── Types ─────────────────── */

interface TableData {
    id: string;
    seats: number;
    status: 'available' | 'booked';
    label: string;
    type: 'round' | 'square' | 'long';
}

interface FloorData {
    name: string;
    subtitle: string;
    description: string;
    capacity: number;
    features: { icon: React.ReactNode; label: string }[];
    tables: TableData[];
    gridCols: number;
    accent: string;
}

/* ─────────────────── Floor Data ─────────────────── */

const FLOORS: FloorData[] = [
    {
        name: 'Ground Floor',
        subtitle: 'Main Dining Hall',
        description: 'Open-air dining with elegant interiors and natural light. Perfect for family gatherings.',
        capacity: 80,
        features: [
            { icon: <Utensils size={12} />, label: 'Fine Dining' },
            { icon: <Music size={12} />, label: 'Live Music' },
        ],
        accent: '#60a5fa',
        gridCols: 6,
        tables: [
            { id: 'G-01', seats: 2, status: 'available', label: 'G-01', type: 'square' },
            { id: 'G-02', seats: 2, status: 'available', label: 'G-02', type: 'square' },
            { id: 'G-03', seats: 2, status: 'booked', label: 'G-03', type: 'square' },
            { id: 'G-04', seats: 4, status: 'available', label: 'G-04', type: 'round' },
            { id: 'G-05', seats: 4, status: 'available', label: 'G-05', type: 'round' },
            { id: 'G-06', seats: 4, status: 'booked', label: 'G-06', type: 'round' },
            { id: 'G-07', seats: 2, status: 'available', label: 'G-07', type: 'square' },
            { id: 'G-08', seats: 2, status: 'booked', label: 'G-08', type: 'square' },
            { id: 'G-09', seats: 2, status: 'available', label: 'G-09', type: 'square' },
            { id: 'G-10', seats: 6, status: 'available', label: 'G-10', type: 'long' },
            { id: 'G-11', seats: 6, status: 'booked', label: 'G-11', type: 'long' },
            { id: 'G-12', seats: 4, status: 'available', label: 'G-12', type: 'round' },
            { id: 'G-13', seats: 2, status: 'available', label: 'G-13', type: 'square' },
            { id: 'G-14', seats: 2, status: 'available', label: 'G-14', type: 'square' },
            { id: 'G-15', seats: 4, status: 'available', label: 'G-15', type: 'round' },
            { id: 'G-16', seats: 2, status: 'booked', label: 'G-16', type: 'square' },
            { id: 'G-17', seats: 4, status: 'available', label: 'G-17', type: 'round' },
            { id: 'G-18', seats: 2, status: 'available', label: 'G-18', type: 'square' },
        ],
    },
    {
        name: 'First Floor',
        subtitle: 'Lounge & Bar Area',
        description: 'Sophisticated lounge with premium bar and booth seating for intimate conversations.',
        capacity: 50,
        features: [
            { icon: <Wine size={12} />, label: 'Premium Bar' },
            { icon: <Wifi size={12} />, label: 'Free Wi-Fi' },
        ],
        accent: '#a78bfa',
        gridCols: 5,
        tables: [
            { id: 'F1-01', seats: 2, status: 'available', label: 'F1-01', type: 'round' },
            { id: 'F1-02', seats: 2, status: 'booked', label: 'F1-02', type: 'round' },
            { id: 'F1-03', seats: 4, status: 'available', label: 'F1-03', type: 'square' },
            { id: 'F1-04', seats: 4, status: 'available', label: 'F1-04', type: 'square' },
            { id: 'F1-05', seats: 2, status: 'available', label: 'F1-05', type: 'round' },
            { id: 'F1-06', seats: 6, status: 'booked', label: 'F1-06', type: 'long' },
            { id: 'F1-07', seats: 2, status: 'available', label: 'F1-07', type: 'round' },
            { id: 'F1-08', seats: 4, status: 'available', label: 'F1-08', type: 'square' },
            { id: 'F1-09', seats: 2, status: 'booked', label: 'F1-09', type: 'round' },
            { id: 'F1-10', seats: 8, status: 'available', label: 'F1-10', type: 'long' },
            { id: 'F1-11', seats: 2, status: 'available', label: 'F1-11', type: 'round' },
            { id: 'F1-12', seats: 4, status: 'available', label: 'F1-12', type: 'square' },
            { id: 'F1-13', seats: 2, status: 'available', label: 'F1-13', type: 'round' },
            { id: 'F1-14', seats: 2, status: 'booked', label: 'F1-14', type: 'round' },
            { id: 'F1-15', seats: 4, status: 'available', label: 'F1-15', type: 'square' },
        ],
    },
    {
        name: 'Rooftop',
        subtitle: 'Sky Terrace & Private Dining',
        description: 'Open-air rooftop with panoramic city views and exclusive chef\'s table.',
        capacity: 40,
        features: [
            { icon: <Star size={12} />, label: 'City Views' },
            { icon: <ChefHat size={12} />, label: "Chef's Table" },
        ],
        accent: '#f59e0b',
        gridCols: 4,
        tables: [
            { id: 'R-01', seats: 2, status: 'available', label: 'R-01', type: 'round' },
            { id: 'R-02', seats: 2, status: 'available', label: 'R-02', type: 'round' },
            { id: 'R-03', seats: 4, status: 'booked', label: 'R-03', type: 'square' },
            { id: 'R-04', seats: 4, status: 'available', label: 'R-04', type: 'square' },
            { id: 'R-05', seats: 2, status: 'available', label: 'R-05', type: 'round' },
            { id: 'R-06', seats: 2, status: 'booked', label: 'R-06', type: 'round' },
            { id: 'R-07', seats: 8, status: 'available', label: 'R-07', type: 'long' },
            { id: 'R-08', seats: 6, status: 'available', label: 'R-08', type: 'long' },
            { id: 'R-09', seats: 2, status: 'available', label: 'R-09', type: 'round' },
            { id: 'R-10', seats: 4, status: 'available', label: 'R-10', type: 'square' },
            { id: 'R-11', seats: 2, status: 'booked', label: 'R-11', type: 'round' },
            { id: 'R-12', seats: 2, status: 'available', label: 'R-12', type: 'round' },
        ],
    },
];


/* ─────────────── Table Cell (BMS style) ─────────────── */

const TableCell: React.FC<{
    table: TableData;
    accent: string;
    isSelected: boolean;
    onClick: () => void;
}> = ({ table, accent, isSelected, onClick }) => {
    const isAvailable = table.status === 'available';
    const shapeRadius = table.type === 'round' ? '50%' : table.type === 'long' ? '8px' : '6px';

    return (
        <motion.div
            whileHover={isAvailable ? { scale: 1.08, y: -2 } : {}}
            whileTap={isAvailable ? { scale: 0.95 } : {}}
            onClick={isAvailable ? onClick : undefined}
            style={{
                borderRadius: shapeRadius,
                aspectRatio: table.type === 'long' ? '2 / 1' : '1 / 1',
                gridColumn: table.type === 'long' ? 'span 2' : 'span 1',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '2px',
                cursor: isAvailable ? 'pointer' : 'not-allowed',
                opacity: isAvailable ? 1 : 0.4,
                border: isSelected
                    ? `2.5px solid ${accent}`
                    : isAvailable
                        ? '1.5px solid rgba(128,128,128,0.2)'
                        : '1.5px solid rgba(128,128,128,0.1)',
                background: isSelected
                    ? `${accent}18`
                    : isAvailable
                        ? 'var(--bg-light)'
                        : 'var(--bg-darker)',
                boxShadow: isSelected
                    ? `0 0 12px ${accent}30, 0 2px 8px rgba(0,0,0,0.08)`
                    : '0 1px 4px rgba(0,0,0,0.05)',
                transition: 'border 0.2s, background 0.2s, box-shadow 0.2s',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Top accent pip */}
            <div style={{
                position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                width: table.type === 'long' ? '40%' : '50%', height: '3px',
                borderRadius: '0 0 4px 4px',
                background: isSelected ? accent : isAvailable ? `${accent}60` : '#a1a1aa40',
            }} />
            <span style={{
                fontWeight: 700, fontSize: 'clamp(0.55rem, 1.5vw, 0.75rem)',
                color: isSelected ? accent : 'var(--text-main)', lineHeight: 1.2,
            }}>
                {table.label}
            </span>
            <span style={{
                fontSize: 'clamp(0.45rem, 1vw, 0.6rem)', color: 'var(--text-muted)',
                fontWeight: 600, display: 'flex', alignItems: 'center', gap: '2px',
            }}>
                <Users size={8} />{table.seats}
            </span>
            {!isAvailable && (
                <span style={{
                    position: 'absolute', bottom: '4px', fontSize: '0.4rem',
                    textTransform: 'uppercase', letterSpacing: '0.1em', color: '#a1a1aa', fontWeight: 700,
                }}>Booked</span>
            )}
            {isSelected && (
                <motion.div
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    style={{
                        position: 'absolute', top: '4px', right: '4px',
                        width: '10px', height: '10px', borderRadius: '50%',
                        background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                >
                    <span style={{ color: '#fff', fontSize: '7px', fontWeight: 900 }}>✓</span>
                </motion.div>
            )}
        </motion.div>
    );
};


/* ─────────────── Table Grid (content area) ─────────────── */

const TableGrid: React.FC<{
    floor: FloorData;
    selectedTable: TableData | null;
    onSelectTable: (table: TableData, floor: FloorData) => void;
}> = ({ floor, selectedTable, onSelectTable }) => {
    const availableCount = floor.tables.filter(t => t.status === 'available').length;
    const bookedCount = floor.tables.filter(t => t.status === 'booked').length;

    return (
        <div>
            {/* Legend */}
            <div style={{
                display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px',
                fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 500,
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <div style={{ width: 10, height: 10, borderRadius: 3, border: `2px solid ${floor.accent}`, background: `${floor.accent}15` }} />
                    Available ({availableCount})
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <div style={{ width: 10, height: 10, borderRadius: 3, border: '2px solid #a1a1aa', background: 'rgba(161,161,170,0.15)' }} />
                    Booked ({bookedCount})
                </div>
            </div>

            {/* Grid */}
            <div style={{
                background: 'var(--bg-darker)', borderRadius: '16px',
                border: '1px solid rgba(128,128,128,0.1)', padding: '20px',
                position: 'relative', overflow: 'hidden',
            }}>
                {/* Entrance label */}
                <div style={{
                    width: '60%', margin: '0 auto 16px auto', padding: '5px 0',
                    textAlign: 'center', fontSize: '0.55rem', fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--text-muted)',
                    borderBottom: `2px solid ${floor.accent}40`, borderRadius: '0 0 50% 50%',
                    background: `linear-gradient(to bottom, ${floor.accent}08, transparent)`,
                }}>
                    ← Entrance →
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${floor.gridCols}, 1fr)`,
                    gap: '10px', maxWidth: '480px', margin: '0 auto',
                }}>
                    {floor.tables.map((table) => (
                        <TableCell
                            key={table.id}
                            table={table}
                            accent={floor.accent}
                            isSelected={selectedTable?.id === table.id}
                            onClick={() => onSelectTable(table, floor)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};


/* ─────────────── Sticky Floor Label (left side) ─────────────── */

const FloorLabel: React.FC<{ floor: FloorData }> = ({ floor }) => (
    <div>
        <h3 className="brand-font" style={{
            fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)',
            margin: '0 0 2px 0', lineHeight: 1.2,
        }}>
            {floor.name}
        </h3>
        <span style={{
            fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '0.12em', color: floor.accent, display: 'block', marginBottom: '8px',
        }}>
            {floor.subtitle}
        </span>
        <p style={{
            fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5,
            margin: '0 0 10px 0',
        }}>
            {floor.description}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {floor.features.map((f, i) => (
                <span key={i} style={{
                    display: 'inline-flex', alignItems: 'center', gap: '4px',
                    padding: '3px 10px', borderRadius: '100px', fontSize: '0.6rem', fontWeight: 600,
                    background: `${floor.accent}12`, color: floor.accent,
                    border: `1px solid ${floor.accent}25`,
                }}>
                    {f.icon} {f.label}
                </span>
            ))}
            <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '4px',
                padding: '3px 10px', borderRadius: '100px', fontSize: '0.6rem', fontWeight: 600,
                background: `${floor.accent}12`, color: floor.accent,
                border: `1px solid ${floor.accent}25`,
            }}>
                <Users size={12} /> {floor.capacity} Seats
            </span>
        </div>
    </div>
);


/* ─────────────── Main Reservation Page ─────────────── */

const Reservation = () => {
    const [selectedTable, setSelectedTable] = useState<TableData | null>(null);
    const [selectedFloor, setSelectedFloor] = useState<FloorData | null>(null);
    const [formData, setFormData] = useState({
        customer_name: '', email: '', phone: '', date: new Date().toISOString().split('T')[0], time: '', special_requests: '', guests: 2
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [existingReservations, setExistingReservations] = useState<any[]>([]);
    const [loadingReservations, setLoadingReservations] = useState(false);

    useEffect(() => {
        const fetchReservations = async () => {
            if (!formData.date) return;
            try {
                setLoadingReservations(true);
                const response = await reservationApi.getAll({ date: formData.date });
                setExistingReservations(response.data);
            } catch (err: any) {
                const errMsg = err.response?.data?.message || err.response?.data?.error || err.message;
                console.error('Error fetching reservations:', errMsg, err.response?.data);
            } finally {
                setLoadingReservations(false);
            }
        };

        fetchReservations();
    }, [formData.date]);

    // Computed floors with real-time status
    const currentFloors = FLOORS.map(floor => ({
        ...floor,
        tables: floor.tables.map(table => {
            const isBooked = existingReservations.some(res =>
                res.table_id === table.id &&
                res.status !== 'Cancelled'
            );
            return {
                ...table,
                status: isBooked ? 'booked' : 'available' as 'booked' | 'available'
            };
        })
    }));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedTable || !selectedFloor) return;

        setStatus('submitting');
        try {
            await reservationApi.create({
                ...formData,
                table_id: selectedTable.id,
                floor: selectedFloor.name,
                guests: selectedTable.seats // Use table's seat count or form data
            });

            setStatus('success');
            // Refresh reservations
            const response = await reservationApi.getAll({ date: formData.date });
            setExistingReservations(response.data);

            setTimeout(() => {
                setStatus('idle');
                setSelectedTable(null);
                setSelectedFloor(null);
                setFormData({ ...formData, customer_name: '', email: '', phone: '', special_requests: '', time: '' });
            }, 3000);
        } catch (err: any) {
            const errMsg = err.response?.data?.message || err.response?.data?.error || err.message;
            console.error('Error creating reservation:', errMsg, err.response?.data);
            setStatus('error');
        }
    };

    const handleTableSelect = (table: TableData, floor: FloorData) => {
        if (table.status === 'available') {
            setSelectedTable(table);
            setSelectedFloor(floor);
            setStatus('idle');
        }
    };

    /* Build timeline: title = sticky floor label, content = table grid */
    const timelineData = currentFloors.map((floor) => ({
        title: <FloorLabel floor={floor} />,
        content: (
            <TableGrid
                floor={floor}
                selectedTable={selectedTable}
                onSelectTable={handleTableSelect}
            />
        ),
    }));

    return (
        <div style={{ minHeight: '100vh' }}>
            {/* ── Blurred when popup open ── */}
            <div style={{
                filter: selectedTable ? 'blur(6px)' : 'none',
                pointerEvents: selectedTable ? 'none' : 'auto',
                transition: 'filter 0.3s ease',
            }}>
                {/* Hero */}
                <div style={{ paddingTop: '120px', paddingBottom: '10px', textAlign: 'center' }}>
                    <Container>
                        <motion.span
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="section-subtitle d-inline-block"
                            style={{ color: 'var(--primary-color)', marginBottom: '12px' }}
                        >
                            Interactive Floor Plan
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="section-title display-4 brand-font"
                            style={{ color: 'var(--text-main)', marginBottom: '16px' }}
                        >
                            Reserve Your Table
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            style={{ color: 'var(--text-muted)', maxWidth: '580px', margin: '0 auto', fontSize: '1rem', lineHeight: 1.7 }}
                        >
                            Scroll through each floor — the details stick on the left as you browse tables on the right.
                        </motion.p>
                        {loadingReservations && (
                            <div className="d-flex align-items-center justify-content-center gap-2 mt-3 text-[var(--primary-color)]">
                                <Spinner animation="border" size="sm" />
                                <span className="small fw-bold">Updating availability...</span>
                            </div>
                        )}
                    </Container>
                </div>

                {/* Timeline */}
                <Timeline data={timelineData} />
            </div>

            {/* ── Booking Popup ── */}
            <AnimatePresence>
                {selectedTable && selectedFloor && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        style={{
                            position: 'fixed', inset: 0, zIndex: 1050,
                            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px',
                        }}
                    >
                        <div
                            onClick={() => { setSelectedTable(null); setSelectedFloor(null); }}
                            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)' }}
                        />
                        <motion.div
                            initial={{ y: 40, scale: 0.96 }} animate={{ y: 0, scale: 1 }}
                            exit={{ y: 20, scale: 0.97 }} transition={{ duration: 0.25, ease: 'easeOut' }}
                            style={{
                                position: 'relative', width: '100%', maxWidth: '640px', maxHeight: '90vh',
                                overflowY: 'auto', background: 'var(--bg-light)', borderRadius: '24px',
                                padding: '32px', boxShadow: '0 25px 60px rgba(0,0,0,0.25)',
                                border: '1px solid rgba(128,128,128,0.15)',
                            }}
                        >
                            <button
                                onClick={() => { setSelectedTable(null); setSelectedFloor(null); }}
                                style={{
                                    position: 'absolute', top: '20px', right: '20px',
                                    background: 'none', border: 'none', cursor: 'pointer',
                                    color: 'var(--text-muted)', padding: '4px', borderRadius: '50%',
                                }}
                            >
                                <X size={22} />
                            </button>

                            <div style={{
                                marginBottom: '28px', padding: '16px 20px',
                                background: 'var(--bg-dark)', borderRadius: '16px',
                                border: '1px solid rgba(128,128,128,0.1)',
                            }}>
                                <h2 className="brand-font" style={{
                                    color: 'var(--text-main)', fontSize: '1.6rem',
                                    margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: '10px',
                                }}>
                                    <CalendarCheck size={22} style={{ color: selectedFloor.accent }} />
                                    Book {selectedTable.label}
                                </h2>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <Layers size={14} style={{ color: selectedFloor.accent }} /> {selectedFloor.name}
                                    </span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <Users size={14} style={{ color: selectedFloor.accent }} /> {selectedTable.seats} Seats
                                    </span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <Clock size={14} style={{ color: 'var(--primary-color)' }} /> Instant Confirmation
                                    </span>
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
                                            <option value="18:00">6:00 PM</option>
                                            <option value="19:00">7:00 PM</option>
                                            <option value="20:00">8:00 PM</option>
                                            <option value="21:00">9:00 PM</option>
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
                                            placeholder="Allergies, anniversaries..."
                                            style={{ background: 'var(--bg-dark)', border: '1px solid rgba(128,128,128,0.15)', color: 'var(--text-main)', padding: '10px 14px', borderRadius: '12px' }} />
                                    </Col>
                                    <Col xs={12} className="mt-3">
                                        <Button type="submit" disabled={status === 'submitting'}
                                            style={{
                                                width: '100%', padding: '14px', fontWeight: 700, fontSize: '1rem',
                                                textTransform: 'uppercase', letterSpacing: '0.05em', borderRadius: '14px',
                                                background: selectedFloor.accent, color: '#fff', border: `2px solid ${selectedFloor.accent}`,
                                                transition: 'all 0.25s ease',
                                            }}
                                            onMouseEnter={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = selectedFloor!.accent; }}
                                            onMouseLeave={(e) => { e.currentTarget.style.background = selectedFloor!.accent; e.currentTarget.style.color = '#fff'; }}
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
