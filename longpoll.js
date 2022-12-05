const express = require('express')
const app = express()
const port = 3000
connections = []
app.get('/date', (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8")
  res.setHeader("Transfer-Encoding", "chunked")
  connections.push({"response": res, "counter": 0});
})

setTimeout(function run() {
    connections.map(obj => {
      counter = obj["counter"];
      counter++;
      res = obj["response"]
      res.write("printing counter for request" + counter + "\n");
      connections = connections.filter(function(item) {
         return item !== obj
      })
      if (counter == 10) {
          connections = connections.filter(function(item) {
             return item !== obj
          })
          res.write("END\n")
          res.end()
      } else {
        connections.push({"response": res, "counter": counter})
      }
    })
   setTimeout(run, 5000)
}, 5000)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
