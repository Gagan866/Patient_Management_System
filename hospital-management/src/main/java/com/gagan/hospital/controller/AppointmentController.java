package com.gagan.hospital.controller;

import com.gagan.hospital.model.Appointment;
import com.gagan.hospital.model.Doctor;
import com.gagan.hospital.model.Patient;
import com.gagan.hospital.repository.AppointmentRepository;
import com.gagan.hospital.repository.DoctorRepository;
import com.gagan.hospital.repository.PatientRepository;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {

    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;

    public AppointmentController(
            AppointmentRepository appointmentRepository,
            PatientRepository patientRepository,
            DoctorRepository doctorRepository
    ) {
        this.appointmentRepository = appointmentRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
    }

    @PostMapping
    public ResponseEntity<?> bookAppointment(@RequestBody AppointmentRequest request) {
        Patient patient = patientRepository.findById(request.patientId()).orElse(null);
        if (patient == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse("Patient not found"));
        }

        Doctor doctor = doctorRepository.findById(request.doctorId()).orElse(null);
        if (doctor == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse("Doctor not found"));
        }

        boolean isAlreadyBooked = appointmentRepository.existsByDoctorIdAndAppointmentDateAndAppointmentTime(
                request.doctorId(),
                request.appointmentDate(),
                request.appointmentTime()
        );
        if (isAlreadyBooked) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new ErrorResponse("Doctor already booked at this time"));
        }

        Appointment appointment = new Appointment();
        appointment.setPatient(patient);
        appointment.setDoctor(doctor);
        appointment.setAppointmentDate(request.appointmentDate());
        appointment.setAppointmentTime(request.appointmentTime());
        appointment.setStatus("Scheduled");

        Appointment savedAppointment = appointmentRepository.save(appointment);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedAppointment);
    }

    @GetMapping
    public ResponseEntity<List<Appointment>> getAllAppointments() {
        return ResponseEntity.ok(appointmentRepository.findAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateAppointment(@PathVariable Long id, @RequestBody AppointmentRequest request) {
        Optional<Appointment> optionalAppointment = appointmentRepository.findById(id);
        if (optionalAppointment.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse("Appointment not found"));
        }

        Patient patient = patientRepository.findById(request.patientId()).orElse(null);
        if (patient == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse("Patient not found"));
        }

        Doctor doctor = doctorRepository.findById(request.doctorId()).orElse(null);
        if (doctor == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse("Doctor not found"));
        }

        boolean isAlreadyBooked = appointmentRepository.existsByDoctorIdAndAppointmentDateAndAppointmentTimeAndIdNot(
                request.doctorId(),
                request.appointmentDate(),
                request.appointmentTime(),
                id
        );
        if (isAlreadyBooked) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new ErrorResponse("Doctor already booked at this time"));
        }

        Appointment appointment = optionalAppointment.get();
        appointment.setPatient(patient);
        appointment.setDoctor(doctor);
        appointment.setAppointmentDate(request.appointmentDate());
        appointment.setAppointmentTime(request.appointmentTime());
        appointment.setStatus(request.status() == null || request.status().isBlank() ? appointment.getStatus() : request.status());

        Appointment savedAppointment = appointmentRepository.save(appointment);
        return ResponseEntity.ok(savedAppointment);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAppointment(@PathVariable Long id) {
        if (!appointmentRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse("Appointment not found"));
        }

        appointmentRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    public record AppointmentRequest(
            Long patientId,
            Long doctorId,
            LocalDate appointmentDate,
            LocalTime appointmentTime,
            String status
    ) {
    }

    public record ErrorResponse(String message) {
    }
}
