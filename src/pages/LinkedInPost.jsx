import React, { useState } from "react";

export default function LinkedInPost() {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    type: "",
    date: "",
    location: "",
    organizer: "",
    website: "",
    prizes: "",
  });

  const [generatedPost, setGeneratedPost] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generatePost = async () => {
    if (!eventData.title || !eventData.description) {
      alert("Please fill in at least the title and description!");
      return;
    }

    setIsGenerating(true);
    // Simulate async post generation
    setTimeout(() => {
      setGeneratedPost(
        `🚀 Excited to announce: ${eventData.title}\n\n${eventData.description}\n\nType: ${eventData.type}\nDate: ${eventData.date}\nLocation: ${eventData.location}\nOrganizer: ${eventData.organizer}\nWebsite: ${eventData.website}\nPrizes: ${eventData.prizes}`
      );
      setIsGenerating(false);
    }, 1000);
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Generate LinkedIn Post for Your Event</h2>
      <form className="card p-4 shadow-sm mb-4" onSubmit={e => { e.preventDefault(); generatePost(); }}>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Title</label>
            <input type="text" className="form-control" name="title" value={eventData.title} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Type</label>
            <input type="text" className="form-control" name="type" value={eventData.type} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Date</label>
            <input type="date" className="form-control" name="date" value={eventData.date} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Location</label>
            <input type="text" className="form-control" name="location" value={eventData.location} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Organizer</label>
            <input type="text" className="form-control" name="organizer" value={eventData.organizer} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Website</label>
            <input type="url" className="form-control" name="website" value={eventData.website} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Prizes</label>
            <input type="text" className="form-control" name="prizes" value={eventData.prizes} onChange={handleChange} />
          </div>
          <div className="col-12">
            <label className="form-label">Description</label>
            <textarea className="form-control" name="description" value={eventData.description} onChange={handleChange} rows={3} required />
          </div>
        </div>
        <div className="mt-4 text-end">
          <button type="submit" className="btn btn-primary px-4" disabled={isGenerating}>
            {isGenerating ? "Generating..." : "Generate Post"}
          </button>
        </div>
      </form>
      {generatedPost && (
        <div className="alert alert-success mt-4" style={{ whiteSpace: 'pre-line' }}>
          {generatedPost}
        </div>
      )}
    </div>
  );
}
