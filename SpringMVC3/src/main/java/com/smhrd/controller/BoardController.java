package com.smhrd.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.smhrd.db.BoardMapper;
import com.smhrd.model.BoardVO;
import com.smhrd.model.SearchCriteria;


@Controller 
public class BoardController {

	@Autowired // ****
	private BoardMapper mapper;
	
	
	@RequestMapping("/boardDelete/{idx}")
	public String boardDelete(@PathVariable("idx") int idx) {
		
		mapper.boardDelect(idx);

		return "redirect:/";
	}
	
	@RequestMapping("/boardEdit/{idx}")
	public String boardEdit(@PathVariable("idx") int idx) {
		
		mapper.boardEdit(idx);
		
		return "redirect:/";
	}
	
	@GetMapping("/boardContent/{idx}")
	public String boardContent(@PathVariable("idx") int idx, Model model) {

		BoardVO result = mapper.boardContent(idx);

		model.addAttribute("board", result);

		return "content";
	}
	
	// 글쓰기 기능을 하는 메소드
	@PostMapping("/register") 
	public String register(BoardVO vo) {
		
		mapper.register(vo);
		
		return "redirect:/";
	}

	@GetMapping("/register")
	public String register() {
		return "register";
	}

	@RequestMapping("/") 
	public String board(Model model) {
		
		List<BoardVO> list = mapper.boardList();

		model.addAttribute("list", list);

		return "board";
		
	}

}