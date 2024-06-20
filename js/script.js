const movieSelect = document.getElementById('choice');
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');

populateUI();
// 좌석 선택 시 선택된걸로 표시
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    selectedSeats.forEach((seatIndex) => {
      seats[seatIndex].classList.add('selected');
    });
  }
}

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .selected');
  // 예약된 좌석 총 개수
  const selectedSeatCount = +selectedSeats.length;
  //선택된 좌석(selectedSeats) 배열에서 각 좌석의 인덱스를 찾아 새로운 배열(selectedSeatsIndex)로 만듭니다??
  const selectedSeatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  // 새로고침해도 유지
  localStorage.setItem('selectedSeats', JSON.stringify(selectedSeatsIndex));
  count.textContent = selectedSeatCount;
}

container.addEventListener('click', (event) => {
  if (event.target.classList.contains('seat') && !event.target.classList.contains('occupied')) {
    event.target.classList.toggle('selected');
    updateSelectedCount();
  }
});

document.querySelector('.btnC').addEventListener('click', () => {
  // 선택된 좌석들을 찾습니다.
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  
  // 선택된 좌석의 인덱스를 배열로 변환합니다.
  const selectedSeatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
  
  // 선택된 좌석의 인덱스 정보를 서버로 전송합니다.(이후 보내고자 하는 곳으로 서버이름 변경)
  fetch('http://your-server.com/save-seats', {
    method: 'POST', // 데이터를 서버로 전송하기 위해 POST 메소드를 사용합니다.
    headers: {
      'Content-Type': 'application/json', // 서버에 제공하는 컨텐츠 타입을 JSON으로 지정합니다.
    },
    body: JSON.stringify({selectedSeatsIndex}), // JavaScript 객체를 JSON 문자열로 변환합니다.
  })
  .then(response => response.json()) // 서버로부터 받은 응답을 JSON으로 변환합니다.
  .then(data => console.log(data)) // 서버로부터 받은 응답을 콘솔에 출력합니다.
  .catch(error => console.error('Error:', error)); // 오류가 발생하면 콘솔에 오류를 출력합니다.
  alert("전송 성공")
});

updateSelectedCount();