package org.edu.demo.controller;

import org.edu.demo.model.Product;
import org.edu.demo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class ProductController {

    @Autowired
    ProductService productService;

    @PostMapping("/product")
    Product persist(@RequestBody Product product){
       return productService.persist(product);
    }

    @GetMapping("/product")
    List<Product> retrieve(){
        return productService.retrieve();
    }

    @DeleteMapping("/product/{id}")
    Product softDelete(@PathVariable Integer id){
        return productService.softDelete(id);
    }
    @GetMapping("/product/{id}")
    Product retrieve(@PathVariable Integer id){
        return productService.retrieve(id);
    }
}
