function AppointmentTable({ appointments, loading, onEdit, onDelete }) {
  return (
    <section className="card-section">
      <h3>Appointments List</h3>

      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : appointments.length === 0 ? (
        <p className="empty-state">No data available</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Doctor Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.patient?.name || 'N/A'}</td>
                  <td>{appointment.doctor?.name || 'N/A'}</td>
                  <td>{appointment.appointmentDate}</td>
                  <td>{appointment.appointmentTime}</td>
                  <td>{appointment.status}</td>
                  <td>
                    <div className="button-group">
                      <button type="button" className="btn-primary btn-small" onClick={() => onEdit(appointment)}>
                        Edit
                      </button>
                      <button type="button" className="btn-danger btn-small" onClick={() => onDelete(appointment.id)}>
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

export default AppointmentTable
