/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/padawan98
*/
const axios = require('axios').default;
axios.get('https://api.github.com/users/padawan98').then(response=>{console.log('Step 1, data fetching: ',  response)}).catch(err => {console.log(err)});
/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

const followersArray = [];

/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/
function cardMaker(myGithub)
{
  //class card
  let newClass = document.createElement('div');
  newClass.classList.add('card');

  //img
  let myImg = document.createElement('img'); //create img
  myImg.setAttribute('src', myGithub.avatar_url); // putting img
  newClass.appendChild(myImg);

  //child class card-info
  let cardInfo = document.createElement('div');
  cardInfo.classList.add('card-info');
  newClass.appendChild(cardInfo);

  //h3
  let h3 = document.createElement('h3');
  h3.classList.add('name');
  h3.textContent = myGithub.name;
  cardInfo.appendChild(h3);

  //username p 
  let userName = document.createElement('p');
  userName.classList.add('username');
  userName.textContent = myGithub.login;
  cardInfo.appendChild(userName);

  //location p
  let location = document.createElement('p');
  location.textContent = 'Location: ' + myGithub.location;
  cardInfo.appendChild(location);

  //profile p 
  let profile = document.createElement('p');
  profile.textContent = 'Profile: ';
  cardInfo.appendChild(profile);

  //profile p a
  let profileAnchor = document.createElement('a');
  profileAnchor.href = 'https://api.github.com/users/' + myGithub.userName;
  profileAnchor.textContent = 'https://api.github.com/users/' + myGithub.userName;
  profile.appendChild(profileAnchor);

  //profile followers
  let followers = document.createElement('p');
  followers.textContent = 'Followers: ' + myGithub.followers;
  cardInfo.appendChild(followers);

  //profile following
  let following = document.createElement('p');
  following.textContent = 'Following: ' + myGithub.following;
  cardInfo.appendChild(following);

  //bio
  let bio = document.createElement('p');
  bio.textContent = 'Bio: ' + myGithub.bio;
  cardInfo.appendChild(bio);

  //return
  return newClass;
}

//achor to .cards
let entryPoint = document.querySelector('.cards'); 
 
//axios my profile
axios.get('https://api.github.com/users/padawan98')
.then(response =>
  {
    const myData = response.data;  //fetch data => myData
    // console.log('Step 4 res = ', response);
    // console.log('Step 4 res.data = ', response.data);
    entryPoint.appendChild(cardMaker(myData)); //entryPoint = place in dom
  })
.catch(err =>
  {
    console.log(err);
  });

//putting following usernames in array
axios.get('https://api.github.com/users/padawan98/following')
.then(response =>
  {
    let myArr = response.data;
    myArr.forEach(element => 
    {
      followersArray.push(element.login);  
    });
  })
.catch(err =>
  {
    console.log(err);
  });

//looping for loop, fetching profile of following users
followersArray.forEach(element =>
{
  axios.get('https://api.github.com/users/' + element)
  .then(response =>
    {
      let frensData = response.data;  //fetch data => frensData
      entryPoint.appendChild(cardMaker(frensData)); //entryPoint = place in dom
    })
  .catch(err =>
    {
      console.log(err);
    }); 
});

/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/
