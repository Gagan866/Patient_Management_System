function PatientForm({ formData, onChange, onSubmit, onCancel, editingId, errors, message }) {
  return (
    <section className="card-section">
      <h3>{editingId ? 'Edit Patient' : 'Add Patient'}</h3>

      {message && <p className="success-message">{message}</p>}

      <form className="patient-form" onSubmit={onSubmit}>
        <div className="form-grid">
          <div className="field-group">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" value={formData.name} onChange={onChange} placeholder="Name" required />
            {errors.name && <p className="field-error">{errors.name}</p>}
          </div>

          <div className="field-group">
            <label htmlFor="age">Age</label>
            <input id="age" name="age" type="number" min="1" value={formData.age} onChange={onChange} placeholder="Age" required />
            {errors.age && <p className="field-error">{errors.age}</p>}
          </div>

          <div className="field-group">
            <label htmlFor="gender">Gender</label>
            <select id="gender" name="gender" value={formData.gender} onChange={onChange} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <p className="field-error">{errors.gender}</p>}
          </div>

          <div className="field-group">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              maxLength={10}
              inputMode="numeric"
              value={formData.phone}
              onChange={onChange}
              placeholder="Phone"
              required
            />
            {errors.phone && <p className="field-error">{errors.phone}</p>}
          </div>

          <div className="field-group form-grid-full">
            <label htmlFor="disease">Disease</label>
            <input id="disease" name="disease" value={formData.disease} onChange={onChange} placeholder="Disease" required />
            {errors.disease && <p className="field-error">{errors.disease}</p>}
          </div>
        </div>

        <div className="button-group">
          <button type="submit" className="btn-primary">
            {editingId ? 'Update Patient' : 'Add Patient'}
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

export default PatientForm
