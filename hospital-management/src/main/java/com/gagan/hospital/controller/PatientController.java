package com.gagan.hospital.controller;

import com.gagan.hospital.model.Patient;
import com.gagan.hospital.repository.PatientRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/patients")
public class PatientController {

    private final PatientRepository patientRepository;

    public PatientController(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    @PostMapping
    public ResponseEntity<Patient> createPatient(@RequestBody Patient patient) {
        Patient savedPatient = patientRepository.save(patient);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedPatient);
    }

    @GetMapping
    public ResponseEntity<List<Patient>> getAllPatients() {
        return ResponseEntity.ok(patientRepository.findAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePatient(@PathVariable Long id, @RequestBody Patient patientRequest) {
        Optional<Patient> existingPatientOptional = patientRepository.findById(id);
        if (existingPatientOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse("Patient not found"));
        }

        Patient existingPatient = existingPatientOptional.get();
        existingPatient.setName(patientRequest.getName());
        existingPatient.setAge(patientRequest.getAge());
        existingPatient.setGender(patientRequest.getGender());
        existingPatient.setPhone(patientRequest.getPhone());
        existingPatient.setDisease(patientRequest.getDisease());

        Patient updatedPatient = patientRepository.save(existingPatient);
        return ResponseEntity.ok(updatedPatient);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePatient(@PathVariable Long id) {
        if (!patientRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse("Patient not found"));
        }

        patientRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    public record ErrorResponse(String message) {
    }
}
