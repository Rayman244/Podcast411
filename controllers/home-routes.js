const router = require('express').Router();
// const fetchCuratedPodcastsLists  = require('podcast-api');
const client = require('../config/ListenNotes');
const { User, Podcast, Playlist } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req,res)=>{
    // console.log(req.method);
    // console.log('Hello World');
    client.fetchCuratedPodcastsLists({
    page: 1,
  }).then((response) => {
    // Get response json data here
    const podcastData = response.data.curated_lists
  //  console.log(podcastData);
  
    // console.log(podcasts);
  // res.json(podcasts)
    res.render("homepage", {
			podcastData,
			loggedIn: req.session.loggedIn,
			playlist_id: req.session.playlist_id,
		});
    // return podcasts
}).catch((error) => {
    console.log(error)
  });

})
router.get("/profile", async (req, res)=>{
  try{
  const profileData = await Playlist.findByPk(req.session.playlist_id, {
    include: [{
      model: Podcast,
    }]
  })
  console.log(profileData);
  const userPlaylist = profileData.get({plain:true});
  console.log(userPlaylist);
  res.render("profile",{
    userPlaylist,
    loggedIn: true,
    user_id: req.session.user_id,
    playlist_id: req.session.playlist_id
  });
  }catch(err){
    res.status(500).json(err);
  }
})
router.get("/search", async (req,res)=>{
  console.log("here");
  console.log(req.session.playlist_id);
  res.render("search",
  {

    playlist_id: req.session.playlist_id
  }
  );
})
// Login route
router.get('/login', (req, res) => {
  
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    // Remove the session variables
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});



module.exports = router