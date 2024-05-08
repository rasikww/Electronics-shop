package org.edu.demo.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.edu.demo.entity.ProductEntity;
import org.edu.demo.model.Product;
import org.edu.demo.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService{

    @Autowired
    ProductRepository repository;

    @Autowired
    ObjectMapper mapper;

    public Product persist(Product product){

        ProductEntity productEntity = mapper.convertValue(product, ProductEntity.class);
        ProductEntity savedEntity = repository.save(productEntity);

        return mapper.convertValue(savedEntity,Product.class);
    }

    public List<Product> retrieve(){
        Iterable<ProductEntity> allProductEntities = repository.findAll();
        List<Product> products = new ArrayList<>();
        allProductEntities.forEach(productEntity -> {
            if(productEntity.isActive()){
                products.add(mapper.convertValue(productEntity, Product.class));
            }
        });
        return products;
    }
    public Product searchById(Integer id){
        return mapper.convertValue(repository.findById(id), Product.class) ;
    }
    public Product softDelete(Integer id){
        Optional<ProductEntity> optional = repository.findById(id);
        if (optional.isPresent()){
            ProductEntity productEntity = optional.get();
            productEntity.setActive(false);
            repository.save(productEntity);
            return mapper.convertValue(optional.get(), Product.class);
        }
        return null;
    }
    public Product retrieve(Integer id){
        return mapper.convertValue(repository.findById(id),Product.class);
    }

    public Product update(Integer id, Product product) {
        Optional<ProductEntity> optional = repository.findById(id);
        if (optional.isPresent()){
            ProductEntity productEntity = optional.get();
            if (!product.getName().isEmpty()) {
                productEntity.setName(product.getName());
            }
            if (!product.getDescription().isEmpty()) {
                productEntity.setDescription(product.getDescription());
            }
            if (product.getPrice() != null ) {
                productEntity.setPrice(product.getPrice());
            }
            productEntity.setActive(true);
            repository.save(productEntity);
            return mapper.convertValue(optional.get(), Product.class);
        }
        return null;
    }
}
