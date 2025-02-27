package kr.book.bshop.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.book.bshop.mapper.BookMapper;
import kr.book.bshop.vo.BookVO;

@Controller
public class Bookcontroller {

	@Autowired
	private BookMapper mapper;

	@RequestMapping("/bookList.do")
	public void BookList(Model model) {
		List<BookVO> list = mapper.BookList();
		model.addAttribute("list",list);
	}

	@RequestMapping("/bookInsert.do")
	public String bookInsert(BookVO vo) {
		mapper.bookInsert(vo);
		return "redirect:/bookList.do";
	}
	
}
