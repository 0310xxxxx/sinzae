package com.smhrd.myapp.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.smhrd.myapp.entity.Member;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

	Member findByUseridAndPw(String userid, String pw);

	Member findByUserid(String username);


		

	
	
}
