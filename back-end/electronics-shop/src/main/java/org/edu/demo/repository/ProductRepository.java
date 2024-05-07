package org.edu.demo.repository;

import org.edu.demo.entity.ProductEntity;
import org.springframework.data.repository.CrudRepository;

public interface ProductRepository extends CrudRepository<ProductEntity,Integer> {
}
