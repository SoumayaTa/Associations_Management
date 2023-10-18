package com.gestion.associations.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Centre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long centreId;
    private String name;
    private String code;

    @JsonIgnore
    @OneToMany(mappedBy = "centre", cascade = CascadeType.ALL)
    private Set<Association> associations = new HashSet<>();

    public void addAssociation(Association association){
        associations.add(association);
        association.setCentre(this) ;
    }

    public void removeAssociation(Association association){
        associations.remove(association);
        association.setCentre(null);
    }
    @Override
    public int hashCode() {
        return Objects.hash(centreId, name, code);
    }

}
