const NewsModel = require('./newsModel');

class News {
  public async getNews(req, res) {
    try {
      const news = await NewsModel.find({}).exec();
      if (news.length === 0) {
        res.send('Nothing was found :(');
      } else {
        res.send(news);
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }

  public async getExactNews(req, res) {
    try {
      const news = await NewsModel.find({ _id: req.params.id });
      if (news.length === 0) {
        res.status(404).send('Not found');
      }
      res.send(`${news[0].title}: ${news[0].content}`);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  public async addNews(req, res) {
    try {
      const fresh = new NewsModel(req.body);
      await fresh.save();
      res.send('Added successfully!');
    } catch (error) {
      res.status(500).send(error);
    }
  }

  public async updateNews(req, res) {
    const filter = { _id: req.params.id };
    try {
      const news = await NewsModel.find(filter);
      if (!news) {
        return res.status(404).send('Requested piece of news was\'t found');
      }
      await NewsModel.updateOne(filter, {
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
      });
      res.send('Updated successfully');
    } catch (error) {
      console.log(error);
      res.status(500).send('An error occured');
    }
  }

  public async deleteNews(req, res, next) {
    try {
      const news = await NewsModel.findByIdAndDelete(req.params.id);
      res.send('Deleted!');
    } catch (err) {
      res.status(500).send(err);
      next(err);
    }
  }
};

module.exports = News;
