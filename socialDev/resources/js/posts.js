function likebutton(route, id) {
  fetch(route)
  
  let post = document.getElementById(id);
  
  let like = post.querySelector('.like');
  let countlike = like.querySelector('.countLike');
  
  let dislike = post.querySelector('.dislike');
  let countdislike = dislike.querySelector('.countLike');
  
  if (dislike.style.display == 'none') {
    like.style.display = 'none';
    dislike.style.display = 'flex';

    let value = parseInt(countlike.textContent);
    if(value == 1){
      countdislike.style.display = 'none';
      value -= 1;
      countdislike.querySelector('p').innerHTML = value;
    }
    else{
      value -= 1;
      countdislike.querySelector('p').innerHTML = value;
    } 
    localStorage.setItem('countDislike', countlike);      
  }
  else if(like.style.display == 'none'){
    dislike.style.display = 'none';
    like.style.display = 'flex';

    let value = parseInt(countdislike.textContent);
    if(isNaN(value) || value == 0 ){
      countlike.querySelector('p').innerHTML = 1;
    }
    else{
      let value = parseInt(countdislike.textContent);
      value += 1;
      countlike.querySelector('p').innerHTML = value;
    }   
    localStorage.setItem('countLike', countlike);
  }
}
function toggleModal(id) {
  let post = document.getElementById(id);
  let modal = post.querySelector('.marginModal');

  if (modal.style.display === 'flex') {
    modal.style.display = 'none';
  } else {
      modal.style.display = 'flex';
      document.addEventListener('keydown', function(event) {
          if (event.key === 'Escape') {
              modal.style.display = 'none';
          }
      });
  }
}