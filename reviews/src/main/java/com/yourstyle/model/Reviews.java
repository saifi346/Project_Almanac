package com.yourstyle.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Document(collection="reviews")
public class Reviews {

	@Id 
	private String Id;
	
	private String productName;
	
	private List<SingleReview> review;

	public Reviews() {
		
	}
	public Reviews(String productName, List<SingleReview> review) {
		this.productName = productName;
		this.review = review;
	}
	

}
