$.widget("custom.contactme", {
    options: {
        from: '',
        url: '',
        labels: {
            from: 'E-mail',
            body: 'Text',
            submit: 'Send',
            email_error: 'Please insert a valid email',
            body_error: 'Please insert a message body',
            success: 'Message sent successfully',
            error: 'Message failed'
        },
        template: ''
    },
    
    _create: function() {
        if (this.options.template && typeof this.options.template == "string") {
            if (!this._validateCustomTemplate()) {
                throw "Invalid template!";
            }
        }
        else {
            this._buildForm();
        }
        
        this.element.html(this.elements.form);
        
        this._attachEvents();
    },
    
    _buildForm: function() {
        var contactForm = $('<form>', {class: 'form-horizontal well'});
        // from
        var fromField = $('<div>', {
            class: 'control-group',
            html: '<label>' + this.options.labels.from + '</label>' + '<input type="text">'
        });
        
        // body
        var bodyField = $('<div>', {
            class: 'control-group',
            html: '<label>' + this.options.labels.body + '</label>' + '<textarea rows="5"></textarea>'
        });
        
        var submitForm = $('<div>', {
            class: 'control-group',
            html: '<input type="submit" class="btn btn-primary" value="' + this.options.labels.submit + '">'
        });
        
        contactForm.append(fromField);
        contactForm.append(bodyField);
        contactForm.append(submitForm);
        
        this.elements = {
            form: contactForm,
            from: fromField.find('input'),
            body: bodyField.find('textarea'),
            submit: submitForm.children()
        };
    },
    
    _validateCustomTemplate: function() {
        var customTemplate = $(this.options.template);
        
        // if it is valid HTML and not attached to the page DOM
        if (customTemplate.html() && customTemplate.parent().length == 0) {
            this.elements = {
                form: customTemplate.find('form'),
                from: customTemplate.find('input[type=text]'),
                body: customTemplate.find('textarea'),
                submit: customTemplate.find('input[type=submit]')
            };
            
            // check for template integrity
            for (var key in this.elements) {
                if (this.elements[key].length != 1) {
                    return false;
                }
            }
            
            return true;
            
        }
        else {
            return false;
        }
    },
    
    _validateEmail: function(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },
    
    _clearFormState: function() {
        this.element.find('.control-group').removeClass('error');
        this.element.find('span.help-block').remove();
        this.element.find('label.control-label').remove();
    },
    
    isValid: function() {
        var content = this._getFormContent();
        var valid = true;
        
        var showErrorMsg = function(field, msg) {
            var fieldContainer = field.closest('.control-group');
            var errorMsg = $('<span>', {class: 'help-block', html: msg});
            fieldContainer.addClass('error');
            fieldContainer.append(errorMsg);
            valid = false;
        };
        
        // clear old state
        this._clearFormState();
        
        // check form integrity
        if (!content.from || !this._validateEmail(content.from)) {
            showErrorMsg(this.elements.from, this.options.labels.email_error);
        }
        
        if (!content.body) {
            showErrorMsg(this.elements.body, this.options.labels.body_error);
        }
        
        return valid;
    },
    
    _getFormContent: function() {
        return {
            from: this.elements.from.val(),
            body: this.elements.body.val()
        };
    },
    
    _attachEvents: function() {
        var that = this;
        
        this.elements.submit.click(function(e) {
            e.preventDefault();
            
            var showConfirmationMsg = function(cls, msg) {
                var msgHtml = '<label class="control-label">' + msg + '</label>';
                var msgContainer = $('<div>', {class: 'control-group request-message ' + cls}).html(msgHtml).hide();
                
                that.elements.submit.removeClass('disabled');
                that.elements.form.find('.request-message').remove();
                that.elements.form.prepend(msgContainer);
                msgContainer.fadeIn();
            };
            
            if (that.isValid() && !that.elements.submit.hasClass('disabled')) {
                // prevent the user from clicking the button again
                that.elements.submit.addClass('disabled');
                
                $.ajax({
                    url: that.options.url,
                    type: 'POST',
                    data: that._getFormContent(),
                    success: function() {
                        showConfirmationMsg('success', that.options.labels.success);
                    },
                    error: function() {
                        showConfirmationMsg('error', that.options.labels.error);
                    }
                });
            }
        });
    }
});
