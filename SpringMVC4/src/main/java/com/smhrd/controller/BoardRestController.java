package com.smhrd.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.db.BoardMapper;
import com.smhrd.model.BoardVO;
import com.smhrd.model.SearchCriteria;


@RestController // @Controller + @Responsebody 기능을 합쳐 놓은 것
public class BoardRestController {
	
	@Autowired
	// 비동기 통신으로 요청이 들어왔을 때 처리해주는 역할
	private BoardMapper mapper;
	
	
	
	
	
	// 자동완성 기능 만들기
		@RequestMapping("/autocomplete")
		public List<BoardVO> autocomplete(SearchCriteria criteria){
			// 리턴타입이나 매개변수의 자료형은 자유롭게 설정
			// --> 내가 handling하기 편한 자료형으로 지정하는 것이 좋다.
			List<BoardVO> result = mapper.autocomplete(criteria);
			
			return result;
		}
		
		// 비동기 통신으로 검색하는 기능
		@RequestMapping("/search")
		public List<BoardVO> search(SearchCriteria criteria) {
			List<BoardVO> list = mapper.search(criteria);
			return list; // 리턴된 값이 화면에 출력된다.
			// list에는 주소값이 담겨져있다! 우리가 비동기통신으로 보내줘야하는 데이터는 json구조다!
			// 주소값 --> 변환 --> json
			// 변환을 spring에서 자동으로 진행 (변환용 라이브러리가 하나 필요)
		}

	
}
