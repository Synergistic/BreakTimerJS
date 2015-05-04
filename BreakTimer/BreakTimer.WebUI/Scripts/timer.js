$(document).ready(function () {
    $('.timer-text').text('0:00.0');
    $('.change-task-btn').hide();

    var timerLength = 3000.0;

    $('.start-timer').click(function () {
        $('.start-timer').toggleClass('disabled');
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
        $('.change-task-btn').hide();

    });

});

function RunTimer(length) {
    var start = new Date().getTime();

    var ticker = setInterval(function () {
        var time = new Date().getTime() - start;
        elapsed = Math.floor(time / 100) / 10;
        var remaining = Math.round((length - elapsed) * 10) / 10;
        $('.timer-text').text(FormatTime(remaining));

        
        if (remaining <= 0)
        {
            StopTimer(ticker);
            window.alert($('.task').text() + " over!");
            
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

function StopTimer(interval) {
    clearInterval(interval);
    $('.start-timer').toggleClass('disabled');
    $('.task-icon').toggleClass('fa-spin');
    $('.change-task-btn').show();
}

