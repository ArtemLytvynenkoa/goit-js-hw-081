import Throttle from 'lodash.throttle';
import Player from '@vimeo/player';


const iframe = document.querySelector('#vimeo-player');
const player = new Vimeo.Player(iframe);

startCurrentTime();

player.on('timeupdate', Throttle(function(data) {
    const currentTime = data.seconds;
    console.log(currentTime)

    localStorage.setItem('videoplayer-current-time', currentTime);
}, 1000));
    
function startCurrentTime() {
    const currentTime = localStorage.getItem('videoplayer-current-time');

    player.setCurrentTime(currentTime).then(function(seconds) {
    // seconds = the actual time that the player seeked to
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

        default:
            // some other error occurred
            break;
    }
});
}



