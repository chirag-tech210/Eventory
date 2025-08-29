import { Link } from "react-router-dom";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Star, 
  Clock,
  ExternalLink,
  Bookmark,
  Trophy,
  Zap,
  Award,
  TrendingUp,
  Heart,
  Building,
  Globe
} from "lucide-react";

// Icon mapping for event types
const eventTypeIcons = {
  hackathon: Zap,
  internship: Award,
  festival: Star,
  workshop: TrendingUp,
  competition: Trophy
};

export default function EventCard({ event, viewMode = "grid" }) {
  const EventIcon = eventTypeIcons[event.type.toLowerCase()] || Star;

  if (viewMode === "list") {
    return (
      <div className="card mb-4 border-0 shadow-lg">
        <div className="row g-0">
          {/* Event Image */}
          <div className="col-md-4">
            <div className="position-relative h-100">
              <img
                src={event.image || "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=200&fit=crop"}
                alt={event.title}
                className="w-100 h-100 object-fit-cover"
                style={{objectFit: 'cover'}}
              />
              <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-25"></div>
              <div className="position-absolute top-0 start-0 m-3">
                <span className="badge bg-primary d-flex align-items-center gap-2">
                  <EventIcon className="h-4 w-4" />
                  {event.type}
                </span>
              </div>
            </div>
          </div>

          {/* Event Details */}
          <div className="col-md-8">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="flex-grow-1">
                  <h3 className="card-title h4 mb-2">{event.title}</h3>
                  <p className="card-text text-muted mb-3">
                    {event.description}
                  </p>
                  <div className="d-flex gap-4 text-muted small">
                    <span className="d-flex align-items-center gap-2">
                      <Building className="h-4 w-4 text-primary" />
                      {event.organizer}
                    </span>
                    <span className="d-flex align-items-center gap-2">
                      <Globe className="h-4 w-4 text-info" />
                      {event.domain}
                    </span>
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <button className="btn btn-outline-secondary btn-sm">
                    <Heart className="h-4 w-4" />
                  </button>
                  <button className="btn btn-outline-secondary btn-sm">
                    <Bookmark className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Event Meta */}
              <div className="row mb-3">
                <div className="col-6 col-md-3">
                  <div className="d-flex align-items-center text-muted small">
                    <Calendar className="h-4 w-4 me-2 text-primary" />
                    <span className="text-truncate">{event.date}</span>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="d-flex align-items-center text-muted small">
                    <MapPin className="h-4 w-4 me-2 text-success" />
                    <span className="text-truncate">{event.location}</span>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="d-flex align-items-center text-muted small">
                    <Users className="h-4 w-4 me-2 text-info" />
                    <span>{event.participants} participants</span>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="d-flex align-items-center text-success small fw-bold">
                    <Trophy className="h-4 w-4 me-2" />
                    <span>{event.prize}</span>
                  </div>
                </div>
              </div>

              {/* Tags and Actions */}
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                <div className="d-flex flex-wrap gap-2">
                  <span className="badge bg-primary">{event.type}</span>
                  <span className="badge bg-success">{event.mode}</span>
                  <span className="badge bg-info">{event.domain}</span>
                </div>
                <div className="d-flex gap-2">
                  <Link to={`/events/${event.id}`} className="btn btn-primary btn-sm">
                    View Details
                    <ExternalLink className="ms-2 h-4 w-4" />
                  </Link>
                  <button className="btn btn-outline-success btn-sm">Register</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid view (default)
  return (
    <div className="card h-100 border-0 shadow-lg">
      {/* Event Image */}
      <div className="position-relative">
        <img
          src={event.image || "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=200&fit=crop"}
          alt={event.title}
          className="card-img-top"
          style={{height: '200px', objectFit: 'cover'}}
        />
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-25"></div>
        
        {/* Event Type Badge */}
        <div className="position-absolute top-0 start-0 m-3">
          <span className="badge bg-primary d-flex align-items-center gap-2">
            <EventIcon className="h-4 w-4" />
            {event.type}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="position-absolute top-0 end-0 m-3 d-flex gap-2">
          <button className="btn btn-outline-light btn-sm">
            <Heart className="h-4 w-4" />
          </button>
          <button className="btn btn-outline-light btn-sm">
            <Bookmark className="h-4 w-4" />
          </button>
        </div>

        {/* Prize Badge */}
        <div className="position-absolute bottom-0 end-0 m-3">
          <span className="badge bg-success d-flex align-items-center gap-2">
            <Trophy className="h-4 w-4" />
            {event.prize}
          </span>
        </div>
      </div>

      {/* Event Content */}
      <div className="card-body d-flex flex-column">
        <h3 className="card-title h5 mb-2">{event.title}</h3>
        <p className="card-text text-muted mb-3 flex-grow-1">
          {event.description}
        </p>

        {/* Event Meta */}
        <div className="mb-3">
          <div className="d-flex align-items-center text-muted small mb-2">
            <Calendar className="h-4 w-4 me-2 text-primary" />
            {event.date}
          </div>
          <div className="d-flex align-items-center text-muted small mb-2">
            <MapPin className="h-4 w-4 me-2 text-success" />
            {event.location}
          </div>
          <div className="d-flex align-items-center text-muted small">
            <Users className="h-4 w-4 me-2 text-info" />
            {event.participants} participants
          </div>
        </div>

        {/* Organizer & Domain */}
        <div className="d-flex justify-content-between mb-3 text-muted small">
          <span className="d-flex align-items-center gap-2">
            <Building className="h-4 w-4" />
            {event.organizer}
          </span>
          <span className="d-flex align-items-center gap-2">
            <Globe className="h-4 w-4" />
            {event.domain}
          </span>
        </div>

        {/* Actions */}
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <div className="d-flex gap-2">
            <span className="badge bg-success">{event.mode}</span>
            <span className="badge bg-info">{event.domain}</span>
          </div>
          <Link to={`/events/${event.id}`} className="btn btn-primary btn-sm">
            View Details
            <ExternalLink className="ms-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}