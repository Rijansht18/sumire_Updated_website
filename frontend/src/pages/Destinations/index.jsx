import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Form, Spinner } from 'react-bootstrap';
import { MapPin, Users, Award, ExternalLink, Search, Filter } from 'lucide-react';
import { universityAPI } from '../../services/api';

const Destinations = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [universities, setUniversities] = useState([]);
  const [filteredUniversities, setFilteredUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [programFilter, setProgramFilter] = useState('all');

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
    fetchUniversities();
  }, []);

  useEffect(() => {
    filterUniversities();
  }, [universities, searchTerm, locationFilter, programFilter]);

  const fetchUniversities = async () => {
    try {
      const response = await universityAPI.getAll();
      setUniversities(response.data.data);
    } catch (error) {
      console.error('Error fetching universities:', error);
      // Fallback data
      setUniversities([
        {
          _id: '1',
          name: "University of Tokyo",
          location: "Tokyo",
          ranking: "#1 in Japan",
          image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=250&fit=crop",
          programs: ["Engineering", "Medicine", "Business", "Science", "Law"],
          tuitionFee: { min: 535800, max: 1200000 },
          requirements: { gpa: 3.5, jlptLevel: "N2", englishTest: "TOEFL 80+" },
          description: "Japan's most prestigious university, known for academic excellence and research innovation.",
          website: "https://www.u-tokyo.ac.jp/en/"
        },
        {
          _id: '2',
          name: "Kyoto University",
          location: "Kyoto",
          ranking: "#2 in Japan",
          image: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=400&h=250&fit=crop",
          programs: ["Science", "Arts", "Law", "Medicine", "Engineering"],
          tuitionFee: { min: 535800, max: 1000000 },
          requirements: { gpa: 3.3, jlptLevel: "N2", englishTest: "TOEFL 75+" },
          description: "Historic university known for liberal academic traditions and Nobel Prize winners.",
          website: "https://www.kyoto-u.ac.jp/en"
        },
        {
          _id: '3',
          name: "Osaka University",
          location: "Osaka",
          ranking: "#3 in Japan",
          image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=250&fit=crop",
          programs: ["Technology", "Medicine", "Economics", "Engineering", "Science"],
          tuitionFee: { min: 535800, max: 900000 },
          requirements: { gpa: 3.2, jlptLevel: "N3", englishTest: "TOEFL 70+" },
          description: "Leading research university with strong international programs.",
          website: "https://www.osaka-u.ac.jp/en"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filterUniversities = () => {
    let filtered = universities;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(uni => 
        uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        uni.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        uni.programs?.some(program => program.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Location filter
    if (locationFilter !== 'all') {
      filtered = filtered.filter(uni => uni.location === locationFilter);
    }

    // Program filter
    if (programFilter !== 'all') {
      filtered = filtered.filter(uni => 
        uni.programs?.some(program => program.toLowerCase().includes(programFilter.toLowerCase()))
      );
    }

    setFilteredUniversities(filtered);
  };

  const locations = [...new Set(universities.map(uni => uni.location))];
  const allPrograms = [...new Set(universities.flatMap(uni => uni.programs || []))];

  return (
    <>
      {/* Hero Section */}
      <section className="py-5 bg-surface-alt position-relative overflow-hidden">
        <div className="position-absolute" style={{ top: '20%', right: '10%', fontSize: '60px', opacity: 0.1, animation: 'float 8s ease-in-out infinite' }}>🎓</div>
        <div className="position-absolute" style={{ bottom: '20%', left: '10%', fontSize: '80px', opacity: 0.1, animation: 'float 6s ease-in-out infinite 2s' }}>🗾</div>
        
        <Container>
          <Row className={`text-center ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
            <Col lg={8} className="mx-auto">
              <h1 className="fw-bold mb-4">Universities in Japan</h1>
              <p className="lead text-muted mb-4">
                Explore top Japanese universities and find the perfect match for your academic goals. 
                From prestigious national universities to specialized institutions.
              </p>
              <Button className="btn-accent-red btn-lg me-3" href="/study-abroad">Study Abroad Info</Button>
              <Button variant="outline-dark" className="btn-lg" href="/scholarships">View Scholarships</Button>
            </Col>
          </Row>
        </Container>
      </section>

      <Container className="py-5">
        {/* Search and Filters */}
        <Row className={`mb-4 ${isVisible ? 'animate-fade-up animate-delay-1' : 'opacity-0'}`}>
          <Col>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <div className="d-flex align-items-center mb-3">
                  <Filter size={20} className="me-2" />
                  <h5 className="mb-0">Find Your Perfect University</h5>
                </div>
                <Row>
                  <Col lg={4} className="mb-3">
                    <div className="position-relative">
                      <Form.Control
                        type="text"
                        placeholder="Search universities, locations, programs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="ps-5"
                      />
                      <Search 
                        size={18} 
                        className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                      />
                    </div>
                  </Col>
                  <Col lg={4} className="mb-3">
                    <Form.Select
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                    >
                      <option value="all">All Locations</option>
                      {locations.map(location => (
                        <option key={location} value={location}>{location}</option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col lg={4} className="mb-3">
                    <Form.Select
                      value={programFilter}
                      onChange={(e) => setProgramFilter(e.target.value)}
                    >
                      <option value="all">All Programs</option>
                      {allPrograms.map(program => (
                        <option key={program} value={program}>{program}</option>
                      ))}
                    </Form.Select>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Universities Grid */}
        {loading ? (
          <Row className="text-center py-5">
            <Col>
              <Spinner animation="border" variant="primary" />
              <p className="mt-3 text-muted">Loading universities...</p>
            </Col>
          </Row>
        ) : (
          <Row className={`${isVisible ? 'animate-fade-up animate-delay-2' : 'opacity-0'}`}>
            {filteredUniversities.length > 0 ? (
              filteredUniversities.map((university, index) => (
                <Col lg={4} md={6} className="mb-4" key={university._id}>
                  <Card className="border-0 shadow-sm h-100 hover-lift">
                    <Card.Img 
                      variant="top" 
                      src={university.image} 
                      style={{ height: '200px', objectFit: 'cover' }} 
                    />
                    <Card.Body className="p-4">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <Card.Title className="h5">{university.name}</Card.Title>
                        <Badge style={{ backgroundColor: 'var(--brand-accent-pink)', color: 'var(--brand-primary-dark)' }}>
                          {university.ranking}
                        </Badge>
                      </div>
                      
                      <div className="d-flex align-items-center mb-3">
                        <MapPin size={16} className="me-2 text-muted" />
                        <span className="text-muted small">{university.location}</span>
                      </div>
                      
                      <p className="text-muted small mb-3">{university.description}</p>
                      
                      <div className="mb-3">
                        <h6 className="fw-bold mb-2">Programs:</h6>
                        {university.programs?.map((program, idx) => (
                          <Badge key={idx} bg="light" text="dark" className="me-1 mb-1">
                            {program}
                          </Badge>
                        ))}
                      </div>
                      
                      {university.tuitionFee && (
                        <div className="mb-3">
                          <h6 className="fw-bold mb-1">Tuition Fee:</h6>
                          <p className="small text-muted mb-0">
                            ¥{university.tuitionFee.min?.toLocaleString()} - ¥{university.tuitionFee.max?.toLocaleString()}/year
                          </p>
                        </div>
                      )}
                      
                      {university.requirements && (
                        <div className="mb-3">
                          <h6 className="fw-bold mb-1">Requirements:</h6>
                          <p className="small text-muted mb-0">
                            GPA: {university.requirements.gpa} | JLPT: {university.requirements.jlptLevel} | {university.requirements.englishTest}
                          </p>
                        </div>
                      )}
                    </Card.Body>
                    <Card.Footer className="bg-transparent border-0 pt-0">
                      <div className="d-flex gap-2">
                        <Button variant="outline-dark" size="sm" className="flex-fill">
                          <Users size={16} className="me-1" />
                          Learn More
                        </Button>
                        {university.website && (
                          <Button 
                            variant="outline-primary" 
                            size="sm" 
                            href={university.website} 
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink size={16} />
                          </Button>
                        )}
                      </div>  <div className="d-flex align-items-center mb-3 text-muted">
                        <MapPin size={16} className="me-2" />
                        <span>{university.location}</span>
                      </div>
                      
                      <p className="text-muted small mb-3">{university.description}</p>
                      
                      <div className="mb-3">
                        <h6 className="fw-semibold small mb-2">Programs:</h6>
                        <div>
                          {university.programs?.slice(0, 3).map((program, idx) => (
                            <Badge key={idx} bg="light" text="dark" className="me-1 mb-1">
                              {program}
                            </Badge>
                          ))}
                          {university.programs?.length > 3 && (
                            <Badge bg="light" text="dark">+{university.programs.length - 3} more</Badge>
                          )}
                        </div>
                      </div>
                      
                      {university.tuitionFee && (
                        <div className="mb-3">
                          <h6 className="fw-semibold small mb-1">Tuition Fee:</h6>
                          <p className="small text-muted mb-0">
                            ¥{university.tuitionFee.min?.toLocaleString()} - ¥{university.tuitionFee.max?.toLocaleString()}/year
                          </p>
                        </div>
                      )}
                      
                      {university.requirements && (
                        <div className="mb-3">
                          <h6 className="fw-semibold small mb-1">Requirements:</h6>
                          <div className="small text-muted">
                            <div>GPA: {university.requirements.gpa}+</div>
                            <div>Japanese: {university.requirements.jlptLevel}</div>
                            <div>English: {university.requirements.englishTest}</div>
                          </div>
                        </div>
                      )}
                      
                      <div className="d-flex gap-2">
                        <Button variant="outline-dark" size="sm" className="flex-grow-1">
                          Learn More
                        </Button>
                        {university.website && (
                          <Button 
                            variant="outline-primary" 
                            size="sm"
                            href={university.website}
                            target="_blank"
                          >
                            <ExternalLink size={14} />
                          </Button>
                        )}
                      </div>
                    </Card.Footer>
                  </Card>
                </Col>
              ))
            ) : (
              <Col className="text-center py-5">
                <p className="text-muted">No universities found matching your criteria.</p>
                <Button 
                  variant="outline-dark" 
                  onClick={() => {
                    setSearchTerm('');
                    setLocationFilter('all');
                    setProgramFilter('all');
                  }}
                >
                  Clear Filters
                </Button>
              </Col>
            )}
          </Row>
        )}

        {/* CTA */}
        <Row className={`text-center mt-5 ${isVisible ? 'animate-fade-up animate-delay-3' : 'opacity-0'}`}>
          <Col lg={8} className="mx-auto">
            <div className="bg-surface-alt p-5 rounded-xl">
              <h3 className="fw-bold mb-3">Need Help Choosing?</h3>
              <p className="text-muted mb-4">
                Our education consultants can help you find the perfect university match 
                based on your academic background, career goals, and preferences.
              </p>
              <Button className="btn-accent-red btn-lg me-3" href="/contact">Get Free Consultation</Button>
              <Button variant="outline-dark" className="btn-lg" href="/study-abroad">Study Abroad Process</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Destinations;