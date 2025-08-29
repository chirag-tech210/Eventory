import { useState, useEffect } from "react";
import { Search, Filter, Calendar, MapPin, Users, Award } from "lucide-react";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedMode, setSelectedMode] = useState("all");

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/events');
        const data = await response.json();
        
        if (response.ok) {
          setEvents(data.events || data);
          setFilteredEvents(data.events || data);
        } else {
          setError(data.message || 'Failed to fetch events');
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        setError('Network error. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filter events based on search and filters
  useEffect(() => {
    let filtered = events;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.domain.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by type
    if (selectedType !== "all") {
      filtered = filtered.filter(event => event.type === selectedType);
    }

    // Filter by mode
    if (selectedMode !== "all") {
      filtered = filtered.filter(event => event.mode === selectedMode);
    }

    setFilteredEvents(filtered);
  }, [events, searchTerm, selectedType, selectedMode]);

  const stats = [
    { label: "Total Events", value: events.length, icon: Calendar },
    { label: "Active Events", value: events.filter(e => e.isActive).length, icon: Award },
    { label: "Event Types", value: new Set(events.map(e => e.type)).size, icon: Filter },
  ];

  const categories = [
    { name: "Hackathon", count: events.filter(e => e.type === "hackathon").length },
    { name: "Internship", count: events.filter(e => e.type === "internship").length },
    { name: "Tech Fest", count: events.filter(e => e.type === "fest").length },
    { name: "Workshop", count: events.filter(e => e.type === "workshop").length },
    { name: "Competition", count: events.filter(e => e.type === "competition").length },
  ];

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading events...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100">
      {/* Hero Section */}
      <section className="py-5" style={{
        background: "linear-gradient(135deg, rgba(139, 69, 19, 0.1) 0%, rgba(47, 24, 16, 0.1) 100%)",
        backgroundImage: "url('https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=1200&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay"
      }}>
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <h1 className="display-4 fw-bold text-white mb-3">
                Event Portal - Demo
              </h1>
              <p className="lead text-white-75 mb-4">
                A demo event portal showcasing sample events and features. Currently in development.
              </p>
              <span className="badge bg-warning text-dark px-3 py-2 mb-4">
                Under Development
              </span>
              
              {/* Search Bar */}
              <div className="row justify-content-center">
                <div className="col-md-8">
                  <div className="input-group input-group-lg shadow">
                    <span className="input-group-text bg-white border-end-0">
                      <Search size={20} />
                    </span>
                    <input
                      type="text"
                      className="form-control border-start-0"
                      placeholder="Search demo events..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{ border: "none" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-4 bg-white border-bottom">
        <div className="container">
          <div className="row g-4">
            {stats.map((stat, index) => (
              <div key={index} className="col-md-4 text-center">
                <div className="d-flex align-items-center justify-content-center mb-2">
                  <stat.icon size={24} className="text-warning me-2" />
                  <h3 className="fw-bold mb-0">{stat.value}</h3>
                </div>
                <p className="text-muted mb-0">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-5">
        <div className="container">
          <div className="row">
            {/* Filter Sidebar */}
            <div className={`col-lg-3 ${showFilters ? 'd-block' : 'd-none d-lg-block'}`}>
              <div className="card bg-white border shadow-sm p-4 sticky-top" style={{top: '5rem', zIndex: 1000}}>
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <h3 className="h5 fw-bold text-dark mb-0">
                    Filters
                  </h3>
                  <button
                    className="btn btn-sm btn-outline-secondary d-lg-none"
                    onClick={() => setShowFilters(false)}
                  >
                    ×
                  </button>
                </div>

                {/* Event Type Filter */}
                <div className="mb-4">
                  <h6 className="fw-semibold mb-3">Event Type</h6>
                  <div className="d-flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category.name}
                        className={`btn btn-sm ${
                          selectedType === category.name.toLowerCase().replace(' ', '') 
                            ? 'btn-warning' 
                            : 'btn-outline-secondary'
                        }`}
                        onClick={() => setSelectedType(
                          selectedType === category.name.toLowerCase().replace(' ', '') 
                            ? 'all' 
                            : category.name.toLowerCase().replace(' ', '')
                        )}
                      >
                        {category.name} ({category.count})
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mode Filter */}
                <div className="mb-4">
                  <h6 className="fw-semibold mb-3">Mode</h6>
                  <div className="d-flex flex-column gap-2">
                    {['all', 'online', 'offline', 'hybrid'].map((mode) => (
                      <button
                        key={mode}
                        className={`btn btn-sm text-start ${
                          selectedMode === mode ? 'btn-warning' : 'btn-outline-secondary'
                        }`}
                        onClick={() => setSelectedMode(mode)}
                      >
                        {mode.charAt(0).toUpperCase() + mode.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                {(selectedType !== 'all' || selectedMode !== 'all' || searchTerm) && (
                  <button
                    className="btn btn-outline-danger btn-sm w-100"
                    onClick={() => {
                      setSelectedType('all');
                      setSelectedMode('all');
                      setSearchTerm('');
                    }}
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            </div>

            {/* Events Grid */}
            <div className="col-lg-9">
              {/* Mobile Filter Toggle */}
              <div className="d-lg-none mb-4">
                <button
                  className="btn btn-outline-primary w-100"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter size={16} className="me-2" />
                  {showFilters ? 'Hide' : 'Show'} Filters
                </button>
              </div>

              {/* Results Header */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0">
                  {filteredEvents.length} Demo Events Found
                  <small className="text-muted ms-2">(Demo Data)</small>
                </h4>
              </div>

              {/* Events */}
              {filteredEvents.length > 0 ? (
                <div className="row g-4">
                  {filteredEvents.map((event) => (
                    <div key={event._id} className="col-md-6 col-lg-4">
                      <div className="card h-100 shadow-sm">
                        <img
                          src={event.image}
                          className="card-img-top"
                          alt={event.title}
                          style={{ height: 200, objectFit: "cover" }}
                        />
                        <div className="card-body">
                          <h5 className="card-title fw-bold">{event.title}</h5>
                          <p className="card-text text-muted">
                            {event.description.substring(0, 100)}...
                          </p>
                          
                          <div className="mb-3">
                            <span className="badge bg-warning text-dark me-2">
                              {event.type}
                            </span>
                            <span className="badge bg-secondary">
                              {event.mode}
                            </span>
                          </div>
                          
                          <div className="row text-muted small mb-3">
                            <div className="col-6">
                              <Calendar size={14} className="me-1" />
                              {event.date}
                            </div>
                            <div className="col-6">
                              <MapPin size={14} className="me-1" />
                              {event.location}
                            </div>
                          </div>
                          
                          <div className="d-flex justify-content-between align-items-center">
                            <small className="text-muted">
                              <Users size={14} className="me-1" />
                              {event.participants} participants
                            </small>
                            <span className="badge bg-success">
                              {event.prize}
                            </span>
                          </div>
                        </div>
                        <div className="card-footer bg-transparent">
                          <a href={`/events/${event._id}`} className="btn btn-outline-primary btn-sm">
                            View Details
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-5">
                  <Search size={48} className="text-muted mb-3" />
                  <h4>No demo events found</h4>
                  <p className="text-muted">
                    Try adjusting your search criteria or check back later.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
