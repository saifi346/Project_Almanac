package com.yourstyle.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.yourstyle.exception.reviewsNotFoundException;
import com.yourstyle.model.Reviews;
import com.yourstyle.service.ReviewService;

@RestController
@CrossOrigin("*")
@RequestMapping("/reviews")
public class ReviewController {

	@Autowired
	ReviewService service;
	
	@GetMapping("/getreviews/{productName}")
	public ResponseEntity<Reviews> getAllReviews(@PathVariable("productName") String productName,@RequestParam("count") int count) throws reviewsNotFoundException {
		Reviews reviews = service.getAllReviews(productName,count);
		return new ResponseEntity<>(reviews, new HttpHeaders(), HttpStatus.OK);
	}
	
	@PostMapping("/addreview")
	public ResponseEntity<?> addReview(@RequestBody Reviews review){
		service.publishReview(review);
		return new ResponseEntity<>("published successfully", new HttpHeaders(),HttpStatus.OK);
	}
	
}
