let currentIndex = 0;

const fetchData = () => {
  fetch(`index.php`, {
    headers: new Headers({
      Accept: `application/json`
    })
  })
    .then(r => r.json())
    .then(result => {parse(result);
    });
};

const parse = data => {
  sortEvents(data);
};

const sortEvents = data => {
  data.sort((a, b) => {
    return new Date(a.start).getTime() - new Date(b.start).getTime();
  });
  console.log(data);
  if (document.querySelector(`.programSlider`))
    loadSlider(data);
  if (document.querySelector(`.filter`))
    loadEvents(data);
  if (document.querySelector(`.popupBox`))
    popupListener(data);
};

const loadSlider = sortedData => {
  for (let i = 0;i < 5;i ++) {
    const $sliderTitle = document.createElement(`h1`);
    $sliderTitle.innerHTML = `${sortedData[i].title}`;
    document.querySelector(`.program${i + 1}`).appendChild($sliderTitle);

    const $sliderDate = document.createElement(`h2`);
    $sliderDate.innerHTML = `${convertDate(sortedData[i].start)}`;
    document.querySelector(`.program${i + 1}`).appendChild($sliderDate);
  }
};

const loadEvents = data => {
  const monthArr = loadMonths(data);
  const monthName = convertMonths(monthArr);
  const $select = document.querySelector(`select`);
  monthName.forEach(monthName => {
    const $option = document.createElement(`option`);
    $option.value = monthName;
    $option.innerHTML = monthName;
    $select.appendChild($option);
  });
  $select.addEventListener(`change`, e => filterHandeler(e.currentTarget.value, data));
  for (let i = 0;i < data.length;i ++) {
    const monthName = dateToMonth(data[i].start);
    const $article = document.createElement(`article`);
    if (!document.querySelector(`.${monthName}`)) {
      $article.classList.add(monthName);
      document.querySelector(`.programList`).appendChild($article);
      const $h1 = document.createElement(`h1`);
      $h1.innerHTML = `${monthName}`;
      $article.appendChild($h1);
    }
    for (let i = 0;i < data.length;i ++) {
      const $ul = document.createElement(`ul`);
      if (dateToMonth(data[i].start) === monthName) {
        const $title = document.createElement(`li`);
        const $date = document.createElement(`li`);
        const $button = document.createElement(`button`);
        $title.innerHTML = data[i].title;
        $title.classList.add(`programeTitle`);
        $date.innerHTML = convertDate(data[i].start);
        $date.classList.add(`programeDate`);
        $button.classList.add(`programButton`);
        $button.value = i;
        $button.innerHTML = `Meer info`;
        $ul.appendChild($date);
        $ul.appendChild($title);
        $ul.appendChild($button);
      }
      $article.appendChild($ul);
    }
  }
};

const filterHandeler = (e, data) => {
  console.log(e);
  if (e === `none`) {
    fetchData();
  } else {
    const $parent = document.querySelector(`.programList`);
    removeMonths($parent);
    changeMonth(e, data);
  }
};

const changeMonth = (e, data) => {
  console.log(monthToNumber(e));

  const $article = document.createElement(`article`);
  $article.classList.add(e);
  document.querySelector(`.programList`).appendChild($article);
  const $h1 = document.createElement(`h1`);
  $h1.innerHTML = `${e}`;
  $article.appendChild($h1);
  for (let i = 0;i < data.length;i ++) {
    const $ul = document.createElement(`ul`);
    if (dateToMonth(data[i].start) === e) {
      const $title = document.createElement(`li`);
      const $date = document.createElement(`li`);
      const $button = document.createElement(`button`);
      $title.innerHTML = data[i].title;
      $title.classList.add(`programeTitle`);
      $date.innerHTML = convertDate(data[i].start);
      $date.classList.add(`programeDate`);
      $button.value = i;
      $button.innerHTML = `Meer info`;
      $ul.appendChild($date);
      $ul.appendChild($title);
      $ul.appendChild($button);
    }
    $article.appendChild($ul);
  }

};

const removeMonths = $parent => {
  while ($parent.firstChild) {
    $parent.removeChild($parent.firstChild);
  }
};

const dateToMonth = data => {
  const dateFormat = new Date(data);
  const dateMonth = dateFormat.getMonth() + 1;
  return monthChoser(dateMonth);
};

const loadMonths = data => {
  const monthArr = [];
  for (let i = 0;i < data.length;i ++) {
    const dateFormat = new Date(data[i].start);
    const dateMonth = dateFormat.getMonth() + 1;
    if (!monthArr.includes(dateMonth))
      monthArr.push(dateMonth);
  }
  return monthArr;
};

const convertMonths = monthArr => {
  const fullMonths = [];
  let monthWord;
  monthArr.forEach(monthArr => {
    monthWord = monthChoser(monthArr);
    fullMonths.push(monthWord);
  });
  return fullMonths;
};

const monthChoser = month => {
  let monthWord;
  switch (month) {
  case 1: monthWord = `Januari`;
    break;
  case 2: monthWord = `Februari`;
    break;
  case 3: monthWord = `Maart`;
    break;
  case 4: monthWord = `April`;
    break;
  case 5: monthWord = `Mei`;
    break;
  case 6: monthWord = `Juni`;
    break;
  case 7: monthWord = `Juli`;
    break;
  case 8: monthWord = `Augustus`;
    break;
  case 9: monthWord = `September`;
    break;
  case 10: monthWord = `Oktober`;
    break;
  case 11: monthWord = `November`;
    break;
  case 12: monthWord = `December`;
    break;
  }
  return monthWord;
};

const monthToNumber = month => {
  let montnumber;
  switch (month) {
  case `Januari`: montnumber = 1;
    break;
  case `Februari`: montnumber = 2;
    break;
  case `Maart`: montnumber = 3;
    break;
  case `April`: montnumber = 4;
    break;
  case `Mei`: montnumber = 5;
    break;
  case `Juni`: montnumber = 6;
    break;
  case `Juli`: montnumber = 7;
    break;
  case `Augustus`: montnumber = 8;
    break;
  case `September`: montnumber = 9;
    break;
  case `Oktober`: montnumber = 10;
    break;
  case `November`: montnumber = 11;
    break;
  case `December`: montnumber = 12;
    break;
  }
  return montnumber;
};

const convertDate = date => {
  const dateFormat = new Date(date);
  const dateMonth = dateFormat.getMonth() + 1;
  const dateYear = dateFormat.getFullYear();
  const dateDay = dateFormat.getDate();
  return `${dateDay}/${dateMonth}/${dateYear}`;
};

const convertHour = date => {
  const dateFormat = new Date(date);
  const dateHours = addZero(dateFormat.getHours());
  const dateMinutes = addZero(dateFormat.getMinutes());
  return `${dateHours}:${dateMinutes}`;
};

const addZero = hour => {
  if (hour < 10) {
    hour = `0${  hour}`;
  }
  return hour;
};

const sliderListener = () => {
  const slider = document.querySelector(`.slider`);
  const pagination = slider.querySelector(`.slider-pagination`);
  const bullets = [].slice.call(slider.querySelectorAll(`.slider-bullet`));

  slider.querySelector(`.slider-prev`).addEventListener(`click`, prev, false);
  slider.querySelector(`.slider-next`).addEventListener(`click`, next, false);
  pagination.addEventListener(`click`, e => {
    const index = bullets.indexOf(e.target);
    if (index !== - 1) {
      slideTo(index);
    }
  }, false);

  bullets[currentIndex].classList.add(`active-bullet`);
};

const next = () => {
  slideTo(currentIndex + 1);
};

const prev = () => {
  slideTo(currentIndex - 1);
};

const slideTo = index => {
  const slider = document.querySelector(`.slider`);
  const bullets = [].slice.call(slider.querySelectorAll(`.slider-bullet`));

  const container = slider.querySelector(`.programSlider`);
  const totalItems = container.querySelectorAll(`.item`).length;
  const percent = (100 / totalItems);

  index = index < 0 ? totalItems - 1 : index >= totalItems ? 0 : index;
  container.style.WebkitTransform = container.style.transform = `translate(-${  index * percent  }%, 0)`;
  bullets[currentIndex].classList.remove(`active-bullet`);
  bullets[index].classList.add(`active-bullet`);
  currentIndex = index;
};

const mapListener = () => {
  const $kantine = document.querySelector(`.kantine`);
  const $park = document.querySelector(`.park`);
  const $markt = document.querySelector(`.markt`);
  const $box = document.querySelector(`.box`);
  const $arena = document.querySelector(`.arena`);

  $kantine.addEventListener(`click`, kantine);
  $park.addEventListener(`click`, park);
  $markt.addEventListener(`click`, markt);
  $box.addEventListener(`click`, box);
  $arena.addEventListener(`click`, arena);
};

const kantine = () => {
  const $parent = document.querySelector(`.textMap`);
  removeMonths($parent);
  const $h1 = document.createElement(`h1`);
  const $p1 = document.createElement(`p`);
  const $p2 = document.createElement(`p`);
  const $h2 = document.createElement(`h2`);
  const $p3 = document.createElement(`p`);

  $h1.innerHTML = `Kantine`;
  $p1.innerHTML = `De kantine is het hart van DOK. Je kan er naar concerten, films, performances, try-outs, exposities, lezingen, dj’s en nog veel meer komen kijken. Er is een groot terras met uitzicht op de kade, een grote tuin, gratis Wi-Fi, koffie & taart & krant, open keuken of je drinkt er een pint en komt voor een praatje.`;
  $p2.innerHTML = `Van hieruit kan je naar concerten in DOKbox, DOKmarkt (met o.a. overdekte skate-ramp, sport- en spelzone) en DOKpark gaan.`;
  $h2.innerHTML = `Openingsuren`;
  $p3.innerHTML = `DOKkantine is altijd open op zon- en feestdagen van 11u tot 22u. De DOKbewoners openen DOK ook op andere dagen. Voor meer info, check de agenda.`;

  $parent.appendChild($h1);
  $parent.appendChild($p1);
  $parent.appendChild($p2);
  $parent.appendChild($h2);
  $parent.appendChild($p3);
};

const park = () => {
  const $parent = document.querySelector(`.textMap`);
  removeMonths($parent);
  const $h1 = document.createElement(`h1`);
  const $p1 = document.createElement(`p`);
  const $p2 = document.createElement(`p`);
  const $h2 = document.createElement(`h2`);
  const $p3 = document.createElement(`p`);

  $h1.innerHTML = `Park`;
  $p1.innerHTML = `DOKpark verbindt het strand, de moestuin en de arena met elkaar. Zoals ieder jaar zal DOKpark er ook dit seizoen er weer anders uitzien. Het strand en de groene zone worden wat groter. De circustent maakt plaats voor een gezellige tent, waar je kan schuilen voor de zon of de regen. De strandbar is verplaatst en staat nu dichter bij de kade en het strand, waar je gezellig kan terrassen en genieten van de zomerzon, terwijl de kinderen zich uitleven in de speeltuin.`;
  $p2.innerHTML = `In de overdekte grote markt kan je nog steeds skaten of voetballen, en ook de bbq’s zijn weer beschikbaar om naar believen te gebruiken.`;
  $h2.innerHTML = `Openingsuren`;
  $p3.innerHTML = `DOKkantine is altijd open op zon- en feestdagen van 11u tot 22u. De DOKbewoners openen DOK ook op andere dagen. Voor meer info, check de agenda.`;

  $parent.appendChild($h1);
  $parent.appendChild($p1);
  $parent.appendChild($p2);
  $parent.appendChild($h2);
  $parent.appendChild($p3);
};

const markt = () => {
  const $parent = document.querySelector(`.textMap`);
  removeMonths($parent);
  const $h1 = document.createElement(`h1`);
  const $p1 = document.createElement(`p`);
  const $p2 = document.createElement(`p`);
  const $h2 = document.createElement(`h2`);
  const $p3 = document.createElement(`p`);
  const $h3 = document.createElement(`h2`);
  const $p4 = document.createElement(`p`);
  const $h4 = document.createElement(`h2`);
  const $p5 = document.createElement(`p`);

  $h1.innerHTML = `Markt`;
  $p1.innerHTML = `DOKmarkt is de overdekte zone en uitloper van de loods. Een zone voor sport en spel, met doelen voor minivoetbal, een basketbalring. Maar ook de plek van de DOK(rommel)markt. De markt palmt het volledige terrein van DOK in: langs de kade, aan het strand, een stukje onder de overdekte markt. En tijdens iedere rommelmarkt zijn er nieuwe eetstandjes, met o.a. L’entrecovélo, Vesche Vis, VivaVega – Loving Hut Express, Potatolicious, BagelBrigade en vele anderen.`;
  $p2.innerHTML = `Let op! De parking is niet meer beschikbaar. Wie met de auto komt, kan parkeren aan Dampoort station. Wie met de cargo/bak-fiets komt, mag gratis deelnemen!`;
  $h2.innerHTML = `Updates en info`;
  $p3.innerHTML = `Om iedereen op de hoogte te kunnen houden van de laatste weetjes & belangrijke info over de DOK(rommel)markt, hebben we een Facebookgroep aangemaakt voor standhouders én bezoekers. Wat kan je verwachten? Is er nog plaats? Welke eetkraampjes zijn er? Wat is er die dag nog te doen op DOK? Alle deze info wordt hier gedeeld. Word lid en nodig gerust iedereen uit die graag naar de DOK(rommel)markt komt!`;
  $h3.innerHTML = `Openingsuren`;
  $p4.innerHTML = `De DOK(rommel)markt vindt telkens plaats van 11u – 17u, Data: ‘Zie programma’`;
  $h4.innerHTML = `Inschrijven`;
  $p5.innerHTML = `Hou onze eventpagina op facebook in de gaten. Daar melden we wanneer er last minute plaatsen vrijkomen. Mail naar devine@dokgent.be voor inschrijvingen. Wie zijn zolder leeghaalt, zijn kleerkast uitmest of gewoonweg oude spullen een tweede leven wil bieden, krijgt voor 6 euro een stand van 9m² aangeboden. Je betaalt dit bedrag ter plekke. Wie met de cargo- of bakfiets komt, mag gratis deelnemen!`;

  $parent.appendChild($h1);
  $parent.appendChild($p1);
  $parent.appendChild($p2);
  $parent.appendChild($h2);
  $parent.appendChild($p3);
};

const box = () => {
  const $parent = document.querySelector(`.textMap`);
  removeMonths($parent);
  const $h1 = document.createElement(`h1`);
  const $p1 = document.createElement(`p`);

  $h1.innerHTML = `Box`;
  $p1.innerHTML = `DOKbox (onder DOKmarkt) is een intieme black box met tribune, podium en bankjes geschikt voor allerlei activiteiten zoals theatershows en akoestische performances. Het is een ideaal plekje waar zelfs het Belgische weer geen roet in het eten kan komen gooien. Zo verhuizen we zelf alle openlucht-activiteiten bij slecht weer naar de DOKbox. Opgelet want in de zomer kan het ‘s avonds best fris worden, breng dus best een dekentje mee! We hebben zelf enkele dekens maar niet voor iedereen! En klik hier voor de technische fiche.`;

  $parent.appendChild($h1);
  $parent.appendChild($p1);
};

const arena = () => {
  const $parent = document.querySelector(`.textMap`);
  removeMonths($parent);
  const $h1 = document.createElement(`h1`);
  const $p1 = document.createElement(`p`);

  $h1.innerHTML = `Arena`;
  $p1.innerHTML = `Amfitheater naar Grieks model opgebouwd uit aarde en gras. Om naar mooie en intieme voorstellingen te kijken onder een stralende zon of een blinkende sterrenhemel.`;

  $parent.appendChild($h1);
  $parent.appendChild($p1);
};

const popupListener = data => {
  const $container = document.querySelector(`.buttonList`);

  $container.addEventListener(`click`, e => {
    const $popUpBox = document.querySelector(`.popupBox`);
    const $span = document.getElementsByClassName(`close`)[0];

    console.log(e.target.classList[0]);
    $popUpBox.style.display = `block`;

    $span.addEventListener(`click`, () => {
      $popUpBox.style.display = `none`;
    });

    window.onclick = e => {
      if (e.target === $popUpBox) {
        $popUpBox.style.display = `none`;
      }
    };

    const $parent = document.querySelector(`.popupBox-content`);
    const $title = document.createElement(`h1`);
    const $date = document.createElement(`p`);
    const $hour = document.createElement(`p`);
    const $info = document.createElement(`h2`);
    const $orgTitle = document.createElement(`h2`);
    const $placeTitle = document.createElement(`h2`);
    const $ulO = document.createElement(`ul`);
    const $liO = document.createElement(`li`);
    const $ulP = document.createElement(`ul`);
    removeMonths($parent);
    $title.innerHTML = data[e.target.value].title;
    $date.innerHTML = convertDate(data[e.target.value].start);
    $hour.innerHTML = `${convertHour(data[e.target.value].start)} - ${convertHour(data[e.target.value].end)}`;
    $info.innerHTML = data[e.target.value].description;
    $orgTitle.innerHTML = `Organisator`;
    $placeTitle.innerHTML = `Plaats`;
    $liO.innerHTML = data[e.target.value].organiser;
    $parent.appendChild($title);
    $parent.appendChild($date);
    $parent.appendChild($hour);
    $parent.appendChild($info);
    $parent.appendChild($orgTitle);
    $parent.appendChild($placeTitle);
    $parent.appendChild($ulO);
    $parent.appendChild($ulP);
    $ulO.appendChild($liO);
    data[e.target.value].locations.forEach(place => {
      const $liP = document.createElement(`li`);
      console.log(place.name);
      $liP.innerHTML = place.name;
      $ulP.appendChild($liP);
    });
  });
};

const init = () => {
  fetchData();

  if (document.querySelector(`.programSlider`))
    sliderListener();

  if (document.querySelector(`.map`))
    mapListener();
};

init();
