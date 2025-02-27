package com.smhrd.myapp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import jakarta.servlet.DispatcherType;


// 해당하는 파일이 환경설정 파일임을 나타냄
// --> 해당 클래스 안쪽에서 @Bean(객체)들을 하나 이상 정의할 수 있게 해줌.
@Configuration
// 해당 클래스 파일이 "Spring Security"용 환경설정 파일임을 나타냄
@EnableWebSecurity
public class SecurityConfiguration {

	// Bean (객체)
	// : spring container에 적대될 수 있는 형태
	// 언제 많이 사용?
	// 1. 기능들을 사용자 정의형태로 만들어야 할 때 많이 사용한다.
	// 2. 모든 클래스 파일들이 공유해야 할 때
	
	// lambda 문법
	// () -> 실행할 구문
	
	// 권한을 부여하는 3가지 메소드
	// (1) permitAll : 전부 허용
	// (2) hasAnyRole : 권한 확인 후 해당 권한을 가진 사람에게만 허용
	// (3) authenticated : 인증받은 사용자에게만 허용
	
	
	// class 안에 또다른 클래스 설계가 가능하다. --> inner class
	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
		// 해당하는 메소드가 동작하면서 SFC 생성할 거고, Bean으로써 등록
		// deprecated -- 더 이상 지원하지 않을 문법들.
		// SpringSecurity에서 매개변수로써 권장하는 문법
		// --> lambda식 == 익명함수(해당하는 영역에서만 사용하고, 버릴 함수)
		// 어나니머스 메소드
		// CORS(Cross Origin Resource Sharing) : 동일출처정책 비활성화 하겠다.
		// ::(lambda식에서 제공해주는 method reference 연산자)
		http.cors(AbstractHttpConfigurer::disable)
		// 2. CSRF(Cross site Request Forgery) 비활성화 하겠다.
		.csrf(AbstractHttpConfigurer::disable)
		// 3. ** 우리가 인가를 내려줄 페이지를 지정하는 메소드
		.authorizeHttpRequests((request) -> 
			request.dispatcherTypeMatchers(DispatcherType.FORWARD).permitAll()
			.requestMatchers("/images/**","/join", "/join-process").permitAll()
			.requestMatchers("/admin").hasAnyRole("admin")
			.requestMatchers("/user").hasAnyRole("user")
			.anyRequest().authenticated())
		// 4. 사용자 지정 페이지로 인증 받을 수 있도록 메소드 설정
		.formLogin((login)-> 
				login.loginPage("/")
				.loginProcessingUrl("/login-process")
				.usernameParameter("userid")
				.passwordParameter("pw")
				// build 된 user == userid,pw
				// redirect :/dashboard
				.defaultSuccessUrl("/dashboard")
				.permitAll());
		System.out.println("들어오니?");
		
		return http.build();
		
	}
	
	// 암호화를 도와주는 PasswordEncoder 하나 추가
	// DB에 있는 데이터를 가져오려고 했더니, 암호화하는 Encoder ~~~ error 발생
	@Bean
	PasswordEncoder passwordEncoder() {
		// 이미 다 만들어진 암호화 알고리즘 사용하겠다
		return new BCryptPasswordEncoder();
	}
	
	
	
	
	
}
