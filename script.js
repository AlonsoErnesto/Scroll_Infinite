const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photoArray = [];

// unplash api
const count = 10;
const apiKey = 'vG7kDjLyf52oyUg3ZnhTbCmYezDu1YktS_g6eOmMJ6A';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function setAttributes(element, attibutes){
  for(const key in attibutes){
    element.setAttribute(key, attibutes[key]);
  }
}

function imageLoaded(){
  imagesLoaded++;
  if(imagesLoaded === totalImages){
    ready = true;
    console.log('ready = ',ready);
  }
}

//displayPhotos
function displayPhotos(){
  totalImages = photoArray.length;
  console.log('total images',totalImages);
  photoArray.forEach((photo)=>{
    const item = document.createElement('a');
    setAttributes(item,{
      href:photo.links.html,
      target:'_blank',
    })

  const img = document.createElement('img');
    setAttributes(img,{
      src:photo.urls.regular,
      alt:photo.alt_description,
      title:photo.alt_description
    });
    item.addEventListener('load',imageLoaded);
    item.appendChild(img);
    imageContainer.appendChild(item);
  })
} 


async function getPhotos(){
 try{
    const response = await fetch(apiUrl);
    photoArray = await response.json();
    displayPhotos();
  } catch(err){
    console.log('error',err);
  }
}

window.addEventListener('scroll',()=>{
  if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
    ready = false;
    getPhotos();
  }
});


getPhotos();



