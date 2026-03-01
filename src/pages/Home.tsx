import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { ContainerScroll } from '../components/ui/container-scroll-animation';

const Home = () => {
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
                                <span className="text-5xl md:text-[6rem] font-bold mt-1 leading-none text-black">
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
                                <Link to="/menu" className="btn btn-outline-gold btn-lg text-uppercase px-5 py-3 text-decoration-none bg-white">
                                    View Menu <ArrowRight className="ms-2 d-inline" size={20} />
                                </Link>
                            </div>
                        </>
                    }
                >
                    <div className="h-full w-full bg-[var(--bg-light)] text-[var(--text-main)] rounded-2xl p-8 md:p-12 flex flex-col justify-center items-center text-center shadow-lg border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] bg-blue-gradient hover-glow">
                        <div className="max-w-3xl">
                            <h2 className="text-4xl md:text-5xl brand-font mb-6 border-b pb-4 border-[rgba(0,0,0,0.1)] inline-block">The Grand Bistro</h2>
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
                                    style={{ border: '2px solid rgba(212, 175, 55, 0.2)' }}
                                />
                                <div className="position-absolute bottom-0 end-0 p-4 bg-white border rounded shadow" style={{ borderColor: 'var(--primary-color) !important', transform: 'translate(-20px, 20px)' }}>
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
                            <p className="lead text-muted mb-4">
                                Founded with a passion for exceptional ingredients and innovative culinary techniques, The Grand Bistro offers a modern twist on classic gastronomy.
                            </p>
                            <p className="text-muted mb-5">
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
                    <Row className="gy-4 mt-2">
                        {[
                            { title: "Truffle Ribeye", desc: "Prime cut ribeye with black truffle butter and roasted heirloom carrots.", price: "$45", img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80" },
                            { title: "Seared Scallops", desc: "Pan-seared jumbo scallops over sweet corn purée with crisp pancetta.", price: "$32", img: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&q=80" },
                            { title: "Chocolate Lava Cake", desc: "Warm Belgian chocolate cake with a molten center and vanilla bean ice cream.", price: "$14", img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80" }
                        ].map((item, idx) => (
                            <Col md={4} key={idx}>
                                <div className="menu-card h-100 p-3 rounded-2xl border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] bg-blue-gradient hover-glow">
                                    <div className="overflow-hidden rounded mb-3">
                                        <img src={item.img} alt={item.title} className="w-100" />
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <h4 className="brand-font mb-0">{item.title}</h4>
                                        <span className="price-tag">{item.price}</span>
                                    </div>
                                    <p className="text-muted mb-0">{item.desc}</p>
                                </div>
                            </Col>
                        ))}
                    </Row>
                    <div className="text-center mt-5">
                        <Link to="/menu" className="btn btn-gold text-decoration-none">View Full Menu</Link>
                    </div>
                </Container>
            </section>
        </div>
    );
};

export default Home;
