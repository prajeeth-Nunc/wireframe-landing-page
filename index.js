fetch("videoInfo.json")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  });