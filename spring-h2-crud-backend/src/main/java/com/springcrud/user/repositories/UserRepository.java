package com.springcrud.user.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.springcrud.user.entities.User;

@Repository
// +++ PRE Spring Data 3.0 +++ 
//public interface UserRepository extends PagingAndSortingRepository<User, Long>{
//
/* In Spring Data 3.0, "PagingAndSortingRepository" and other interfaces don't extend CrudRepository anymore.
 * So, with this unbinding, we can now choose to combine PagingAndSortingRepository with CrudRepository.
 * 
 * See:  * https://stackoverflow.com/questions/74900974/the-method-findbyid-is-undefined-for-the-type-after-migrating-to-boot-3
*/
//
//+++ FOR Spring Data 3.0 +++ 
public interface UserRepository extends 
	PagingAndSortingRepository<User, Long>,
	CrudRepository<User, Long>{


	// Page<User> findAll(Pageable pageable);
	
}
