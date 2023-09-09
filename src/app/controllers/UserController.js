

class UserController 
{
    index(req, res, next){

    }
    signup(req, res, next){ 
        res.send({email:'<EMAIL>', password:'<PASSWORD>'})
    }
    signupView(req, res, next)
    {
        res.render("/user/signup");
    }
    login(req, res, next){     
        res.send("Login successful!");
    }
    loginView(req, res, next)
    {
        res.render('user/login', {layout: 'author'});
    }
  
}

module.exports = new UserController();  