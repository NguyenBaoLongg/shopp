class NewController {
  //[GET] /new
  index(req, res) {
    res.render("new");
  }

  //[GET]/new:slug
  show(req, res) {
    res.send("new detail");
  }
}

module.exports = new NewController();
