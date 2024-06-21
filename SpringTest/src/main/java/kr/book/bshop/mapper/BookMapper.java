package kr.book.bshop.mapper;

import java.util.List;

import kr.book.bshop.vo.BookVO;

public interface BookMapper {

	public List<BookVO> BookList();

	public void bookInsert(BookVO vo);

	
}
