async function set(pin) {
  const url = `https://quizlet.com/webapi/3.8/multiplayer/game-instance?gameCode=${pin.toUpperCase()}`;
  return (await (await fetch(url)).json()).gameInstance.itemId;
}

async function tdef(set) {
  const url = `https://quizlet.com/${set}`;
  const textt = await (await fetch(url)).text();
  let dat = textt.split('<script');
  dat = (dat = JSON.parse(dat = (dat = (dat = (dat = (dat = dat[dat.length - 6]).split('/script>')[0]).split('QLoad(')[0]).split('(function(){window.Quizlet["setPageData"] = ')[1]).slice(0, -2))).termIdToTermsMap;

  let [terms, defs] = [{}, {}];

  for (const term of Object.values(dat)) {
    terms[term.word] = term.definition;
    defs = Object.fromEntries(Object.entries(terms).map(n => n.reverse()))
  }

  return [terms, defs]

}

function pin() {
  return Array.from(document.querySelectorAll("input")).map(pin => pin.value).join("")
}

const join = document.querySelector("#LiveGameStudentTarget > div > section > div > form > div.UIDiv.EnterGameCode-button > button");


let getWord = () => document.querySelector("div.FormattedText.notranslate.StudentPrompt-text.lang-en > div").innerText;

function answer(t,d) {
  const term = getWord();
  Array.from(document.querySelector(".StudentAnswerOptions").children).forEach(child => {
    if (child.innerText == t[term] || child.innerText == d[term]) {
      child.firstChild.firstChild.click();
    }
  })
}

var en = false;
var d = false;
join.onclick = async function() {
  const p = pin();
  const [t, d] = await tdef(await set(p));
  window.onkeyup = (e) => {
    if (e.code == "KeyA") {
      answer(t,d);
    }

    
    
    if (e.code == "KeyX") {
      en = !en;
    }
  }
  
  setInterval(() => {
    if (en) {
      answer(t,d)
    }
  }, 100)
};

document.querySelector("#LiveGameStudentTarget > div > section > div > form").addEventListener('keyup', e => {
    if (e.code == "Enter") {
      join.onclick();
      return
    }
})

let ii = setInterval(() => {
  if (document.querySelector("#LiveGameStudentTarget > div > div.UIDiv.StudentEndView-content > div.StudentEndView-ranking.should-show > div.UIDiv.StudentEndView-winnerHeader")?.innerText == "You win!") {
    location.reload();
    clearInterval(ii)
  }
}, 1000)
