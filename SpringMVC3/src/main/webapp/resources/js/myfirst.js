
		// 페이자가 첫번째로 실행되었을 때, autocomplete되게 만들기
		$(function(){
			myAjaxAutoComplete();
		})
	
		// select 태그의 값이 변경되었을 때 , 이벤트 처리
		$("#sel1").on("change",myAjaxAutoComplete)
			
		// 비동기통신을 사용하여 작성자 리스트를 전부 조회
		// 요청 경로 : /autocomplete
		// 1. 비어있는 배열 생성
		function myAjaxAutoComplete(){
			$.ajax({
				url : `${cpath}/autocomplete`,
				// ?type=작성자
				data : {type : $("#sel1").val()},
				dataType : "json",
				success : function(res){
					console.log("받아온 데이터 >>", res)
					// 객체 배열 ---> 문자열 배열
					var emptyList = [];
					for(var i = 0; i < res.length; i++){
						if(res[i].writer != null) {
							emptyList.push(res[i].writer);
						} else {
							emptyList.push(res[i].title);
							
						}
							
							
							
					}
					myAuto(emptyList) ;
						
				
					// 2. res의 길이만큼 반복하면서 안쪽에 있는 writer 데이터만 
					// 꺼내서 비어있는 배열에 추가
				},
				error : function (e) {
					console.log(e);
			}
		})
		}
		function myAuto(emptyList) {
			// jquery-ui를 사용해서 input태그 아래쪽에 글자 자동완성 기능 넣어보기
			$("#auto_complete").autocomplete({
				// 1. 자동완성하고 싶은 목록
				source : emptyList,
				// 2. 최소글자
				minlength : 1,
				// 3. 딜레이 시간
				delay : 100,
				// 4. 해당 요소에 focusing 되었을 때 작동할 함수
				focus : function(e, ui) {
					// e ---> 이벤트
					// ui ---> 화면구성
					return false;
				}
					
			})
		}
		// 1. searchBtn 클릭했을 때 이벤트 등록
		$("#searchBtn").on("click", function() {
			// 2. ID값이 searchForm 안에 있는 데이터를 가져오기
			var data = $("#searchForm").serialize();
			// 3. 비동기 통신을 사용하여 데이터 전송
			$.ajax({
				url : `${cpath}/search`,
				data : data,
				dataType : "json",
				success : function(result){
					console.log(result);
					// 화면구성을 바꾸는 코드 작성
					
					// 1. column이름을 제외한 나머지 행들을 비워주기
					$("#mytable tr:first-child~tr").empty();
					// 2. result에 담긴 데이터 개수만큼 반복
					$.each(result, function(i,board){
						// 3. tr태그를 추가
						var tr = `
							<tr>
								<td>${board.idx}</td>
								<td>
									<a href="${cpath}/boardContent/${board.idx}">${board.title}</a>
								</td>
								<td>${board.writer}</td>
								<td>${board.inDate}</td>
							</tr>`
						$("#mytable tr:last-child").after(tr);
					})
					

					
				},
				error : function(e){
					console.log(e);
				}

			})

		})