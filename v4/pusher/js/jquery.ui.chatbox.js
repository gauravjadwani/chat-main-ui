/*
* Copyright 2010, Wen Pu (dexterpu at gmail dot com)
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*
* Check out http://www.cs.illinois.edu/homes/wenpu1/chatbox.html for document
*
* Depends on jquery.ui.core, jquery.ui.widiget, jquery.ui.effect
*
* Also uses some styles for jquery.ui.dialog
*
*/
// TODO: implement destroy()

(function($) {
    $.widget("ui.chatbox", {
        options: {
            id: null,
            title: null,
            user: null,
            hidden: false,
            offset: 0,
            width: 300,
            messageSent: function(id, user, msg) {
                this.boxManager.addMsg(user.first_name, msg);
            },
            boxClosed: function(id) {
            },
            boxManager: {
                init: function(elem) {
                    this.elem = elem;
                },
                addMsg: function(peer, msg) {
                    var self = this;
                    var box = self.elem.uiChatboxLog;
                    var e = document.createElement('div');
                    e.className =username;
                    box.append(e);
                    var systemMessage = false;
                    if (peer) {
                        var peerName = document.createElement("b");
                        var br=document.createElement("br");
                        //console.log($(peerName));
                        $(peerName).html(peer+ "<br>");
                        e.appendChild(peerName);
                    } else {
                        systemMessage = true;
                    }
                    var msgElement = document.createElement(
                        systemMessage ? "i" : "span");
                    $(msgElement).text(msg);
                    e.appendChild(msgElement);
                    $(e).addClass("ui-chatbox-msg");
                    $(e).css("maxWidth", $(box).width());
                    $(e).fadeIn();
                    self._scrollToBottom();
                    /*commenting highlighting the chatbox feature
                    if (!self.elem.uiChatboxTitlebar.hasClass("ui-state-focus") && !self.highlightLock) {
                    self.highlightLock = true;
                    self.highlightBox();}*/
                },
                highlightBox: function() {
                    var self = this;
                    self.elem.uiChatboxTitlebar.effect("highlight", {}, 300);
                    self.elem.uiChatbox.effect("bounce", {times: 3}, 300, function() {
                        self.highlightLock = false;
                        self._scrollToBottom();
                    });
                },
                toggleBox: function() {
                    this.elem.uiChatbox.toggle();
                },
                _scrollToBottom: function() {
                    var box = this.elem.uiChatboxLog;
                    box.scrollTop(box.get(0).scrollHeight);
                }
            }
        },
        toggleContent: function(event) {
            this.uiChatboxContent.toggle('slow');
            if (this.uiChatboxContent.is(":visible")) {
                this.uiChatboxInputBox.focus();
            }
        },
        widget: function() {
            return this.uiChatbox
        },
        _create: function() {
            var self = this,
            options = self.options,
            title = options.title || "No Title",
            uiChatbox = (self.uiChatbox = $('<div></div>'))
            .appendTo(document.body)
            .addClass('ui-widget ' +
                'ui-corner-top ' +
                'ui-chatbox'
                )
            .attr('outline', 0)
            .focusin(function() {
                self.uiChatboxTitlebar.addClass('ui-state-focus');
            })
            .focusout(function() {
                self.uiChatboxTitlebar.removeClass('ui-state-focus');
            }),
            uiChatboxTitlebar = (self.uiChatboxTitlebar = $('<div></div>'))
            .addClass('ui-widget-header ' +
                'ui-corner-top ' +
                'ui-chatbox-titlebar ' +
                'ui-dialog-header'
                )
            .click(function(event) {
                self.toggleContent(event);
            })
            .appendTo(uiChatbox),
            uiChatboxTitle = (self.uiChatboxTitle = $('<span></span>'))
            .html(title)
            .appendTo(uiChatboxTitlebar),
            uiChatboxTitlebarClose = (self.uiChatboxTitlebarClose = $('<a href="#"></a>'))
            .addClass('ui-corner-all ' +
                'ui-chatbox-icon '
                )
            .attr('role', 'button')
            .hover(function() { uiChatboxTitlebarClose.addClass('ui-state-hover'); },
                function() { uiChatboxTitlebarClose.removeClass('ui-state-hover'); })
            .click(function(event) {
                uiChatbox.hide();
                self.options.boxClosed(self.options.id);
                return false;
            })
            .appendTo(uiChatboxTitlebarClose),
            uiChatboxTitlebarMinimize = (self.uiChatboxTitlebarMinimize = $('<a href="#"></a>'))
            .addClass('ui-corner-all ' +
                'ui-chatbox-icon'
                )
            .attr('role', 'button')
            .hover(function() { uiChatboxTitlebarMinimize.addClass('ui-state-hover'); },
                function() { uiChatboxTitlebarMinimize.removeClass('ui-state-hover'); })
            .click(function(event) {
                self.toggleContent(event);
                return false;
            })
            .appendTo(uiChatboxTitlebar),
            uiChatboxTitlebarMinimizeText = $('<span></span>')
            .addClass('ui-icon ' +
                'ui-icon-minusthick')
            .text('minimize')
            .appendTo(uiChatboxTitlebarMinimize),
            uiChatboxContent = (self.uiChatboxContent = $('<div></div>'))
            .addClass('ui-widget-content ' +
                'ui-chatbox-content '
                )
            .appendTo(uiChatbox),
            uiChatboxLog = (self.uiChatboxLog = self.element)
            .addClass('ui-widget-content ' +
                'ui-chatbox-log'
                )
            .appendTo(uiChatboxContent),
            uiChatboxInput = (self.uiChatboxInput = $('<div></div>'))
            .addClass('ui-widget-content ' +
                'ui-chatbox-input'
                )
            .click(function(event) {
                // anything?
            })
            .appendTo(uiChatboxContent),
            uiChatboxInputBox = (self.uiChatboxInputBox = $('<textarea disabled="disabled"></textarea>'))
            .addClass('ui-widget-content ' +
                'ui-chatbox-input-box ' +
                'ui-corner-all'
                )
            .appendTo(uiChatboxInput)
            .keydown(function(event) {
                if (event.keyCode && event.keyCode == $.ui.keyCode.ENTER) 
                {
                  
                    msg = $.trim($(this).val());
                    if(event.shiftKey)
                    {
                         msg = msg+"\n";
                        $(this).val(msg);
                        return false;
                    }
                    if (msg.length > 0)  {
                       /* console.log('msg '+msg);*/
                        $.ajax({
                            url: 'new_message.php',
                            type: 'post',
                            data: {
                                "text":{'message':msg,'channel_id':window.channel_id}
                            }
                        });
                    }
                    $(this).val('');
                    return false;
                }
            })
            .focusin(function() {
                uiChatboxInputBox.addClass('ui-chatbox-input-focus');
                var box = $(this).parent().prev();
                box.scrollTop(box.get(0).scrollHeight);
            })
            .focusout(function() {
                uiChatboxInputBox.removeClass('ui-chatbox-input-focus');
            });
            uiChatboxTitlebar.find('*').add(uiChatboxTitlebar).disableSelection();
            uiChatboxContent.children().click(function() {
                self.uiChatboxInputBox.focus();
            });
            self._setWidth(self.options.width);
            self._position(self.options.offset);
            self.options.boxManager.init(self);
            if (!self.options.hidden) {
                uiChatbox.show();
            }
        },
        _setOption: function(option, value) {
            if (value != null) {
                switch (option) {
                    case "hidden":
                    if (value)
                        this.uiChatbox.hide();
                    else
                        this.uiChatbox.show();
                    break;
                    case "offset":
                    this._position(value);
                    break;
                    case "width":
                    this._setWidth(value);
                    break;
                }
            }
            $.Widget.prototype._setOption.apply(this, arguments);
        },
        _setWidth: function(width) {
            width=99.75;
            this.uiChatboxTitlebar.width(width + "%");
            this.uiChatboxLog.width(width + "%");
            this.uiChatboxInput.css("width", width + "%");
            this.uiChatboxInputBox.css("width", (width - 4) + "%").css("overflow","auto");
        },
        _position: function(offset) {
            this.uiChatbox.css("right", offset);
        }
    });
}(jQuery));