# quiz
quizle<br/>
Bookmark: [google](javascript:async function set(e){let t=`https://quizlet.com/webapi/3.8/multiplayer/game-instance?gameCode=${e.toUpperCase()}`;return(await (await fetch(t)).json()).gameInstance.itemId}async function tdef(e){let t=`https://quizlet.com/${e}`,n=await (await fetch(t)).text(),i=n.split("<script");i=(i=JSON.parse(i=(i=(i=(i=(i=i[i.length-6]).split("/script>")[0]).split("QLoad(")[0]).split('(function(){window.Quizlet["setPageData"] = ')[1]).slice(0,-2))).termIdToTermsMap;let[r,o]=[{},{}];for(let a of Object.values(i))r[a.word]=a.definition,o=Object.fromEntries(Object.entries(r).map(e=>e.reverse()));return[r,o]}function pin(){return Array.from(document.querySelectorAll("input")).map(e=>e.value).join("")}const join=document.querySelector("#LiveGameStudentTarget > div > section > div > form > div.UIDiv.EnterGameCode-button > button");let getWord=()=>document.querySelector("div.FormattedText.notranslate.StudentPrompt-text.lang-en > div").innerText;function answer(e,t){let n=getWord();Array.from(document.querySelector(".StudentAnswerOptions").children).forEach(i=>{(i.innerText==e[n]||i.innerText==t[n])&&i.firstChild.firstChild.click()})}var en=!1,d=!1;join.onclick=async function(){let e=pin(),[t,n]=await tdef(await set(e));window.onkeyup=e=>{"KeyA"==e.code&&answer(t,n),"KeyX"==e.code&&(en=!en)},setInterval(()=>{en&&answer(t,n)},100)},document.querySelector("#LiveGameStudentTarget > div > section > div > form").addEventListener("keyup",e=>{if("Enter"==e.code){join.onclick();return}});let ii=setInterval(()=>{document.querySelector("#LiveGameStudentTarget > div > div.UIDiv.StudentEndView-content > div.StudentEndView-ranking.should-show > div.UIDiv.StudentEndView-winnerHeader")?.innerText=="You win!"&&(location.reload(),clearInterval(ii))},1e3);)
Click on the homepage of quizlet.live before doing anything<br>
type in the pin<br>
click join<br>
once in game, press a to answer, or x to toggle auto answer. <br/>
have fun!</br>
