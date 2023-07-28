export const backend = (
  wordString,
  answer,
  dictionary,
  dictionary2,
  wordMap,
  keys,
  setKeys,
  setWordHash,
  hashList,
  setHashList
) => {
  let keyboard = {};
  // console.log(keys);
  if (Object.keys(keys).length == 0) {
    // console.log("testing1");
    let c = 'white';
    keyboard = {
      a: c,
      b: c,
      c: c,
      d: c,
      e: c,
      f: c,
      g: c,
      h: c,
      i: c,
      j: c,
      k: c,
      l: c,
      m: c,
      n: c,
      o: c,
      p: c,
      q: c,
      r: c,
      s: c,
      t: c,
      u: c,
      v: c,
      w: c,
      x: c,
      y: c,
      z: c,
    };
  } else {
    // console.log("testing2");
    keyboard = keys;
  }
  // console.log(keyboard);
  for (let i = 0; i < wordString.length; ++i) {
    let idxStr = i.toString();
    wordMap.push('');
  }
  for (let i = 0; i < answer.length; ++i) {
    ++dictionary[answer.charAt(i)];
  }
  let tmpDict = dictionary;
  for (let i = 0; i < wordString.length; ++i) {
    dictionary2[wordString.charAt(i)].push(i);
  }
  for (let i = 0; i < wordString.length; ++i) {
    let currLetter = wordString.charAt(i);
    if (wordMap[i] === '') {
      if (tmpDict[currLetter] === 0) {
        for (let j = 0; j < dictionary2[currLetter].length; ++j) {
          wordMap[dictionary2[currLetter][j]] = 'grey';
          keyboard[currLetter] = 'grey';
        }
      } else if (dictionary2[currLetter].length === 1) {
        if (currLetter == answer.charAt(i)) {
          wordMap[i] = '#30c93b';
          keyboard[currLetter] = '#30c93b';
        } else {
          wordMap[i] = '#e1b137';
          if (keyboard[currLetter] === 'white') {
            keyboard[currLetter] = '#e1b137';
          }
        }
      } else {
        let tmpLst = dictionary2[currLetter];
        let tmpLst2 = tmpLst;
        for (let j = 0; j < tmpLst2.length; ++j) {
          let k = tmpLst2[j];
          if (currLetter == answer.charAt(k)) {
            tmpDict[currLetter] -= 1;
            tmpLst = tmpLst.filter((i) => i !== k);
            wordMap[k] = '#30c93b';
            keyboard[currLetter] = '#30c93b';
          }
        }
        tmpLst2 = tmpLst;
        for (let j = 0; j < tmpLst2.length; ++j) {
          let k = tmpLst[j];
          if (tmpDict[currLetter] <= 0) {
            wordMap[k] = 'grey';
            if (keyboard[currLetter] === 'white') {
              keyboard[currLetter] = 'grey';
            }
          } else {
            tmpDict[currLetter] -= 1;
            wordMap[k] = '#e1b137';
            if (keyboard[currLetter] === 'white') {
              keyboard[currLetter] = '#e1b137';
            }
          }
        }
      }
    }
  }
  console.log(keyboard);
  setKeys(keyboard);
  setWordHash(wordMap);
  let hashy = hashList;
  hashy.push(wordMap);
  setHashList(hashy);
};
