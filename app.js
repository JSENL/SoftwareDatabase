//  var listOfCompanies =  [ 
//    {name:'SmartBear Software', image:'https://smartbear.com/SmartBear/media/images/smartbear-color-logo-s.png'},
//    {name:'Wayfair', image:'https://d2xsegqaa8s978.cloudfront.net/wayfair_0.0.4_staging/assets/logo.png'}, 
//    {name: 'Akamai Technologies', image:'https://www.akamai.com/us/en/multimedia/images/logo/akamai-logo.png'},
//     {name:'Cayan', image:'https://cayan.com/CMSTemplates/Cayan/css/img/Cayan-logo-tagline.svg'},
//    {name:'Cybereason', image:'https://www.cybereason.com/hs-fs/hubfs/Cybereason%20Files/images/main-logo-black.png?t=1528742223091&width=221&name=main-logo-black.png'}, 
//     {name:'Dynatrace', image:'https://www.dynatrace.com/common/assets/dynatrace-logo-aa8081becf.svg'},
//    {name:'HubSpot', image:'https://cdn2.hubspot.net/hubfs/53/HubSpot_Logos/HSLogo_color.svg?t=1528827214021'}, 
//     {name:'Klaviyo', image:'https://www.klaviyo.com/wp-content/themes/klaviyo/dist/images/klaviyo-lo-200px-042018-KO_30424fcd.png'},
//    {name:'iRobot', image:'https://www.irobotweb.com/-/media/MainSite/Images/Logos/wordmark-to-symbol-animation.gif?h=62&la=en&w=139'} ];
  

const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://jasenml:test12@ds215961.mlab.com:15961/softwaredb');

var companySchema = new mongoose.Schema ({
  image: String,
  name: String,  
});
//mongoose.connect//
var Company = mongoose.model('Company', companySchema);

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
 
app.post('/companies', (req, res) => { 
//   Company.insert(req.body.note);
  Company.create({
    name: req.body.name, 
    image: req.body.image
  }, (err, note) => {
    if (err) return console.error(err);
    console.log('\n====\n')
    res.redirect('/');
  }
  )
 
});

app.get('/', (req, res) => {
 Company.find({}, (err, allCompanies) => {
   if(err){ 
   console.log('Error is: ' + err);
   } else {
     console.log("Success. 'All Companies pulled from database'");
     console.log(allCompanies);
     res.render('newCompany', {displayCompanies:allCompanies})
   }
 })
});
   
//  app.get('/', function (req, res) {
//     res.render('landing');
//  });
   
 app.get('/companies', function (req, res) {

   res.render('companies', {displayCompanies:Company});
  
 });

 app.get('/companies/new', function (req, res) {
   res.render('../partials/newCompany');
  });

// app.post('/companies', (req, res) => {
//   var name = req.body.name;
//    var image = req.body.image;
//   listOfCompanies.push({name:name, image:image});
//   res.send("You posted these values" + name + image);
    
// } );

app.listen(3000, () => console.log('App listening on port 3000! I needs work.'));
//  app.get('/coder', function (req, res) {
//     res.send('<h1>I BESE IN THE APP!!</h1><a href="/bye">peace</a><hr><a href="/">SOUUUULLLL</a><a href="/r/blah">Evil</a>');
//  }
//    );
//  app.get('/r/:subredditName', function (req, res) {
//      var redditNow = req.params.subredditName;
//    res.send('Welcome to the ' + redditNow + ' Subreddit!' );
  
//  }
//   );

//  app.get('*', function (req, res) {
//     res.send("You typed something strange in the URL.  Care to try again?");
//  }
//    );






