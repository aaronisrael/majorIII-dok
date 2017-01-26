const init = () => {

  fetch(`index.php`, {
    headers: new Headers({
      Accept: `application/json`
    })
  })
    .then(r => r.json())
    .then(result => console.log(result));

};

init();
