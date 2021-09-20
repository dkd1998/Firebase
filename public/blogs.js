let postCollection = document.querySelector("#posts-collection");

const db = firebase.firestore();

function createPost(title, time, content, author) {
  let div = document.createElement("div");
  div.setAttribute("class", " card mb-4 col-12");
  div.setAttribute("id", "blogs");
  

  let h2 = document.createElement("h2");
  let h6 = document.createElement("h6");
  let p = document.createElement("p");
  let small = document.createElement("small");

  h2.textContent = title;
  h6.textContent = "Author: " + author;
  small.textContent = time;
  p.textContent = content;


  div.appendChild(h2);
  div.appendChild(h6);  
  div.appendChild(small);
  div.appendChild(p);


  postCollection.appendChild(div);
}

function getPosts() {
  db.collection("posts")
    .orderBy('createdAt', 'desc')
    .get()
    .then(snapshot => {
      snapshot.docs.forEach(docs => {
        createPost(
          docs.data().postName,
          docs.data().createdAt,
          docs.data().postContent,
          docs.data().author
          
        );
      });
    })
    .catch(err => {
      console.log(err);
    });
}

getPosts();


function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}


function findAuthor(){
  document.getElementById("auth-search").addEventListener("submit", (event) => {
    event.preventDefault()
})

const postContainer = document.querySelector('#posts-collection');
removeAllChildNodes(postContainer);

  let Author = document.querySelector("#auth").value;
  db.collection("posts")
  .where('author' ,'==', Author  )
  .get()
  .then(snapshot => {
    snapshot.docs.forEach(docs => {
      createPost(
        docs.data().postName,
        docs.data().createdAt,
        docs.data().postContent,
        docs.data().author
        
      );
      
    });
  })
  .catch(err => {
    console.log(err);
  });
}




firebase.auth().onAuthStateChanged((user)=>{
  if(!user){
      location.replace("index.html")
  }
})

function logout(){
  firebase.auth().signOut()
}

