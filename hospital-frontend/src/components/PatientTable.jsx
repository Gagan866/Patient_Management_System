function PatientTable({ patients, loading, onEdit, onDelete }) {
  return (
    <section className="card-section">
      <h3>Patients List</h3>

      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : patients.length === 0 ? (
        <p className="empty-state">No data available</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Phone</th>
                <th>Disease</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.name}</td>
                  <td>{patient.age}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.phone}</td>
                  <td>{patient.disease}</td>
                  <td>
                    <div className="button-group">
                      <button type="button" className="btn-primary btn-small" onClick={() => onEdit(patient)}>
                        Edit
                      </button>
                      <button type="button" className="btn-danger btn-small" onClick={() => onDelete(patient.id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default PatientTable
