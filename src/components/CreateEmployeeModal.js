import { useState } from "react";
import { uploadEmployee } from '../api';

const CreateEmployeeModal = ({ onClose, onSave }) => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  
  const statusOptions = [
    { label: "Select status...", value: "" },
    { label: "👨‍💻 Working", value: "Working" },
    { label: "🌴 OnVacation", value: "OnVacation" },
    { label: "☕ LunchTime", value: "LunchTime" },
    { label: "💼 BusinessTrip", value: "BusinessTrip" },
  ];

  const handleBackgroundClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      onClose();
    }
  };

  const handleSubmit = async () => {
    if (!name || !status || !image) {
      setError("All fields are required");
      return;
    }
    setError("");
    try {
      const createdEmployee = await uploadEmployee(image, name, status);
      onSave(createdEmployee);
    } catch (err) {
      console.error(err);
      setError("Image upload or employee creation failed");
    }
  };


  return (
    <div
      className="modal-overlay position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "rgba(0,0,0,0.6)", zIndex: 9999 }}
      onClick={handleBackgroundClick}
    >
      <div className="bg-white rounded p-4 shadow" style={{ width: 400 }}>
        <h5 className="mb-3">Create New Employee</h5>

        <div className="mb-3">
          <label className="form-label">Employee Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            className="form-select form-select-sm w-auto"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Upload Image</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        {error && <div className="alert alert-danger py-1">{error}</div>}

        <div className="d-flex justify-content-end gap-2 mt-3">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateEmployeeModal;
