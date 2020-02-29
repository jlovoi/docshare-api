const spawn = require("child_process").spawn;

module.exports = (app, db) => {
  app.get("/docs/:id/info", async (req, res) => {
    const docId = req.params.id;
    const spawn = require("child_process").spawn;
    const py = spawn("python", ["./src/collections/docs/extract.py"]);
    let output = "";

    py.stdout.on("data", function(data) {
      output += data.toString();
    });
    py.stdout.on("end", function() {
      console.log("output: ", output);
      res.send(JSON.stringify(output));
    });
    py.stdin.write(JSON.stringify(docId));
    py.stdin.end();
  });
};
