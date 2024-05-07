package org.edu.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data

public class Product {

    private Integer id;
    private String name;
    private String description;
    private Double price;
}
