(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($('#spinner').length > 0) {
        $('#spinner').removeClass('show');
      }
    }, 1);
  };
  spinner(0);

  // INFO CENTER // 

  const items = document.querySelectorAll('.question');

  function openCloseAnswer() {
    const answerId = this.id.replace('que', 'ans');
    const answerElement = document.getElementById(answerId);

    if (answerElement.style.display === 'block' || answerElement.style.display === '') {
      answerElement.style.display = 'none';
      document.getElementById(this.id + '-toggle').textContent = '+';
    } else {
      answerElement.style.display = 'block';
      document.getElementById(this.id + '-toggle').textContent = '-';
    }
  }

  items.forEach(item => item.addEventListener('click', openCloseAnswer));


  // INFO CENTER // 


  // Fixed Navbar
  $(window).scroll(function () {
    if ($(window).width() < 992) {
      if ($(this).scrollTop() > 55) {
        $('.fixed-top').addClass('shadow');
      } else {
        $('.fixed-top').removeClass('shadow');
      }
    } else {
      if ($(this).scrollTop() > 55) {
        $('.fixed-top').addClass('shadow').css('top', -55);
      } else {
        $('.fixed-top').removeClass('shadow').css('top', 0);
      }
    }
  });


  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
    return false;
  });


  // Testimonial carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 2000,
    center: false,
    dots: true,
    loop: true,
    margin: 25,
    nav: true,
    navText: [
      '<i class="bi bi-arrow-left"></i>',
      '<i class="bi bi-arrow-right"></i>'
    ],
    responsiveClass: true,
    responsive: {
      0: {
        items: 1
      },
      576: {
        items: 1
      },
      768: {
        items: 1
      },
      992: {
        items: 2
      },
      1200: {
        items: 2
      }
    }
  });


  // vegetable carousel
  $(".vegetable-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1500,
    center: false,
    dots: true,
    loop: true,
    margin: 25,
    nav: true,
    navText: [
      '<i class="bi bi-arrow-left"></i>',
      '<i class="bi bi-arrow-right"></i>'
    ],
    responsiveClass: true,
    responsive: {
      0: {
        items: 1
      },
      576: {
        items: 1
      },
      768: {
        items: 2
      },
      992: {
        items: 3
      },
      1200: {
        items: 4
      }
    }
  });


  // Modal Video
  $(document).ready(function () {
    var $videoSrc;
    $('.btn-play').click(function () {
      $videoSrc = $(this).data("src");
    });
    console.log($videoSrc);

    $('#videoModal').on('shown.bs.modal', function (e) {
      $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
    })

    $('#videoModal').on('hide.bs.modal', function (e) {
      $("#video").attr('src', $videoSrc);
    })
  });



  // Product Quantity
  $('.quantity button').on('click', function () {
    var button = $(this);
    var oldValue = button.parent().parent().find('input').val();
    if (button.hasClass('btn-plus')) {
      var newVal = parseFloat(oldValue) + 1;
    } else {
      if (oldValue > 0) {
        var newVal = parseFloat(oldValue) - 1;
      } else {
        newVal = 0;
      }
    }
    button.parent().parent().find('input').val(newVal);
  });

})(jQuery);



// 회원가입 js코드

window.addEventListener('load', () => {
  const forms = document.getElementsByClassName('validation-form');

  Array.prototype.filter.call(forms, (form) => {
    form.addEventListener('submit', function (event) {
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }

      form.classList.add('was-validated');
    }, false);
  });
}, false);

// 회원가입 끝

// 찾기 시작

function findId() {
  if ("핸드폰 번호가 있을 시") {
    alert("회원님의 이메일은 OOOOO 입니다")

  } else {
    alert("핸드폰번호를 확인해주세요")
  }

}

function findPw() {
  if ("이메일이 있을 시") {
    alert("회원님의 비밀번호를 입력하신 이메일로 발송해드렸습니다.")
    // 데이터베이스 확인하고 입력된 이메일로 보내주기
  } else {
    alert("이메일을 확인해주세요")
  }
}

// 찾기 끝

// INFO CENTER 게시글 작성 // 

function addInfo(boardId) {
  var title = document.getElementById("postTitle").value;
  var content = document.getElementById("postContent").value;
  var date = new Date().toLocaleString();

  var postDiv = document.createElement("div");
  postDiv.className = "card my-3";
  postDiv.innerHTML = `
    <div class="card-body">
      <h3 class="card-title">${title}</h3>
      <p class="card-text">${content}</p>
      <p class="card-text"><small class="text-muted">${date}</small></p>
      <img class="card-img-bottom" src="images/3.webp" alt="이미지">
      <button type="button" class="btn btn-danger my-3" onclick="deletePost(this)">삭제</button>
    </div>
  `;

  var cardText = postDiv.querySelector(".card-text");
  var cardImg = postDiv.querySelector(".card-img-bottom");

  postDiv.addEventListener("click", function () {
    if (cardText.style.display === "none") {
      cardText.style.display = "block";
      cardImg.style.display = "block";
    } else {
      cardText.style.display = "none";
      cardImg.style.display = "none";
    }
  });

  var postsDiv = document.querySelector("#" + boardId);
  postsDiv.insertBefore(postDiv, postsDiv.firstChild);

  savePosts(boardId);

  document.getElementById("postTitle").value = "";
  document.getElementById("postContent").value = "";

  $('#addInfoModal').modal('hide');
}

function addInfoPage(boardId) {
  $('#addInfoModal').modal('show');
  document.getElementById("addInfoModalLabel").innerHTML = "게시글 작성 - " + boardId;
  document.getElementById("addInfoModal").dataset.boardId = boardId;
}

function showBoard(boardId) {
  var boards = document.querySelectorAll(".container > div");
  for (var i = 0; i < boards.length; i++) {
    boards[i].style.display = "none";
  }
  document.getElementById(boardId).style.display = "block";
  getPosts(boardId);
}


// 댓글

function addComment(event) {
  event.preventDefault();
  var commentInput = event.target.querySelector("input");
  var commentText = commentInput.value;
  var date = new Date().toLocaleString();

  var commentDiv = document.createElement("div");
  commentDiv.className = "card my-3";
  commentDiv.innerHTML = `
    <div class="card-body">
      <p class="card-text">${commentText}</p>
      <p class="card-text"><small class="text-muted">${date}</small></p>
    </div>
  `;

  var commentsDiv = event.target.parentNode.querySelector(".comments");
  commentsDiv.insertBefore(commentDiv, commentsDiv.firstChild);

  commentInput.value = "";
}


// 프로그레스바

document.addEventListener('DOMContentLoaded', function () {
  var totalSeats = [28, 28, 28, 28, 28, 28]; // 각 프로그레스바에 대한 전체 좌석 수 예시
  var bookedSeats = [10, 20, 8, 11, 22, 25]; // 각 프로그레스바에 대한 예약된 좌석 수 예시
  var progressBars = document.getElementsByClassName("progressBar");

  for (var i = 0; i < progressBars.length; i++) {
    var bookedPercentage = (bookedSeats[i] / totalSeats[i]) * 100;
    progressBars[i].style.width = bookedPercentage + '%';
  }
});

// 결제 



// 결제 취소
function cancelPay() {
  function cancelPay() {
    jQuery.ajax({
      // 예: http://www.myservice.com/payments/cancel
      "url": "{https://iniapi.inicis.com/v2/pg/refund}", 
      "type": "POST",
      "contentType": "application/json",
      "data": JSON.stringify({
        "merchant_uid": "{uid1711604909221}", // 예: ORD20180131-0000011
        "cancel_request_amount": 100, // 환불금액
        "reason": "테스트 결제 환불", // 환불사유 
      }),
      "dataType": "json"
    });
  }
}