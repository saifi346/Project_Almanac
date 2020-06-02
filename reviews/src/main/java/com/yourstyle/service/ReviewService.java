package com.yourstyle.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yourstyle.exception.reviewsNotFoundException;
import com.yourstyle.model.Reviews;
import com.yourstyle.model.SingleReview;
import com.yourstyle.repo.ReviewRepo;

@Service
public class ReviewService {

	@Autowired
	ReviewRepo repo;

	public Reviews getAllReviews(String productName, int count) throws reviewsNotFoundException {
		int i = 0;
		Optional<Reviews> reviews = repo.findByProductName(productName);
		Reviews showReviews = new Reviews();

		if (reviews.isPresent()) {
			List<SingleReview> revs = reviews.get().getReview();
			List<SingleReview> finalRev = new ArrayList<>();
			for (SingleReview temp : revs) {
				if (i >= count) {
					break;
				}
				finalRev.add(temp);
				i++;
			}
			showReviews.setId(reviews.get().getId());
			showReviews.setProductName(reviews.get().getProductName());
			showReviews.setReview(finalRev);
			return showReviews;
		} else {
			throw new reviewsNotFoundException("No reviews for product: " + productName);
		}

	}

	public void publishReview(Reviews review) {
		if (repo.existsByProductName(review.getProductName())) {
			Optional<Reviews> reviews = repo.findByProductName(review.getProductName());
			if (reviews.isPresent()) {
				List<SingleReview> tempReviews = reviews.get().getReview();
				tempReviews.addAll(review.getReview());
				reviews.get().setReview(tempReviews);
				repo.save(reviews.get());
			}
		} else {
			repo.save(review);
		}
	}

}
