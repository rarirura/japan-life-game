let stats = {};
let currentEvent = 0;

// 캐릭터 초기값
const characters = {
  "워홀러": { money: 40, social: 60, mental: 50, study: 40 },
  "회사원": { money: 70, social: 40, mental: 40, study: 50 },
  "유학생": { money: 40, social: 50, mental: 50, study: 70 },
  "유튜버": { money: 50, social: 60, mental: 60, study: 40 }
};

// 이벤트 카드 20개
const events = [
  { text: "동아리 친구들이 술자리에 부른다", left: { social: +10, money: -10, mental: +5 }, right: { social: -5, mental: -5 } },
  { text: "알바 사장이 야근 부탁한다", left: { money: +15, mental: -10 }, right: { money: -5, social: +5 } },
  { text: "JLPT 시험 응시?", left: { study: +20, mental: -5, money: -10 }, right: { study: -5, mental: +5 } },
  { text: "집주인이 월세 인상 통보", left: { money: -15, mental: -5 }, right: { social: -5 } },
  { text: "일본인 친구가 여행 가자고 한다", left: { social: +15, money: -15 }, right: { social: -5, mental: +5 } },
  { text: "한국에서 부모님이 용돈을 보내주심", left: { money: +20 }, right: { mental: +5 } },
  { text: "편의점 신상품을 사먹는다", left: { money: -5, mental: +5 }, right: { mental: -5 } },
  { text: "상사가 회식에 부른다", left: { social: +10, mental: -10 }, right: { social: -10, mental: +5 } },
  { text: "한국 친구가 일본에 놀러온다", left: { social: +20, money: -10 }, right: { social: -5 } },
  { text: "장시간 전철 통근", left: { mental: -10 }, right: { study: +5 } },
  { text: "유튜브 영상 업로드 성공!", left: { social: +10, money: +10, mental: +5 }, right: { mental: -5 } },
  { text: "알바비가 밀렸다", left: { money: -10, mental: -5 }, right: { social: -5 } },
  { text: "도쿄 디즈니랜드 초대", left: { social: +20, money: -20, mental: +10 }, right: { social: -5 } },
  { text: "교수님이 논문 발표를 권유", left: { study: +20, mental: -10 }, right: { study: -5 } },
  { text: "회사 프로젝트 마감", left: { money: +20, mental: -15 }, right: { mental: +5, social: -5 } },
  { text: "지진 발생! 대피해야 한다", left: { mental: -5, social: +5 }, right: { mental: -10 } },
  { text: "한국 음식이 너무 먹고 싶다", left: { money: -10, mental: +10 }, right: { mental: -5 } },
  { text: "일본인 친구가 한류 아이돌 콘서트에 가자고 함", left: { social: +15, money: -15 }, right: { social: -5 } },
  { text: "유튜브 악플이 달렸다", left: { mental: -15 }, right: { social: -5, mental: -5 } },
  { text: "병에 걸려 병원에 간다", left: { money: -15, mental: -10 }, right: { study: -10 } },
];

// 캐릭터 선택 후 시작
function startGame(charName) {
  stats = { ...characters[charName] };
  document.getElementById("character-select").style.display = "none";
  document.getElementById("game").style.display = "block";
  render();
}

// 능력치 업데이트
function updateStats(change) {
  for (let key in change) {
    stats[key] += change[key];
    if (stats[key] > 100) stats[key] = 100;
    if (stats[key] < 0) stats[key] = 0;
  }
}

// 화면 갱신
function render() {
  document.getElementById("money").textContent = stats.money;
  document.getElementById("social").textContent = stats.social;
  document.getElementById("mental").textContent = stats.mental;
  document.getElementById("study").textContent = stats.study;

  if (Object.values(stats).some(v => v <= 0)) {
    document.getElementById("event-text").textContent = "게임 오버! 일본 생활 종료...";
    document.querySelectorAll("#card button").forEach(btn => btn.disabled = true);
    return;
  }

  if (currentEvent < events.length) {
    document.getElementById("event-text").textContent = events[currentEvent].text;
  } else {
    document.getElementById("event-text").textContent = "축하합니다! 일본 생활 성공 🎉";
    document.querySelectorAll("#card button").forEach(btn => btn.disabled = true);
  }
}

// 선택 처리
function choose(direction) {
  const event = events[currentEvent];
  updateStats(event[direction]);
  currentEvent++;
  render();
}
