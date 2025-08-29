import React, { useState } from "react";

export default function AddEvent() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "Hackathon",
    mode: "Online",
    date: "",
    location: "",
    organizer: "",
    website: "",
    prizes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Event data:", formData);
    alert("Event added successfully! (This is a demo - no actual data is saved)");
    setFormData({
      title: "",
      description: "",
      type: "Hackathon",
      mode: "Online",
      date: "",
      location: "",
      organizer: "",
      website: "",
      prizes: "",
    });
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Add New Event</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Title</label>
            <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Type</label>
            <select className="form-select" name="type" value={formData.type} onChange={handleChange}>
              <option>Hackathon</option>
              <option>Internship</option>
              <option>Festival</option>
              <option>Workshop</option>
              <option>Competition</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Mode</label>
            <select className="form-select" name="mode" value={formData.mode} onChange={handleChange}>
              <option>Online</option>
              <option>Offline</option>
              <option>Hybrid</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Date</label>
            <input type="date" className="form-control" name="date" value={formData.date} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Location</label>
            <input type="text" className="form-control" name="location" value={formData.location} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Organizer</label>
            <input type="text" className="form-control" name="organizer" value={formData.organizer} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Website</label>
            <input type="url" className="form-control" name="website" value={formData.website} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Prizes</label>
            <input type="text" className="form-control" name="prizes" value={formData.prizes} onChange={handleChange} />
          </div>
          <div className="col-12">
            <label className="form-label">Description</label>
            <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} rows={3} required />
          </div>
        </div>
        <div className="mt-4 text-end">
          <button type="submit" className="btn btn-primary px-4">Add Event</button>
        </div>
      </form>
    </div>
  );
}
