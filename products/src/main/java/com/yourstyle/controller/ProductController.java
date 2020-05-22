package com.yourstyle.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.yourstyle.exceptions.ProductNotFoundException;
import com.yourstyle.model.Product;
import com.yourstyle.response.MessageResponse;
import com.yourstyle.service.ProductService;

@RestController
@CrossOrigin("*")
@RequestMapping("/products")
public class ProductController {

	@Autowired
	ProductService service;

	@GetMapping
	public ResponseEntity<List<Product>> getAllProducts() {
		List<Product> products = service.getAllProducts();

		return new ResponseEntity<>(products, new HttpHeaders(), HttpStatus.OK);
	}

	@GetMapping("/category/{category}")
	public ResponseEntity<List<Product>> getAllProductsByCategory(@PathVariable("category") String category)
			throws ProductNotFoundException {
		List<Product> products = service.getProductsByCategory(category);

		return new ResponseEntity<>(products, new HttpHeaders(), HttpStatus.OK);
	}

	@GetMapping("/product/{productName}")
	public ResponseEntity<Product> getProductByName(@PathVariable("productName") String productName)
			throws ProductNotFoundException {
		Product product = service.getProductByName(productName);

		return new ResponseEntity<>(product, new HttpHeaders(), HttpStatus.OK);
	}

	@PostMapping("/publishProduct")
	public ResponseEntity<?> saveProduct(@RequestBody Product product) {
		String message = service.saveProduct(product);
		return ResponseEntity.ok(new MessageResponse(message));
	}

	@PutMapping("/updateProduct/{productName}")
	public ResponseEntity<?> updateProduct(@PathVariable("productName") String productName,
			@RequestBody Product product) throws ProductNotFoundException {
		service.updateProduct(productName, product);
		return ResponseEntity.ok(new MessageResponse("product updated successfully!"));
	}

	@DeleteMapping("/deleteProduct/{productName}")
	public ResponseEntity<?> deleteProduct(@PathVariable("productName") String productName)
			throws ProductNotFoundException {
		service.deleteProductByName(productName);
		return ResponseEntity.ok(new MessageResponse("product deleted successfully!"));
	}
	
	

	
	
	
	
	


	
	@PostMapping("/upload")
	public String fileUpload(@RequestBody MultipartFile file) throws Exception {
		service.uploadFile(file);
		return "image upload success";
	}
	  
		/*
		 * @PostMapping("/upload") public String singleFileUpload(@RequestParam("file")
		 * MultipartFile multipart, @RequestParam("email") String email) { try { Product
		 * demoDocument = new Product(); demoDocument.setEmailId(email);
		 * demoDocument.setDocType("pictures"); demoDocument.setFile(new
		 * Binary(BsonBinarySubType.BINARY, multipart.getBytes()));
		 * mongoTemplate.insert(demoDocument); System.out.println(demoDocument); } catch
		 * (Exception e) { e.printStackTrace(); return "failure"; } return "success"; }
		 * 
		 * @GetMapping("/retrieve") public String retrieveFile(@RequestParam("email")
		 * String email) { Product demoDocument = mongoTemplate .findOne(new
		 * BasicQuery("{emailId : \"" + email + "\", docType : \"pictures\"}"),
		 * Product.class); System.out.println(demoDocument); Binary document =
		 * demoDocument.getFile(); if (document != null) { FileOutputStream
		 * fileOuputStream = null; try { fileOuputStream = new
		 * FileOutputStream("C:\\Users\\Jarvis\\Desktop\\Suhail" + "prof_pic.jpg");
		 * fileOuputStream.write(document.getData()); } catch (Exception e) {
		 * e.printStackTrace(); return "failure"; } finally { if (fileOuputStream !=
		 * null) { try { fileOuputStream.close(); } catch (IOException e) {
		 * e.printStackTrace(); return "failure"; } } } } return "success"; }
		 */
	 
	@GetMapping("/retreive/{filename}")
	public byte[] getFile(@PathVariable("filename") String fileName) throws IOException {
		byte[] file = service.retriveImageFile(fileName);
		return file;
	}

	
	@DeleteMapping("/delete/{filename}")
	public void deleteFile(@PathVariable("filename") String fileName) throws IOException {
		service.deleteImageFile(fileName);
	}
	 
}
