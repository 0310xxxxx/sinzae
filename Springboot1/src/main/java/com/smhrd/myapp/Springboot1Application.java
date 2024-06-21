package com.smhrd.myapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// Springboot 프로젝트의 시작지점
@SpringBootApplication
// @SpringBootConfiguration
// : SpringBoot의 전반적인 환경설정을 담당
// @EnableAutoconfigration
// : jar파일을 경로상에 두면, 필요한 객체들을 자동으로 생성하고 사용한다. 
// @componentScan
// : 해당 경로를 기준으로 하위 패키지에 있는 Bean 자동으로 SpringBootContainer에 등록
// 위 3개의 annotation을 하나로 합쳐놓은 @SpringBootApplication
public class Springboot1Application {

	public static void main(String[] args) {
		SpringApplication.run(Springboot1Application.class, args);
	}

}
