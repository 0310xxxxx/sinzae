package com.smhrd.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class ChartVO {

	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date collectDate;

	private String channel;

	private String artist;

	private String keyword;

	private long keywordCnt;

}
