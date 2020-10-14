// declare urls to fetch random images
const randomCatUrl = "https://aws.random.cat/meow"
const randomDogUrl = "https://random.dog/woof.json"
const randomFoxUrl = "https://randomfox.ca/floof/"

// declaration of other variables
const dropDown = document.querySelector('.dropdown');
const fetchForm = document.querySelector('.fetch-form');
const favoriteList = document.querySelector('.favorite');
const fetchDelay = 600;
let imageObject = {};
let favoriteImages = [];
let counter = 0;

// function for checking the type of animal submitted
const checkAnimal = (animal) => {
    if(animal === "Cat") {
        getNewImage(randomCatUrl);
        setTimeout(() => displayImage(imageObject.file), fetchDelay);
    };
    if(animal === "Dog") {
        getNewImage(randomDogUrl);
        setTimeout(() => displayImage(imageObject.url), fetchDelay);
    };
    if(animal === "Fox") {
        getNewImage(randomFoxUrl);
        setTimeout(() => displayImage(imageObject.image), fetchDelay);    
    };
}

// function for fetching a new image
const getNewImage = (url) => {
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            imageObject = data;
        });
} 

// add event listener to see if the form gets submitted.
fetchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    checkAnimal(dropDown.value);
});

// function for displaying the image on the webpage.
const displayImage = (imageName) => {
    const html = `<img src="${imageName}" onclick="markAsFavorite(this)"alt="failed to load image">`;
    document.querySelector('.image-wrapper').innerHTML = html;
}

// displays the favorite image of the provided index.
const displayFavorite = (imageIndex) => {
    displayImage(favoriteImages[imageIndex]);
}

// mark the picture as a favorite.
const markAsFavorite = (imageEl) => {
    if(favoriteImages.includes(imageEl.src)) {return};
    const listItem = document.createElement('li');
    listItem.value = counter;
    counter++;
    listItem.innerHTML = `Favorit bild ${counter}`;
    listItem.addEventListener('click', (event) => {displayFavorite(event.target.value)});
    favoriteList.appendChild(listItem);
    favoriteImages.push(imageEl.src);
}