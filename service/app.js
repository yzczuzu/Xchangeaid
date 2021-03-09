

const post = require('./xchangeaidService/controller/featuresController.js');
const Users = require('./xchangeaidService/controller/signinController.js');
const article = require("./xchangeaidService/models/article.js");
const activity = require("./xchangeaidService/models/activity.js");
const image = require("./xchangeaidService/models/image.js");
const fs = require('fs');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');


var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,  "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-bezkoder-${file.originalname}`);
  },
});
var upload = multer({ storage: storage});
// const upload = multer({dest: 'uploads/'});

const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 8080;


//configurations
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.listen(port, function () {
  console.log("listening at " + port);
})


  ///////////////////////////////    Articles   ////////////////////////////////////////
  let userIdArticle = 0, articleContent = "", articleTitle="";

app.post('/postArticle', function(req, res) {
  console.log(req.body.articleContent);
  userIdArticle = req.body.userId;
  articleContent = req.body.articleContent;
  articleTitle = req.body.articleTitle;
  const articleData = {
      userId: req.body.userId,
      articleContent: req.body.articleContent,
      articleTitle: req.body.articleTitle,
      dateTime: Date.now(),
      likes: 0,
      img: "EMPTY"//req.file.path
  }
  
  article.create(articleData);

  res.send(200, req.body);
})

app.put('/addImageArticle/', upload.single('img'), (req, res) => {
  article.update(
    { img: req.file.path },
    { where: { 
      userId: userIdArticle,
      articleContent: articleContent,
      articleTitle: articleTitle,
    } }
  )
  res.send(200, req.body);
});



app.get('/getArticle', function (req, res) {
    // res.send(post.getArticlesList());
    article.findAll().then(notes => res.json(notes));
  })

  //get one article
  //api: localhost:8080/getOneArticle/:idpost
  app.get('/getOneArticle/:idpost/', function (req, res) {
    // res.send(post.getArticlesList());
    article.findAll({
      where: {
        idpost: req.params.idpost //array
      }
      // attributes: ['id', 'template_name'], //object
  }).then(function (list) {
      res.status(200).json(list);
  })
  })
  
  //edit a specific post
  //api: localhost:8080/editArticle/:idarticle
  app.put('/editArticle/:idpost/', (req, res) => {
    article.update(
      { articleContent: req.body.articleContent },
      { where: { idpost: req.params.idpost} }
    )
    res.send(200, req.body);
  });

  //Delete a specific post
  //api: localhost:8080/deleteArticle/:idarticle
  app.delete('/deleteArticle/:idpost/', (req, res) => {
    article.destroy(
      { where: { idpost: req.params.idpost} }
    )
    res.send(200, req.body);
  });




  ///////////////////////////////    Activies ////////////////////////////////////////

  let userIdActivity = 0, activityContent = "", activityTitle = "";

  app.post('/postActivity', function(req, res) {
    console.log(req.body.activityDatetime);
    userIdActivity = req.body.userId;
    activityContent = req.body.activityContent;
    activityTitle = req.body.activityTitle;
    postDateTime = Date.now();
    const activityData = {
      userId: req.body.userId,
          activityContent: req.body.activityContent,
          activityTitle: req.body.activityTitle,
          location: req.body.location,
          postDatetime: postDateTime,
          activityDatetime: req.body.activityDatetime,
          likes: 0,
          img: "EMPTY"
        }

        activity.create(activityData);
    res.send(200, req.body);
})

app.put('/addImageActivity/', upload.single('img'), (req, res) => {
  activity.update(
    { img: req.file.path },
    { where: { 
        userId: userIdActivity,
        activityContent: activityContent,
        activityTitle: activityTitle
    } }
  )
  res.send(200, req.body);
});

  
  app.get('/getActivity/', function (req, res) {
      // res.send(post.getArticlesList());
      activity.findAll().then(notes => res.json(notes));
    })

    app.get('/getOneActivity/:idpost/', function (req, res) {
      activity.findAll({
      where: {
        activityId: req.params.idpost //array
      }
      // attributes: ['id', 'template_name'], //object
  }).then(function (list) {
      res.status(200).json(list);
  })
  })
    
    //edit a specific post
    //api: localhost:8080/editArticle/:idarticle
    app.put('/editActivity/:activityId/', (req, res) => {
      activity.update(
        { activityContent: req.body.activityContent },
        { where: { activityId: req.params.activityId} }
      )
      res.send(200, req.body);
    });
  
    //Delete a specific post
    //api: localhost:8080/deleteArticle/:idarticle
    app.delete('/deleteActivity/:activityId/', (req, res) => {
      activity.destroy(
        { where: { activityId: req.params.activityId} }
      )
      res.send(200, req.body);
    });

    // app.post('/imagetest', (req, res) => {
    //   const imagetests = {
    //     content: req.body.content,
    //   }
    //   image.create(imagetests);
    
    //   res.send(200, req.body);
    // })

app.use('/users', Users)
  