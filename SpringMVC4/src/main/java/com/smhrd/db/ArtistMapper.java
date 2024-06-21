package com.smhrd.db;

import java.util.List;

import com.smhrd.model.ChartVO;

// import org.apache.ibatis.annotations.Mapper;

// mapper -> spring 업그레이드로 생략 가능

public interface ArtistMapper {

	public List<ChartVO> artist();

}
