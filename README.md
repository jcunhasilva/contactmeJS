This is a simple jQuery plugin that may be used whenever there is a need to add a contact form to a website.
This project is available as a Jasmine Distribution with a sample test suite available in the file Spec/ContactMeSpec.js

The simplest way to use this widget is to pass the URL being used to send the email:

```javascript
$container.contactme({url: '/email'});
```

A more complex configuration allows you to configure the labels for each field, or even the template to render in the form (as long as the form structure is preserved):

```javascript
$container.contactme({ 
    url: '/email',
    labels: {
        from: 'Email',
        body: 'Text',
        submit: 'Send',
        email_error: 'Invalid email',
        body_error: 'Empty message',
        success: 'Message sent successfully',
        error: 'Message failed'
    },
    template: '<div class="control-group"><label>Email</label><input type="text"></div><div class="control-group"><label>Text</label><textarea rows="5"></textarea></div><div class="control-group"><input type="submit" class="btn btn-primary" value="Send"></div>'
);
```

You can check this widget in action in the following [sample website](http://valuenigmas.herokuapp.com/contact)
