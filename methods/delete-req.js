const writeToFile = require("../util/write-to-file")

module.exports = (req, res) => {
  let baseURL = req.url.substring(0, req.url.lastIndexOf("/") + 1);
  let id = req.url.split("/")[3];
//   const regexV4 = new RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/);

//   if (!regexV4.test(id)) {
//     res.writeHead(400, { "Content-Type": "application/json" });
//     res.end(
//       JSON.stringify({
//         title: "Validation failed",
//         message: "UUID is not valid",
//       })
//     );
//   }
   if(baseURL ==='/api/movies/'){
    const index = req.movies.findIndex((movie)=>{
        return movie.id===id;
    })
    if(index === -1){
        res.statusCode = 404;
        res.write(JSON.stringify({ title: "not found", message: "Movie not found" }));
        res.end();
    }
    else{
        req.movies.splice(index,1)
        writeToFile(req.movies)
        res.writeHead(204,{ "Content-Type": "application/json" });
        res.end(JSON.stringify(req.movies))
    }
  }
  else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ title: "not found", message: "route not found" }));
  }
};
