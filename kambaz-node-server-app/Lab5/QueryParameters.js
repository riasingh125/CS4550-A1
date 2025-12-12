export default function QueryParameters(app) {
    const calculator = (req, res) => {
      const { a, b, operation } = req.query;
      const numA = parseFloat(a);
      const numB = parseFloat(b);
      let result;
  
      switch (operation) {
        case "add":
          result = numA + numB;
          break;
        case "subtract":
          result = numA - numB;
          break;
        case "multiply":
          result = numA * numB;
          break;
        case "divide":
          result = numB !== 0 ? numA / numB : "Error: Cannot divide by zero";
          break;
        default:
          result = "Invalid operation";
      }
  
      res.send(result.toString());
    };
  
    app.get("/lab5/calculator", calculator);
  }
  