
export default function ModuleRoutes(app) {
    let module = {
      id: "M101",
      name: "Intro to Node & Express",
      description: "Learn the basics of NodeJS and ExpressJS",
      course: "CS4550",
    };
  
    app.get("/lab5/module", (req, res) => {
      res.json(module);
    });
  
    app.get("/lab5/module/name", (req, res) => {
      res.send(module.name);
    });
  
    app.get("/lab5/module/name/:name", (req, res) => {
      module.name = req.params.name;
      res.json(module);
    });
  
    app.get("/lab5/module/description/:description", (req, res) => {
      module.description = req.params.description;
      res.json(module);
    });
  }
  