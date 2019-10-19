const playButton = document.querySelector('.btn-play')

let images = ['images/play-button.svg', 'images/stop-button.svg']
playButton.addEventListener('click', () => {
  images = images.reverse()
  playButton.src = images[0]
})
