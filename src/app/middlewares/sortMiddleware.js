const { faListSquares } = require("@fortawesome/free-solid-svg-icons");

module.exports = function sortMiddleware(req, res, next) {
     res.locals._sort = {
        enable:false, 
        type:'default', 
     }
     if(req.query.hasOwnProperty('_sort'))
     {
        Object.assign(res.locals._sort, {
            enable:true, 
            type:req.query.type, 
            col: req.query.col
        })
     }
    next();

 } 