package com.smhrd.db;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Select;

import com.smhrd.model.BoardVO;


public interface BoardMapper {

	public List<BoardVO> boardList();

	public void register(BoardVO vo);
	
	
	@Select("SELECT * FROM Board WHERE IDX = #{idx}")
	public BoardVO boardContent(int idx);

	

	@Delete("DELETE FROM BOARD WHERE IDX = #{idx}")
	public void boardDelect(int idx);

	public void boardEdit(int idx);
	
}
