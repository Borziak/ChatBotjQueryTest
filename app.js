jQuery(document).ready(function($){
    $('#widget_button').draggable();
    let chat = {
        opened: false,
        active: false,
        guestName: '',
        firstTime: true,
        click: function () {
            this.opened ? this.close() : this.open();
        },
        open: function() {
            let button = $('#widget_button');
            let body = $('#widget_body');
            body.css({top: button.offset().top - body.outerHeight() - 40 + 'px', left: button.offset().left - body.outerWidth() + 100 + 'px'});
            button.addClass('clicked');
            body.addClass('opened');
            body.toggle('blind', {direction: 'down'}, 1000);
            button.draggable('disable');
            this.opened = true;
            this.firstTime ? (this.initialize(), this.firstTime = false) : null;
        },
        close: function () {
            $('#widget_button').removeClass('clicked');
            $('#widget_body').removeClass('opened');
            $('#widget_body').toggle('blind', {direction: 'down'}, 1000);
            this.opened = false;
            $('#widget_button').draggable('enable');
        },
        addMessage: function (text, sender) {
            let options = {direction: ''};
            sender === 'bot' ? options.direction = 'left' : options.direction = 'right';
            let newMessage = '<div class="widget_message ' + sender +'_message">' + text +'</div>';
            $(newMessage).appendTo('#widget_queue').show('drop', options, 600);
            console.log($(newMessage).text());
            if (sender === 'guest') {
                this.createResponse(text);
            }
        },
        initialize: function () {
            let self = this;
            setTimeout(function () {
                self.addMessage('Hello, dear Guest! My name is Mike! Happy to help you!', 'bot');
                setTimeout(function () {
                    self.addMessage('What is your name?', 'bot');
                }, 1300);
            }, 1600);
        },
        createResponse: function (text) {
            let regExp = /^(\/(\w+)(\s(\w+))*)/g;
            let result = regExp.exec(text);
            console.log(result);
        }
    };

    $('#widget_input').keydown(function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            chat.addMessage($(this).text(), 'guest');
            $(this).empty();
        }
    });

    $('#widget_button').on('click', function(){
        chat.click();
    });
});
