let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let gamePatternIndex = 0;
let gameStarted = false;

const nextSequence = () => {
    const randomNumber = Math.floor(Math.random() * 4);
    const buttonColors = ['red', 'yellow', 'blue', 'green'];
    const randomChosenColor = buttonColors[randomNumber];
    const colorid = '#' + randomChosenColor;
    let activeButton = document.querySelector(colorid);
    playSound(randomChosenColor);

    level += 1;
    activeButton.classList.add('hide');
    
    document.querySelector('#level-title').innerHTML = 'Level ' + level;

    setTimeout(() => {
        activeButton.classList.remove('hide');
    }, 100);
    // Attaches each event listener to each child.
    /*
    for (let i = 0; i < buttonColors.length; i++) {
        document.querySelectorAll('.btn')[i].addEventListener('click', (event) => {
            const userChosenColor = event.currentTarget.id;
            userClickedPattern.push(userChosenColor);
            playSound(userChosenColor);
            animatePress('#' + userChosenColor);
        })
    }
    */
    gamePattern.push(randomChosenColor);

    // Alternatively we can use event delegation: 
    document.querySelector('.container').addEventListener('click', (event) => {
        
        const target = event.target;
        if (target.matches('.btn')) {
            const userChosenColor = target.id;
            if (gamePattern[gamePatternIndex] === userChosenColor) {
                userClickedPattern.push(userChosenColor);
                playSound(userChosenColor);
                animatePress('#' + userChosenColor);
                gamePatternIndex += 1;
                if (gamePatternIndex === gamePattern.length) {
                    setTimeout(() => {
                        gamePatternIndex = 0;
                        userClickedPattern = [];
                        nextSequence();
                    }, 1500);
                }
            } else {
                let activeButton = document.querySelector('body');

                activeButton.classList.add('game-over');
                setTimeout(() => {
                    activeButton.classList.remove('game-over');
                }, 100);

                document.querySelector('#level-title').innerHTML = 'Game Over Press Any Key to Restart';
                startOver();
                playSound('mario');
            }
        }
        event.stopImmediatePropagation();
    
    });
}

const playSound = (name) => {
    let audio = new Audio('./sounds/' + name + '.mp3');
    audio.play();
}

const animatePress = (currentColor) => {
    let activeButton = document.querySelector(currentColor);

    activeButton.classList.add('pressed');


    setTimeout(() => {
        activeButton.classList.remove('pressed');
    }, 100);
}

const startOver = () => {
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    gamePatternIndex = 0;
    gameStarted = false;
}
document.addEventListener('keydown', (event) => {
    if (!gameStarted) {
        nextSequence();
        gameStarted = true;
    }
    
})
