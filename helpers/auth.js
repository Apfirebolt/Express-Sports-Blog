module.exports = {
    ensureAuthenticated: function(req, res, next){
      if(req.user){
        return next();
      }
      req.flash('error_msg', 'Not Authorized');
      res.redirect('/auth/login');
    }
  }