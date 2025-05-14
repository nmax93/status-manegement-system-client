import { useState, useEffect } from 'react';
import EmployeeCard from './components/EmployeeCard';
import CreateEmployeeModal from './components/CreateEmployeeModal';
import api from './api';

function App() {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchEmployees = async () => {
    const res = await api.get('/employees');
    setEmployees(res.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);


  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Employee Status Dashboard</h2>
        <button className="btn btn-success" onClick={() => setShowModal(true)}>
          <i className="bi bi-plus-lg"></i> Create
        </button>
      </div>

      <div className="row">
        {employees.map((emp) => (
          <div className="col-md-4" key={emp.id}>
            <EmployeeCard
              employee={emp}
              onDelete={ id => setEmployees((prev) => prev.filter((e) => e.id !== id)) }
            />
          </div>
        ))}
      </div>

      {showModal && (
        <CreateEmployeeModal
          onClose={() => setShowModal(false)}
          onSave={(newEmp) => {
            setEmployees([...employees, newEmp]);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}

export default App;
