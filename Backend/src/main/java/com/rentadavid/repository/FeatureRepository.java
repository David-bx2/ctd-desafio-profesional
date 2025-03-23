package com.rentadavid.repository;

import com.rentadavid.model.Feature;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeatureRepository extends JpaRepository<Feature, Long> {}

