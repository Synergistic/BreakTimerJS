$(document).ready(function () {
    SetTimer('50', '0');
    $('.change-task-btn').toggleClass('disabled');
    $('.pause-timer').toggleClass('disabled');

    var timerLength = 3000.0;
    var ticker;

    $('.start-timer').click(function ()
    {
        $('.start-timer').toggleClass('disabled');
        $('.pause-timer').toggleClass('disabled');
        $('.task-icon').toggleClass('fa-spin');
        timerLength = Number($('.minutes').val()) * 60.0 + Number($('.seconds').val());
        RunTimer(timerLength);
    });

    $('.change-task-btn').click(function ()
    {
        if ($('.task').text() == "Break")
        {
            $('.task').text("Work");
            SetTimer('50', '0');
        }
        else
        {
            $('.task').text("Break");
            SetTimer('10', '0');
        }

        $('.start-timer').toggleClass('disabled');
        $('.change-task-btn').toggleClass('disabled');
    });

    $('.pause-timer').click(function ()
    {
        StopTimer();
        $('.start-timer').toggleClass('disabled');
    });

});

function RunTimer(length)
{
    var start = new Date().getTime();

    ticker = setInterval(function ()
    {
        var time = new Date().getTime() - start;
        var elapsed = Math.floor(time / 100) / 10;
        var secondsRemaining = Math.round((length - elapsed) * 10) / 10;
        $('.minutes').val(FormatMinutes(secondsRemaining));
        $('.seconds').val(FormatSeconds(secondsRemaining));

        if (secondsRemaining <= 0)
        {
            StopTimer();
            window.alert($('.task').text() + " over!");
            $('.change-task-btn').toggleClass('disabled');
        }
    }, 100);
}


function FormatMinutes(totalSeconds)
{
    return Math.floor(totalSeconds / 60.0).toString();
}

function FormatSeconds(totalSeconds)
{
    var seconds = Math.round((totalSeconds % 60.0) * 10) / 10;
    if (seconds < 10) { seconds = '0' + seconds; }
    if (Math.round(seconds) == seconds) { seconds += '.0'; }
    return seconds.toString();
}

function StopTimer()
{
    clearInterval(ticker);
    $('.pause-timer').toggleClass('disabled');
    $('.task-icon').toggleClass('fa-spin');
}

function SetTimer(minutes, seconds)
{
    $('.minutes').val(minutes);
    $('.seconds').val(seconds);
}

