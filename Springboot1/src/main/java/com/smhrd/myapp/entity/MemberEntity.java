package com.smhrd.myapp.entity;

import com.smhrd.myapp.vo.MemberVO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity // Table을 표현하는 자료형
@Data
@AllArgsConstructor
@NoArgsConstructor

public class MemberEntity {
	
	public MemberEntity(MemberVO vo) {
		this.id = vo.getId();
		this.pw = vo.getPw();
		name = vo.getName();
		tel = vo.getTel();
	}
	

	@Id // PK
	@GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increment
	private Long idx;
	// JPA 쓰려면 필수
	
	// 유니크, 길이, 중복 설정 
	@Column(unique = true) // 해당 컬럼에 대한 설정값
	private String id;
	@Column(length = 200)
	private String pw;
	@Column(nullable = false)
	private String name;
	private String tel;

}
