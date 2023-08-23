class SiteController {
    home(req, res) {
        res.render('home');
    }
    upload(req, res) {
        res.render('upload');
    }
    login(req, res) {
        res.render('login');
    }
}

module.exports = new SiteController();
