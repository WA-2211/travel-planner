const router = require("express").Router()


router.get('/',(req,res)=>{
    res.render('homepage.ejs')
})

router.get('/home', (req,res)=>{
  if(!req.session.user){
    return res.redirect('/')
  }
  res.render('signedIn-homepage.ejs', {user: req.session.user})
})


module.exports = router;
