package com.gestion.associations.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Facture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long factureId;
    private Long annualId;
    private Long quantity;
    private Long index_prev;
    private Long index_prev_prev;
    private String estimation;
    private Date date;



    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "association_id", nullable = false)
    private Association association;

    @Override
    public int hashCode() {
        return Objects.hash(factureId,annualId,quantity,index_prev,index_prev_prev,estimation,date);
    }
}
