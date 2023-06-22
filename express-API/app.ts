import { mongo } from 'mongoose';

const express = require('express'),
  mongoose = require('mongoose'),
  config = require('config'),
  NewsController = require('./newsController'),
  app = express(),
  newsRouter = express.Router(),
  db = config.get('mongoURI'),
  PORT = process.env.PORT || 3000,
  newsController = new NewsController();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(err));

newsRouter.get('/', newsController.getNews);
newsRouter.get('/picked/:id', newsController.getExactNews);
newsRouter.post('/add', newsController.addNews);
newsRouter.put('/update/:id', newsController.updateNews);
newsRouter.delete('/delete/:id', newsController.deleteNews);

app.use('/', newsRouter);

app.use((err, req, res, next) => {
  res.send(`From last check: ${err}`);
});

app.listen(PORT, () => console.log(`Server is started on ${PORT}`));
