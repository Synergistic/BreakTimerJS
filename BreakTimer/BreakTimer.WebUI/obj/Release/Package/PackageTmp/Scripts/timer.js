$(document).ready(function () {
    $('.timer-text').text('0:00.0');
    $('.change-task-btn').toggleClass('disabled');
    $('.pause-timer').toggleClass('disabled');

    var timerLength =3000.0;
    var ticker;

    $('.start-timer').click(function () {
        $('.start-timer').toggleClass('disabled');
        $('.pause-timer').toggleClass('disabled');
        $('.task-icon').toggleClass('fa-spin');
        RunTimer(timerLength);
    });

    $('.change-task-btn').click(function () {
        
        if ($('.task').text() == "Break") {
            $('.task').text("Work");
            timerLength = 3000.0;
        }
        else {
            $('.task').text("Break");
            timerLength = 600.0;
        }
        $('.start-timer').toggleClass('disabled');
        $('.change-task-btn').toggleClass('disabled');
    });

    $('.pause-timer').click(function () {
        timerLength = Number($('.timer-text').text().split(":")[0]) * 60.0 + Number($('.timer-text').text().split(":")[1]);
        StopTimer();
        $('.start-timer').toggleClass('disabled');
    });

});

function RunTimer(length) {
    var start = new Date().getTime();

    ticker = setInterval(function () {
        var time = new Date().getTime() - start;
        var elapsed = Math.floor(time / 100) / 10;
        var secondsRemaining = Math.round((length - elapsed) * 10) / 10;
        $('.timer-text').text(FormatTime(secondsRemaining));

        if (secondsRemaining <= 0)
        {
            StopTimer();
            window.alert($('.task').text() + " over!");
            $('.change-task-btn').toggleClass('disabled');
        }
    }, 100);
}


function FormatTime(totalSeconds) {
    var minutes = Math.floor(totalSeconds / 60.0);
    var seconds = Math.round((totalSeconds % 60.0) * 10) / 10;
    if (seconds < 10) { seconds = '0' + seconds; }
    if (Math.round(seconds) == seconds) { seconds += '.0'; }
    return minutes.toString() + ':' + seconds.toString();
}

function StopTimer() {
    clearInterval(ticker);
    $('.pause-timer').toggleClass('disabled');
    $('.task-icon').toggleClass('fa-spin');
}

