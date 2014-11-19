describe("ContactMe widget", function() {
    var container;

    beforeEach(function() {
        container = $('<div>').contactme({url: '/email'});
    });

    it("should buid the form successfully", function() {
        var fieldNumber = container.find('form').children('.control-group').length;
        
        // email, text and submit
        expect(fieldNumber).toBe(3);
    });
    
    describe("when the form has invalid fields", function() {
        
        it("should indicate that no email was filled", function() {
            var valid = container.contactme('isValid');
            expect(valid).toBeFalsy();
            
            var invalidEmail = container.find('input[type=text]').parent().hasClass('error');
            expect(invalidEmail).toBeTruthy();
        });
        
        it("should indicate that an invalid email was filled", function() {
            var emailInput = container.find('input[type=text]').val("invalid_email");
            var valid = container.contactme('isValid');
            expect(valid).toBeFalsy();
            
            var invalidEmail = emailInput.parent().hasClass('error');
            expect(invalidEmail).toBeTruthy();
        });
        
        it("should indicate that no body was filled", function() {
            var valid = container.contactme('isValid');
            expect(valid).toBeFalsy();
            
            var invalidEmail = container.find('textarea').parent().hasClass('error');
        });
    });
    
    describe("when the form is valid", function() {
        
        beforeEach(function(done) {
            container.find('input[type=text]').val("valid_email@mail.com");
            container.find('textarea').val("this is a message");
            
            container.find('input[type=submit]').trigger('click');
            
            // wait for the request response
            setTimeout(function() {
                done();    
            }, 500);
        });
        
        it("should fail the email delivery due to an invalid URL request", function() {
            var invalidRequest = container.find('.request-message').hasClass('error');
            expect(invalidRequest).toBeTruthy();
        });

    });

  
});
