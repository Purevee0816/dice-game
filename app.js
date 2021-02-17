//Тоглоомын бүх газарт ашиглагдах global variable энд зарлая.
var activePlayer, Scores, roundScore;
// Тоглоом дууссан эсэхийг хадгалах төлөвийн хувьсагч
var isNewGame;
// Шооны зургийг үзүүлэх элементийг DOM-оос хайж олоод энд хадгална.
var diceDom = document.querySelector(".dice");

//Тоглоомыг шинээр дуудах
initGame();

// Тоглоомыг шинээр эхлэхэд бэлтгэнэ.
function initGame() {
  //Тоглоом эхэллээ гэдэг төлөвт оруулна.
  isNewGame = true;
  //Тоглогчийн ээлжийг хадгалах хувьсагч.1-р тоглогчийг 0, 2-р тоглогчийг 1 гэж тэмдэглэе.
  activePlayer = 0;
  //Тоглогчдийн цуглуулсан оноог хадгалах хувьсагч
  Scores = [0, 0];

  //Тоглогчийн ээлжиндээ хадгалж байгаа оноог хадгалах хувьсагч
  roundScore = 0;

  //Програм эхлэхэд бэлтэе
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  // Тоглогчдийн нэрийг буцааж гаргах
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");

  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");

  document.querySelector(".player-0-panel").classList.add("active");

  diceDom.style.display = "none";
}

//шоог шидэх event listener
document.querySelector(".btn-roll").addEventListener("click", function () {
  if (isNewGame) {
    //1-6 доторх тоог санамсаргүй нэг тоо гаргаж авна.
    var diceNumber = Math.floor(Math.random() * 6) + 1;

    //шооны зургийг вэб дээр гаргаж ирнэ.
    diceDom.style.display = "block";

    // буусан санамсаргүй тоонд харгалзах шооны зургийг вэб дээр гаргаж ирнэ.
    diceDom.src = "dice-" + diceNumber + ".png";

    // Буусан тоо 1-с ялгаатай бол идэвхтэй тоглогчийн ээлжийн оноог нэмэгдүүлнэ.
    if (diceNumber !== 1) {
      //1-с ялгаатай тоо буулаа.
      roundScore = roundScore + diceNumber;
      document.getElementById(
        "current-" + activePlayer
      ).textContent = roundScore;
    } else {
      //1 буусан тул тоглогчийн ээлжийг энэ хэсэгт сольж өгнө.
      switchToNextPlayer();
    }
  } else {
    alert("Тоглоом дууссан New Game товчыг дарна уу");
  }
});

// HOLD товчны event listener
document.querySelector(".btn-hold").addEventListener("click", function () {
  if (isNewGame) {
    // Уг тоглогчийн цуглуулсан оноог global оноон дээр нэмж өгнө.
    Scores[activePlayer] = Scores[activePlayer] + roundScore;

    // Дэлгэц дээр оноог нь өөрчилнө.
    document.getElementById("score-" + activePlayer).textContent =
      Scores[activePlayer];

    // Уг тоглогч хожсон эсэхийг (оноо нь 100< )шалгах
    if (Scores[activePlayer] >= 10) {
      // тоглоомыг дууссан төлөвт оруулна.
      isNewGame = false;
      // Ялагч гэсэн текстийг нэрнийх нь оронд гаргана.
      document.getElementById("name-" + activePlayer).textContent = "WINNER!!!";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
    } else {
      // Тоглогчийн ээлжийг солино.
      switchToNextPlayer();
    }
  } else {
    alert("Тоглоом дууссан байна.");
  }
});

// Энэ функц нь тоглох ээлжийг дараачийн тоглогч руу шилжүүлдэг.
function switchToNextPlayer() {
  //1 буусан тул тоглогчийн ээлжийг энэ хэсэгт сольж өгнө.
  // Энэ тоглогчийн ээлжиндээ цуглуулсан оноог 0 болгоно.
  roundScore = 0;
  document.getElementById("current-" + activePlayer).textContent = 0;

  //Тоглогчийн ээлжийг нөгөө тоглогч руу шилжүүлнэ.
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

  // Улаан цэгийг шилжүүлэх
  document.querySelector(".player-0-panel ").classList.toggle("active");
  document.querySelector(".player-1-panel ").classList.add("active");

  // Шоог түр алга болгоно.
  diceDom.style.display = "none";
}

// New Game (ШИинэ тоглоом) эхлүүлэх товчны event listener
document.querySelector(".btn-new").addEventListener("click", initGame);
