async function set(pin) {
  const url = `https://quizlet.com/webapi/3.8/multiplayer/game-instance?gameCode=${pin.toUpperCase()}`;
  return (await (await fetch(url)).json()).gameInstance.itemId;
}

async function tdef(set) {
  const url = `https://quizlet.com/${set}`;
  const textt = await (await fetch(url)).text();
  let dat = textt.split('<script'); dat = (dat = JSON.parse(dat = (dat = (dat = (dat = (dat = dat[dat.length - 6]).split('/script>')[0]).split('QLoad(')[0]).split('(function(){window.Quizlet["setPageData"] = ')[1]).slice(0, -2))).termIdToTermsMap;
  
  let [terms, defs] = [{},{}];
  
  for (const term of Object.values(dat)) {
    terms[term.word] = term.definition;
    defs = Object.fromEntries(Object.entries(terms).map(n => n.reverse()))
  }
  
  return [terms,defs]

}
