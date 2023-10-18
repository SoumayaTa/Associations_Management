package com.gestion.associations.Repository;

import com.gestion.associations.Entity.Centre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CenterRepository extends JpaRepository<Centre,Long> {
}
