let likes = 0;
let userHasLiked = false;

const likeButton = document.getElementById('like-button');
const likesCount = document.getElementById('likes-count');

likeButton.addEventListener('click', () => {
    if (!userHasLiked) {
        likes++;
        userHasLiked = true;
        likeButton.classList.add('liked');
    } else {
        likes--;
        userHasLiked = false;
        likeButton.classList.remove('liked');
    }
    
    likesCount.textContent = `${likes} Likes`;
});