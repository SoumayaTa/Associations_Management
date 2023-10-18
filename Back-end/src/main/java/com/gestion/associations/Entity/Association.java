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
public class Association {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long associationId;
    private String name;
    private  String codeCDP;
    private Long index_prev;
    private Long index_prev_prev;



    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "centre_id", nullable = false)
    private Centre centre;



    @Override
    public int hashCode() {
        return Objects.hash(associationId, name, codeCDP, index_prev,index_prev_prev);
    }

    @JsonIgnore
    @OneToMany(mappedBy = "association", cascade = CascadeType.ALL)
    private Set<Facture> factures = new HashSet<>();
    public void addFacture(Facture facture){
        factures.add(facture);
        facture.setAssociation(this); ;
    }

    public void removeFacture(Facture facture){
        factures.remove(facture);
        facture.setAssociation(null);
    }
}
