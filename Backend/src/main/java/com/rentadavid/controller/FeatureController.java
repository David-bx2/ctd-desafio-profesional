package com.rentadavid.controller;

import com.rentadavid.model.Feature;
import com.rentadavid.repository.FeatureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/features")
public class FeatureController {

    @Autowired
    private FeatureRepository featureRepository;

    @GetMapping
    public List<Feature> getAllFeatures() {
        return featureRepository.findAll();
    }

    @PostMapping
    public Feature addFeature(@RequestBody Feature feature) {
        return featureRepository.save(feature);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Feature> updateFeature(@PathVariable Long id, @RequestBody Feature updatedFeature) {
        Optional<Feature> optionalFeature = featureRepository.findById(id);
        if (optionalFeature.isEmpty()) return ResponseEntity.notFound().build();

        Feature feature = optionalFeature.get();
        feature.setName(updatedFeature.getName());
        feature.setIcon(updatedFeature.getIcon());

        return ResponseEntity.ok(featureRepository.save(feature));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFeature(@PathVariable Long id) {
        if (!featureRepository.existsById(id)) return ResponseEntity.notFound().build();
        featureRepository.deleteById(id);
        return ResponseEntity.ok("Eliminado correctamente");
    }
}

