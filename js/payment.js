function PayMent() {
    var IMP = window.IMP; // 생략 가능
    IMP.init("imp64663086"); // 객체 초기화 
    IMP.request_pay({ // 결제 요청 
      pg:'html5_inicis.INIpayTest', // 결제대행사
      pay_method:'card', // 결제수단
      merchant_uid:'uid' + + new Date().getTime(), // 제휴사결제ID
      name: "노엘 갤러거 하이 플라잉 버즈-광주", // DB로 불러운 제목
      amount:100, // DB에서 가져온 가격 
      buyer_email : '',  // 빈칸으로 둘것 
      buyer_tel : '01027022952' // DB에서 가져온 전화번호
    },function (rsp) { // pc용 callback 결제결과
      if (rsp.success) { // 결제 성공
        var msg = '결제가 완료되었습니다.'; // 결제 성공시 뜨는 메세지를 얼럿창으로 뜨게 함
        msg += '고유ID : ' + rsp.imp_uid;
        msg += '상점 거래ID : ' + rsp.merchant_uid;
        msg += '결제 금액 : ' + rsp.paid_amount;
        msg += '카드 승인번호 : ' + rsp.apply_num;
        msg += '구매자 아이디 : ' + rsp.buyer_email;
        msg += '구매자 전화번호 : ' + rsp.buyer_tel;
        alert(msg);
        console.log(rsp.merchant_uid);
        pay_info(rsp);
        location.replace("index.html"); 
        
    } else { // 결제 실패시 뜨는 에러내용
        var msg = '결제에 실패하였습니다.';
        msg += '에러내용 : ' + rsp.error_msg;
        alert(msg)
        location.replace("register.html");
    }
});
  }