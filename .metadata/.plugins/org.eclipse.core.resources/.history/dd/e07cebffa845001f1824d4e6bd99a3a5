package com.springcrud.user.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.springcrud.user.entities.User;
import com.springcrud.user.repositories.UserRepository;

@RestController
@RequestMapping(path = "/spring-rest-api", produces = "application/json")
@CrossOrigin(origins = "http://localhost:4200") // Angular Home Page
public class UserController {

	private final UserRepository userRepo;

	public UserController(UserRepository userRepo) {
		this.userRepo = userRepo;
	}

	@GetMapping("/users")
	public ResponseEntity<List<User>> getUsers() {
		Pageable page = PageRequest.of(0, 9, Sort.by("name").descending());
		Page<User> pagedResult = userRepo.findAll(page);

		if (pagedResult.hasContent()) {
			return new ResponseEntity<>(pagedResult.getContent(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(new ArrayList<User>(), HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/users/{id}")
	public ResponseEntity<User> getUserById(@PathVariable("id") Long id) {
		Optional<User> optUser = userRepo.findById(id);
		if (optUser.isPresent()) {
			return new ResponseEntity<>(optUser.get(), HttpStatus.OK);
		}
		return new ResponseEntity<>(optUser.get(), HttpStatus.NOT_FOUND);
	}

	@PostMapping(path = "/users", consumes = "application/json")
	@ResponseStatus(code = HttpStatus.CREATED)
	public User postUser(@RequestBody User user) {
		return userRepo.save(user);
	}

	@PutMapping(path = "/users/{id}/put", consumes = "application/json")
	public ResponseEntity<User> putUser(@PathVariable("id") Long id, @RequestBody User user) {
		try {
			Optional<User> optionalUser = userRepo.findById(id);
			if (optionalUser.isPresent()) {
				User existingUser = optionalUser.get();
				existingUser.setName(user.getName());
				existingUser.setEmail(user.getEmail());

				User userUpdated = userRepo.save(existingUser);
				return new ResponseEntity<>(userUpdated, HttpStatus.OK);
			} else {
				return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PatchMapping(path = "/users/{id}/patch", consumes = "application/json")
	public ResponseEntity<User> patchUser(@PathVariable("id") Long id, @RequestBody User patch) {
		try {
			Optional<User> optionalUser = userRepo.findById(id);
			if (optionalUser.isPresent()) {
				User user = optionalUser.get();

				if (patch.getName() != null && patch.getName() != "") {
					user.setName(patch.getName());
				}
				if (patch.getEmail() != null && patch.getEmail() != "") {
					user.setEmail(patch.getEmail());
				}

				User updatedUser = userRepo.save(user);
				return new ResponseEntity<>(updatedUser, HttpStatus.OK);
			} else {
				return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);

		}
	}

	@DeleteMapping(path = "/users/{id}/delete")
	public ResponseEntity<String> deleteUser(@PathVariable("id") Long id) {
		try {
			userRepo.deleteById(id);
			return new ResponseEntity<>(null, HttpStatus.OK);
		} catch (EmptyResultDataAccessException e) {
			return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
		}
	}
}
