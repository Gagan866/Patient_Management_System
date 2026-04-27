function AppointmentForm({ formData, patients, doctors, onChange, onSubmit, onCancel, editingId, message, error }) {
  return (
    <section className="card-section">
      <h3>{editingId ? 'Edit Appointment' : 'Book Appointment'}</h3>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}

      <form className="appointment-form" onSubmit={onSubmit}>
        <select name="patientId" value={formData.patientId} onChange={onChange} required>
          <option value="">Select Patient</option>
          {patients.map((patient) => (
            <option key={patient.id} value={patient.id}>
              {patient.name}
            </option>
          ))}
        </select>

        <select name="doctorId" value={formData.doctorId} onChange={onChange} required>
          <option value="">Select Doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.name} ({doctor.specialization})
            </option>
          ))}
        </select>

        <input type="date" name="appointmentDate" value={formData.appointmentDate} onChange={onChange} required />
        <input type="time" name="appointmentTime" value={formData.appointmentTime} onChange={onChange} required />

        <div className="button-group">
          <button type="submit" className="btn-primary">
            {editingId ? 'Update Appointment' : 'Book Appointment'}
          </button>
          {editingId && (
            <button type="button" className="btn-secondary" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  )
}

export default AppointmentForm
