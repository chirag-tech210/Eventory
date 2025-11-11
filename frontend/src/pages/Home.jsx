import React from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Users,
  Trophy,
  Code,
  Briefcase,
  GraduationCap,
  ArrowRight,
  Star,
  Clock,
  Search,
  TrendingUp,
  Zap,
  Award,
  Building
} from "lucide-react";

// Event categories data
const eventCategories = [
  {
    id: 1,
    name: "Hackathons",
    icon: Code,
    count: "50+",
    color: "text-primary bg-light",
    description: "Build, innovate, win"
  },
  {
    id: 2,
    name: "Internships",
    icon: Briefcase,
    count: "200+",
    color: "text-success bg-light",
    description: "Jumpstart your career"
  },
  {
    id: 3,
    name: "Tech Fests",
    icon: Trophy,
    count: "30+",
    color: "text-info bg-light",
    description: "Showcase your skills"
  },
  {
    id: 4,
    name: "Coding Contests",
    icon: Code,
    count: "100+",
    color: "text-warning bg-light",
    description: "Compete & grow"
  },
  {
    id: 5,
    name: "Workshops",
    icon: GraduationCap,
    count: "75+",
    color: "text-danger bg-light",
    description: "Learn from experts"
  },
  {
    id: 6,
    name: "Networking",
    icon: Users,
    count: "25+",
    color: "text-secondary bg-light",
    description: "Connect & collaborate"
  }
];

// Trending events data
const trendingEvents = [
  {
    id: 1,
    title: "CodeJam 2025",
    type: "Hackathon",
    date: "March 15-17, 2025",
    location: "Online",
    participants: "500+",
    prize: "$10,000",
    image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=200&fit=crop",
    organizer: "CodeJam Org"
  },
  {
    id: 2,
    title: "Google Summer Internship",
    type: "Internship",
    date: "Applications Open",
    location: "Mountain View, CA",
    participants: "1000+",
    prize: "Competitive Salary",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop",
    organizer: "Google"
  },
  {
    id: 3,
    title: "TechFest 2025",
    type: "Festival",
    date: "April 5-7, 2025",
    location: "IIT Delhi",
    participants: "2000+",
    prize: "Multiple Prizes",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop",
    organizer: "IIT Delhi"
  }
];

export default function Home() {
  return (
    <div className="bg-light min-vh-100 font-sans">
      {/* Sticky Navbar - removed, use global Navbar instead */}

      {/* Hero Section */}
      <section 
        className="hero-section position-relative py-5 border-bottom shadow-sm d-flex align-items-center"
        style={{
          minHeight: 380,
          background: `url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80') center/cover no-repeat`,
        }}
      >
        <div className="container position-relative z-2 text-center" style={{ maxWidth: 800 }}>
          <div style={{
            background: 'rgba(0,0,0,0.55)',
            borderRadius: 24,
            padding: '2.5rem 1.5rem',
            boxShadow: '0 8px 32px rgba(0,0,0,0.18)'
          }}>
            <h1 className="display-5 fw-bold text-white mb-3">Find &amp; Participate in the Best Campus Events</h1>
            <p className="lead text-light mb-4 mx-auto" style={{ maxWidth: 600 }}>Discover hackathons, internships, tech fests, and coding challenges from top colleges and companies. Get personalized recommendations and never miss an opportunity!</p>
            <div className="d-flex flex-wrap gap-2 justify-content-center mb-3 align-items-center">
              <span className="text-light small fw-medium">Trending:</span>
              <span className="badge bg-primary bg-opacity-10 text-primary">AI Hackathon</span>
              <span className="badge bg-success bg-opacity-10 text-success">Summer Internship</span>
              <span className="badge bg-info bg-opacity-10 text-info">Tech Fest</span>
              <span className="badge bg-warning bg-opacity-10 text-warning">Coding Contest</span>
            </div>
            <Link to="/events" className="btn btn-lg btn-primary px-5 py-3 fw-semibold mb-3">
              Explore Events <ArrowRight className="ms-2" size={20} />
            </Link>
          </div>
        </div>
        {/* Overlay for darkening the background image */}
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'rgba(0,0,0,0.45)', zIndex: 1 }}></div>
      </section>

      {/* Action Buttons Section */}
      <section className="bg-light py-4 border-bottom">
        <div className="container d-flex flex-wrap justify-content-center gap-3">
          <Link to="/add-event" className="btn btn-outline-primary btn-lg px-4 fw-bold shadow-sm">
            + Add Event
          </Link>
          <Link to="/linkedin-post" className="btn btn-outline-secondary btn-lg px-4 fw-bold shadow-sm">
            Generate Post
          </Link>
        </div>
      </section>

      {/* Horizontal Category Nav */}
      <section className="py-3 bg-light border-bottom">
        <div className="container overflow-auto">
          <div className="d-flex gap-3 flex-nowrap">
            {eventCategories.map((category) => (
              <Link
                key={category.id}
                to={`/events?category=${category.name.toLowerCase()}`}
                className={`d-flex align-items-center gap-2 px-4 py-2 rounded-pill border bg-white shadow-sm text-decoration-none ${category.color}`}
                style={{ minWidth: 150 }}
              >
                <category.icon size={18} />
                {category.name}
                <span className="small fw-semibold ms-1">({category.count})</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Opportunities */}
      <section className="py-5 bg-white border-bottom">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
            <div>
              <h2 className="h3 fw-bold text-dark mb-1">Trending Opportunities</h2>
              <p className="text-secondary mb-0">Don't miss out on these amazing events</p>
            </div>
            <Link to="/events" className="text-primary fw-medium d-flex align-items-center text-decoration-none">
              View All <ArrowRight className="ms-1" size={16} />
            </Link>
          </div>
          <div className="row g-4">
            {trendingEvents.map((event) => (
              <div key={event.id} className="col-12 col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm">
                  <div className="position-relative" style={{ height: 200, overflow: 'hidden' }}>
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-100 h-100 object-fit-cover"
                      style={{ transition: 'transform 0.3s', objectFit: 'cover' }}
                    />
                    <span className="badge bg-primary position-absolute top-0 start-0 m-2">{event.type}</span>
                    <span className="badge bg-success position-absolute top-0 end-0 m-2">Trending</span>
                  </div>
                  <div className="card-body d-flex flex-column">
                    <h3 className="h5 fw-bold text-dark mb-2">{event.title}</h3>
                    <div className="d-flex align-items-center gap-2 text-secondary small mb-2">
                      <Building size={16} />
                      {event.organizer}
                    </div>
                    <div className="d-flex flex-wrap gap-3 text-secondary small mb-3">
                      <span className="d-flex align-items-center gap-1"><Calendar size={15} className="me-1" />{event.date}</span>
                      <span className="d-flex align-items-center gap-1"><MapPin size={15} className="me-1" />{event.location}</span>
                      <span className="d-flex align-items-center gap-1"><Users size={15} className="me-1" />{event.participants} participants</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-auto">
                      <span className="fw-semibold text-success">{event.prize}</span>
                      <Link to={`/events/${event.id}`} className="btn btn-sm btn-primary d-flex align-items-center">
                        View Details <ArrowRight className="ms-2" size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended for You (placeholder) */}
      <section className="py-5 bg-light border-bottom">
        <div className="container">
          <h2 className="h3 fw-bold text-dark mb-4">Recommended for You</h2>
          <div className="d-flex align-items-center justify-content-center text-secondary fst-italic py-5 border border-2 border-dashed rounded bg-white shadow-sm">
            <div className="text-center">
              <div className="display-4 mb-2">🔐</div>
              <div className="h5 fw-medium mb-1">Sign in to get personalized event recommendations!</div>
              <div className="small">We'll show you events based on your interests and skills</div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore by Category */}
      <section className="py-5 bg-white border-bottom">
        <div className="container">
          <h2 className="h3 fw-bold text-dark mb-4 text-center">Explore by Category</h2>
          <div className="row g-3">
            {eventCategories.map((category) => (
              <div key={category.id} className="col-6 col-md-4 col-lg-2">
                <Link
                  to={`/events?category=${category.name.toLowerCase()}`}
                  className={`card p-3 text-center text-decoration-none ${category.color}`}
                >
                  <div className="mb-2 d-flex justify-content-center">
                    <category.icon size={28} />
                  </div>
                  <div className="fw-bold">{category.name}</div>
                  <div className="small text-muted">{category.description}</div>
                  <div className="badge bg-secondary mt-2">{category.count}</div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-dark text-light py-5">
        <div className="container">
          <div className="row g-4">
            {/* Company Info */}
            <div className="col-lg-4 col-md-6">
              <div className="mb-4">
                <h3 className="h4 fw-bold mb-3" style={{ 
                  fontFamily: "'Montserrat', sans-serif",
                  color: '#fff',
                  letterSpacing: '1px'
                }}>
                  Eventory
                </h3>
                <p className="text-light-emphasis mb-3">
                  Your ultimate platform for discovering and participating in the best campus events, 
                  hackathons, internships, and tech opportunities. Connect, learn, and grow with 
                  students worldwide.
                </p>
                <div className="d-flex gap-3">
                  <a href="#" className="text-light-emphasis text-decoration-none">
                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-light-emphasis text-decoration-none">
                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-light-emphasis text-decoration-none">
                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-light-emphasis text-decoration-none">
                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-lg-2 col-md-6">
              <h5 className="fw-bold mb-3">Quick Links</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <Link to="/events" className="text-light-emphasis text-decoration-none">Browse Events</Link>
                </li>
                <li className="mb-2">
                  <Link to="/add-event" className="text-light-emphasis text-decoration-none">Add Event</Link>
                </li>
                <li className="mb-2">
                  <Link to="/linkedin-post" className="text-light-emphasis text-decoration-none">Generate Post</Link>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-light-emphasis text-decoration-none">About Us</a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-light-emphasis text-decoration-none">Contact</a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-light-emphasis text-decoration-none">Help Center</a>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div className="col-lg-2 col-md-6">
              <h5 className="fw-bold mb-3">Categories</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <Link to="/events?category=hackathon" className="text-light-emphasis text-decoration-none">Hackathons</Link>
                </li>
                <li className="mb-2">
                  <Link to="/events?category=internship" className="text-light-emphasis text-decoration-none">Internships</Link>
                </li>
                <li className="mb-2">
                  <Link to="/events?category=workshop" className="text-light-emphasis text-decoration-none">Workshops</Link>
                </li>
                <li className="mb-2">
                  <Link to="/events?category=competition" className="text-light-emphasis text-decoration-none">Competitions</Link>
                </li>
                <li className="mb-2">
                  <Link to="/events?category=conference" className="text-light-emphasis text-decoration-none">Conferences</Link>
                </li>
                <li className="mb-2">
                  <Link to="/events?category=webinar" className="text-light-emphasis text-decoration-none">Webinars</Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="col-lg-4 col-md-6">
              <h5 className="fw-bold mb-3">Get in Touch</h5>
              <div className="mb-3">
                <div className="d-flex align-items-center mb-2">
                  <svg width="16" height="16" fill="currentColor" className="me-2" viewBox="0 0 16 16">
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                  </svg>
                  <span className="text-light-emphasis">123 Campus Drive, Tech City, TC 12345</span>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <svg width="16" height="16" fill="currentColor" className="me-2" viewBox="0 0 16 16">
                    <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
                  </svg>
                  <span className="text-light-emphasis">+1 (555) 123-4567</span>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <svg width="16" height="16" fill="currentColor" className="me-2" viewBox="0 0 16 16">
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                  </svg>
                  <span className="text-light-emphasis">hello@eventory.com</span>
                </div>
              </div>
              
              {/* Newsletter Signup */}
              <div className="mt-4">
                <h6 className="fw-bold mb-2">Stay Updated</h6>
                <p className="text-light-emphasis small mb-3">Get the latest events and opportunities delivered to your inbox.</p>
                <div className="input-group">
                  <input 
                    type="email" 
                    className="form-control" 
                    placeholder="Enter your email"
                    style={{ backgroundColor: '#2a2a2a', border: '1px solid #444', color: '#fff' }}
                  />
                  <button className="btn btn-primary" type="button">Subscribe</button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-top border-secondary mt-5 pt-4">
            <div className="row align-items-center">
              <div className="col-md-6">
                <p className="text-light-emphasis mb-0 small">
                  © 2025 Eventory. All rights reserved. | 
                  <a href="#" className="text-light-emphasis text-decoration-none ms-1">Privacy Policy</a> | 
                  <a href="#" className="text-light-emphasis text-decoration-none ms-1">Terms of Service</a>
                </p>
              </div>
              <div className="col-md-6 text-md-end">
                <p className="text-light-emphasis mb-0 small">
                  Made with ❤️ for students worldwide
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}