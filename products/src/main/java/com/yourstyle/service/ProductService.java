package com.yourstyle.service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.mongodb.client.gridfs.model.GridFSFile;
import com.yourstyle.exceptions.ProductNotFoundException;
import com.yourstyle.model.Product;
import com.yourstyle.repo.ProductRepository;

@Service
public class ProductService {

	@Autowired
	private ProductRepository repo;

	public List<Product> getAllProducts() {
		List<Product> Products = repo.findAll();
		return Products;
	}

	public Product getProductByName(String Productname) throws ProductNotFoundException {
		Optional<Product> Product = repo.findByProductName(Productname);
		if (Product.isPresent()) {
			return Product.get();
		} else {
			throw new ProductNotFoundException("No record Found for the Product : " + Productname);
		}
	}

	public List<Product> getProductsByCategory(String category) throws ProductNotFoundException {
		List<Product> Products = repo.findByCategory(category);
		if (!Products.isEmpty()) {
			return Products;
		} else {
			throw new ProductNotFoundException("No record Found for the Category : " + category);
		}
	}

	public String saveProduct(Product product) {
		if (repo.existsByProductName(product.getProductName())) {
			return "Product already Exist";
		}
		repo.save(product);
		return "product published successfully";
	}

	public void updateProduct(String Productname, Product Product) throws ProductNotFoundException {
		Optional<Product> ProductRecord = repo.findByProductName(Productname);
		if (ProductRecord.isPresent()) {
			Product.setId(ProductRecord.get().getId());
			repo.save(Product);
		} else {
			throw new ProductNotFoundException("No record Found for the Product : " + Product.getProductName());
		}
	}

	public void deleteProductByName(String Productname) throws ProductNotFoundException {
		Optional<Product> Product = repo.findByProductName(Productname);
		if (Product.isPresent()) {
			repo.delete(Product.get());
		} else {
			throw new ProductNotFoundException("No record Found for the Product : " + Productname);
		}
	}

	
	
	
	
	
	@Autowired
	private GridFsTemplate gridFsTemplate;

	/*
	 * public void saveImage(Product product) { repo.save(product); }
	 */

	
	public void uploadFile(MultipartFile file) throws Exception {
		DBObject dbObject = new BasicDBObject();
		dbObject.put("filename", file.getOriginalFilename());
		dbObject.put("contentType", file.getContentType());
		dbObject.put("size", file.getSize());
		ObjectId id = gridFsTemplate.store(file.getInputStream(), file.getOriginalFilename(), dbObject);
		System.out.println(id.toString());
	}
	 

	public byte[] retriveImageFile(String fileName) throws IOException {

		GridFSFile dbFile = gridFsTemplate.findOne(new Query(Criteria.where("filename").is(fileName)));
		GridFsResource res = gridFsTemplate.getResource(dbFile);
		//res.getInputStream().available();

		byte[] buffer = new byte[1024];
		
		int len;
		InputStream in = res.getInputStream();
		ByteArrayOutputStream buffers = new ByteArrayOutputStream();
		
		//byte[] buffer = new byte[file.getInputStream().available()];
		//File files = new File("C:\\Users\\Jarvis\\Desktop\\Suhail\\image\\" + file.getOriginalFilename());
		//FileOutputStream streamToDownloadTo = new FileOutputStream("C:\\Users\\Jarvis\\Desktop\\Suhail\\image\\image8.jpg");
		while ((len = in.read(buffer)) != -1) {
			buffers.write(buffer, 0, len);
			
		}
		
		byte[] bytesss = buffers.toByteArray();
		//streamToDownloadTo.write(bytesss);
		/*
		 * byte[] buffer = new byte[dbFile.getMetadata().size()]; File file = new
		 * File("C:\\Products\\Jarvis\\Desktop\\Suhail\\" + dbFile.getFilename());
		 * FileOutputStream streamToDownloadTo = new FileOutputStream(file);
		 * streamToDownloadTo.write(buffer); streamToDownloadTo.close();
		 */

		System.out.println("File name : " + dbFile.getFilename());
		return bytesss;
	}

	
	public void deleteImageFile(String fileName) throws IOException {
		gridFsTemplate.delete(new Query(Criteria.where("filename").is(fileName)));
		System.out.println("File name : " + fileName);
	}
	 

}
