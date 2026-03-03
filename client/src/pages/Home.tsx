import { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { ContainerScroll } from '../components/ui/container-scroll-animation';
import { menuApi } from '../lib/api';

interface MenuItem {
    _id: string;
    name: string;
    description: string;
    price: number;
    image_url: string;
}

const Home = () => {
    const [featuredItems, setFeaturedItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const response = await menuApi.getAll();
                // Just take the first 3 items for simplicity, or filter by a 'featured' flag if you add one later
                setFeaturedItems(response.data.slice(0, 3));
            } catch (err) {
                console.error('Error fetching featured items:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchFeatured();
    }, []);

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="flex flex-col overflow-hidden pb-[100px] pt-[150px] bg-[var(--bg-dark)]">
                <ContainerScroll
                    titleComponent={
                        <>
                            <span className="section-subtitle mb-3 fade-in d-inline-block text-[var(--primary-color)]">Experience Culinary Excellence</span>
                            <h1 className="text-4xl md:text-6xl font-semibold text-[var(--text-main)] mb-4 brand-font">
                                The Grand <br />
                                <span className="text-5xl md:text-[6rem] font-bold mt-1 leading-none text-[var(--text-main)]">
                                    Bistro
                                </span>
                            </h1>
                            <p className="lead text-[var(--text-muted)] mt-5 mb-5 px-lg-5 fs-4 max-w-2xl mx-auto">
                                A symphony of flavors, bridging the gap between digital browsing and unforgettable physical dining experiences.
                            </p>
                            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center mt-4 mb-20">
                                <Link to="/reservation" className="btn btn-gold btn-lg text-uppercase px-5 py-3 shadow-lg text-decoration-none">
                                    Book a Table
                                </Link>
                                <Link to="/menu" className="btn btn-outline-gold btn-lg text-uppercase px-5 py-3 text-decoration-none bg-[var(--bg-light)]">
                                    View Menu <ArrowRight className="ms-2 d-inline" size={20} />
                                </Link>
                            </div>
                        </>
                    }
                >
                    <div className="h-full w-full bg-[var(--bg-light)] text-[var(--text-main)] rounded-2xl p-8 md:p-12 flex flex-col justify-center items-center text-center shadow-lg border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] bg-blue-gradient hover-glow">
                        <div className="max-w-3xl">
                            <h2 className="text-4xl md:text-5xl brand-font mb-6 border-b pb-4 border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] inline-block text-[var(--text-main)]">The Grand Bistro</h2>
                            <p className="text-xl md:text-2xl text-[var(--text-muted)] font-light leading-relaxed">
                                Welcome to a place where tradition meets innovation. At The Grand Bistro, we source only the finest local ingredients to create unforgettable culinary experiences.
                                <br /><br />
                                Est. 1985
                            </p>
                        </div>
                    </div>
                </ContainerScroll>
            </section>

            {/* About Section */}
            <section className="section-padding bg-darker">
                <Container>
                    <Row className="align-items-center gy-5">
                        <Col lg={6}>
                            <div className="position-relative pe-lg-5">
                                <img
                                    src="https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80"
                                    alt="Restaurant Interior"
                                    className="img-fluid rounded shadow-lg"
                                    style={{ border: '2px solid rgba(124, 111, 100, 0.2)' }}
                                />
                                <div className="position-absolute bottom-0 end-0 p-4 bg-[var(--bg-light)] border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] rounded-2xl shadow-lg bg-blue-gradient hover-glow" style={{ transform: 'translate(-20px, 20px)' }}>
                                    <div className="d-flex align-items-center gap-2 mb-2 text-gold" style={{ color: 'var(--primary-color)' }}>
                                        <Star fill="currentColor" />
                                        <Star fill="currentColor" />
                                        <Star fill="currentColor" />
                                        <Star fill="currentColor" />
                                        <Star fill="currentColor" />
                                    </div>
                                    <h5 className="brand-font mb-0 text-[var(--text-main)]">Award Winning</h5>
                                    <p className="text-[var(--text-muted)] mb-0 small">Dining Experience</p>
                                </div>
                            </div>
                        </Col>
                        <Col lg={6}>
                            <span className="section-subtitle text-start mb-2">Our Story</span>
                            <h2 className="section-title text-start mb-4">A Legacy of <span style={{ color: 'var(--primary-color)' }}>Taste</span></h2>
                            <p className="lead text-[var(--text-muted)] mb-4">
                                Founded with a passion for exceptional ingredients and innovative culinary techniques, The Grand Bistro offers a modern twist on classic gastronomy.
                            </p>
                            <p className="text-[var(--text-muted)] mb-5">
                                Our chef-curated menu ensures that every bite is a journey. From farm-fresh appetizers to decadent deserts, we believe in creating moments that linger long after the final course.
                            </p>
                            <Link to="/about" className="btn btn-outline-gold text-decoration-none">
                                Discover More
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Featured Menu Preview */}
            <section className="section-padding">
                <Container>
                    <div className="mb-5">
                        <span className="section-subtitle mb-2">Signature Dishes</span>
                        <h2 className="section-title">Today's Special</h2>
                    </div>
                    {loading ? (
                        <div className="text-center py-5">
                            <Spinner animation="border" variant="gold" />
                        </div>
                    ) : (
                        <Row className="gy-4 mt-2">
                            {featuredItems.map((item) => (
                                <Col md={4} key={item._id}>
                                    <div className="menu-card h-100 p-3 rounded-2xl border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] bg-blue-gradient hover-glow">
                                        <div className="overflow-hidden rounded mb-3" style={{ height: '220px' }}>
                                            <img src={item.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80'} alt={item.name} className="w-100 h-100 object-fit-cover" />
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <h4 className="brand-font mb-0 text-[var(--text-main)]">{item.name}</h4>
                                            <span className="price-tag">${item.price.toFixed(2)}</span>
                                        </div>
                                        <p className="text-[var(--text-muted)] mb-0 small">{item.description}</p>
                                    </div>
                                </Col>
                            ))}
                            {featuredItems.length === 0 && (
                                <Col xs={12} className="text-center text-muted">
                                    No specials today. Check our full menu!
                                </Col>
                            )}
                        </Row>
                    )}
                    <div className="text-center mt-5">
                        <Link to="/menu" className="btn btn-gold text-decoration-none">View Full Menu</Link>
                    </div>
                </Container>
            </section>
        </div>
    );
};

export default Home;
