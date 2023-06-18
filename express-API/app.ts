import { mongo } from 'mongoose';

const express = require('express'),
  mongoose = require('mongoose'),
  config = require('config');

const app = express();
const db = config.get('mongoURI');
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(err));

const newsSchema = {
  title: String,
  content: String,
  author: String,
};

const News = mongoose.model('News', newsSchema);

app.post('/add', async (req, res) => {
  const fresh = new News(req.body);
  try {
    await fresh.save();
    console.log('saved');
    res.send(fresh);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put('/update/:id', async (req, res) => {
  const filter = { _id: req.params.id };
  const news = await News.find(filter);
  try {
    if (!news) {
      return res.status(404).send();
    }
    await News.updateOne(filter, {
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
    });
    res.send('Saved successfully');
  } catch (error) {
    console.log(error);
    res.status(500).send('An error occured');
  }
});

app.delete('/:id', async (req, res) => {
  const news = await News.findByIdAndDelete(req.params.id);
  try {
    if (!news) {
      return res.status(404).send();
    }
    res.send(news);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/', async (req, res) => {
  const news = await News.find({}).exec();
  try {
    if (news.length === 0) {
      res.send('no news');
    } else {
      res.send(news);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/picked/:id', async (req, res) => {
  const news = await News.find({ _id: req.params.id });
  console.log(news);
  try { 
      res.send(`${news[0].title}: ${news[0].content}`);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(PORT, () => console.log(`Server is started on ${PORT}`));
