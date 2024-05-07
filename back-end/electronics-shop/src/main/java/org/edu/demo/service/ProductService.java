package org.edu.demo.service;

import org.edu.demo.model.Product;

import java.util.List;

public interface ProductService {

    Product persist(Product product);

    List<Product> retrieve();

    public Product softDelete(Integer id);

    public Product retrieve(Integer id);
}
