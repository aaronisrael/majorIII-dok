const fetchData = () => {
  fetch(`index.php`, {
    headers: new Headers({
      Accept: `application/json`
    })
  })
    .then(r => r.json())
    .then(result => parse(result));
};

const parse = data => {
  sortEvents(data);
};

const sortEvents = data => {
  data.sort((a, b) => {
    return new Date(a.start).getTime() - new Date(b.start).getTime();
  });
  console.log(data);
};

const init = () => {
  fetchData();
};

init();
