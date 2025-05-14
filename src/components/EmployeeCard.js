import { useState } from "react";
import api from "../api";

const statusOptions = [
  { label: "👨‍💻 Working", value: "Working" },
  { label: "🌴 OnVacation", value: "OnVacation" },
  { label: "☕ LunchTime", value: "LunchTime" },
  { label: "💼 BusinessTrip", value: "BusinessTrip" },
];

const EmployeeCard = ({ employee, onDelete }) => {
  const [status, setStatus] = useState(employee.status);

  const handleChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    try {
      await api.patch(`/employees/${employee.id}/status`, { status: newStatus });
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/employees/${employee.id}`);
      onDelete(employee.id);
    } catch (err) {
      console.error("Error deleting employee:", err);
    }
  };

  return (
    <div
      className="card mb-4 shadow-sm border-1 employee-card position-relative"
      style={{
        transition: "all 0.3s ease",
        minHeight: "160px",
        padding: "1rem",
      }}
    >
      <button
        className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2"
        onClick={handleDelete}
        title="Delete employee"
      >
        🗑️
      </button>

      <div className="d-flex align-items-center h-100">
        <img
          src={employee.image_url || "https://via.placeholder.com/100"}
          className="rounded-circle me-4"
          alt={employee.name}
          width={100}
          height={100}
        />
        <div className="flex-grow-1">
          <h5 className="mb-2">{employee.name}</h5>
          <select
            className="form-select form-select-sm w-auto"
            value={status}
            onChange={handleChange}
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
