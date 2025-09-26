import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button, Form } from 'react-bootstrap';
import { Calendar, User, ArrowRight, Search } from 'lucide-react';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const blogPosts = [
    {
      id: 1,
      title: "Complete Guide to JLPT N5 Preparation",
      excerpt: "Everything you need to know about preparing for the Japanese Language Proficiency Test N5 level, including study materials and tips.",
      category: "Language Learning",
      author: "Sakura Team",
      date: "2024-01-15",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Top 10 Universities in Japan for International Students",
      excerpt: "Discover the best Japanese universities that welcome international students with excellent programs and support systems.",
      category: "Study Abroad",
      author: "Education Team",
      date: "2024-01-10",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=250&fit=crop",
      readTime: "8 min read"
    },
    {
      id: 3,
      title: "Living in Japan: Cultural Tips for Newcomers",
      excerpt: "Essential cultural insights and practical tips for international students and workers adapting to life in Japan.",
      category: "Culture",
      author: "Cultural Guide",
      date: "2024-01-05",
      image: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=400&h=250&fit=crop",
      readTime: "6 min read"
    },
    {
      id: 4,
      title: "Scholarship Opportunities for Nepalese Students",
      excerpt: "Comprehensive list of scholarships available for Nepalese students planning to study in Japan.",
      category: "Scholarships",
      author: "Scholarship Team",
      date: "2024-01-01",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
      readTime: "7 min read"
    }
  ];

  const categories = [
    'all', 'Language Learning', 'Study Abroad', 'Culture', 'Scholarships'
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {/* Hero Section */}
      <section className="py-5 bg-surface-alt">
        <Container>
          <Row className={`text-center ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
            <Col>
              <h1 className="fw-bold mb-4">Blog & Resources</h1>
              <p className="lead text-muted">
                Insights, guides, and tips for your Japanese journey
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <Container className="py-5">
        {/* Search and Filter */}
        <Row className={`mb-4 ${isVisible ? 'animate-fade-up animate-delay-1' : 'opacity-0'}`}>
          <Col lg={6} className="mb-3">
            <div className="position-relative">
              <Form.Control
                type="text"
                placeholder="Search articles..."
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
          <Col lg={6}>
            <Form.Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>

        {/* Featured Post */}
        {filteredPosts.length > 0 && (
          <Row className={`mb-5 ${isVisible ? 'animate-fade-up animate-delay-2' : 'opacity-0'}`}>
            <Col>
              <Card className="border-0 shadow-sm hover-lift">
                <Row className="g-0">
                  <Col md={6}>
                    <Card.Img 
                      src={filteredPosts[0].image} 
                      className="h-100"
                      style={{ objectFit: 'cover' }}
                    />
                  </Col>
                  <Col md={6}>
                    <Card.Body className="p-4 h-100 d-flex flex-column">
                      <div>
                        <Badge 
                          className="mb-2"
                          style={{ 
                            backgroundColor: 'var(--brand-accent-pink)',
                            color: 'var(--brand-primary-dark)'
                          }}
                        >
                          Featured
                        </Badge>
                        <Card.Title className="h3 mb-3">{filteredPosts[0].title}</Card.Title>
                        <Card.Text className="text-muted mb-3">
                          {filteredPosts[0].excerpt}
                        </Card.Text>
                      </div>
                      <div className="mt-auto">
                        <div className="d-flex align-items-center text-muted small mb-3">
                          <User size={16} className="me-2" />
                          <span className="me-3">{filteredPosts[0].author}</span>
                          <Calendar size={16} className="me-2" />
                          <span className="me-3">{new Date(filteredPosts[0].date).toLocaleDateString()}</span>
                          <span>{filteredPosts[0].readTime}</span>
                        </div>
                        <Button className="btn-accent-red">
                          Read More <ArrowRight size={16} className="ms-2" />
                        </Button>
                      </div>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        )}

        {/* Blog Grid */}
        <Row>
          {filteredPosts.slice(1).map((post, index) => (
            <Col lg={4} md={6} className={`mb-4 ${isVisible ? `animate-fade-up animate-delay-${(index % 3) + 3}` : 'opacity-0'}`} key={post.id}>
              <Card className="border-0 shadow-sm h-100 hover-lift">
                <Card.Img 
                  variant="top" 
                  src={post.image}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.Body className="d-flex flex-column">
                  <div>
                    <Badge 
                      className="mb-2"
                      style={{ 
                        backgroundColor: 'var(--brand-surface-alt)',
                        color: 'var(--brand-primary-dark)'
                      }}
                    >
                      {post.category}
                    </Badge>
                    <Card.Title className="h5 mb-2">{post.title}</Card.Title>
                    <Card.Text className="text-muted small mb-3">
                      {post.excerpt}
                    </Card.Text>
                  </div>
                  <div className="mt-auto">
                    <div className="d-flex align-items-center text-muted small mb-3">
                      <User size={14} className="me-1" />
                      <span className="me-3">{post.author}</span>
                      <Calendar size={14} className="me-1" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <Button variant="outline-dark" size="sm">
                      Read More <ArrowRight size={14} className="ms-1" />
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {filteredPosts.length === 0 && (
          <Row className="text-center py-5">
            <Col>
              <p className="text-muted">No articles found matching your criteria.</p>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default Blog;