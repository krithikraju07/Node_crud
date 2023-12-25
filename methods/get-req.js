module.exports = (req, res) => {
  let baseURL = req.url.substring(0, req.url.lastIndexOf("/")+1);
  let id = req.url.split("/")[3];
  // const regexV4 = new RegExp(
  //   /^[a-zA-Z0-9]+$/
  // );

  if (req.url === "/api/movies") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(req.movies));
    res.end();
  }
  // else if () {
  //   res.writeHead(404, { "Content-Type": "application/json" });
  //   res.end(
  //     JSON.stringify({
  //       title: "Validation failed",
  //       message: "UUID is not valid",
  //     })
  //   );
  // } 
   else if ( baseURL ==='/api/movies/' ) {
    res.setHeader("Content-Type", "application/json");
    let filteredMovies = req.movies.filter((movie) => {
      return movie.id === id;
    });
    if (filteredMovies.length > 0) {
      res.statusCode = 200;
      res.write(JSON.stringify(filteredMovies));
      res.end();
    }
    else{
        res.statusCode = 404;
        res.write(JSON.stringify({ title: "not found", message: "Movie not found" }));
        res.end();
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ title: "not found", message: "route not found" }));
  }
};

// && regexV4.test(id)