import express from "express";

const app = express();
app.set('view engine', 'ejs'); // Corrected line
app.use(express.static('src'));

const frase = "olha eeuu :)";

app.get('/', (req, res) => {
  res.render('index', { frase });
});

app.listen(3000, () => {
  console.log("servidor escutando...");
});
