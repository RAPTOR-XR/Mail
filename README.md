# **Mail**

#### ***Mail*** is a front-end for an email client that makes API calls to send and receive emails. The API is made in Python with Django framework.

#### For the visual representaion click the [video](https://youtu.be/6WC_3Yshl3A)
---

## **Specification:**

* ### Send Mail
    ##### When a user submits the email composition form, the JavaScript will actually send the email. Once the email has been sent, it will load the user’s sent mailbox.

* ### Mailbox
    ##### When a user visits their Inbox, Sent mailbox, or Archive, it will load the appropriate mailbox.

    * ##### When a mailbox is visited, the application will first query the API for the latest emails in that mailbox.
    * ##### When a mailbox is visited, the name of the mailbox will appear at the top of the page.
    * ##### Each email will then be rendered in its own box (e.g. as a <div> with a border) that displays who the email is from, what the subject line is, and the timestamp of the email.
    * ##### If the email is unread, it will appear with a white background. If the email has been read, it will appear with a green background.

* ### View Email
    ##### When a user clicks on an email, the user will be taken to a view where they see the content of that email. The application will show the email’s sender, recipients, subject, timestamp, and body.Once the email has been clicked on, it will mark the email as read.

* ### Archive and Unarchive
    ##### Users can archive and unarchive emails that they have received.

    * ##### When viewing an Inbox email, the user will be presented with a button that lets them archive the email. When viewing an Archive email, the user will be presented with a button that lets them unarchive the email. This requirement does not apply to emails in the Sent mailbox. Once an email has been archived or unarchived, it will load the user’s inbox.

* ### Reply
    ##### Allow users to reply to an email.

    * ##### When viewing an email, the user will be presented with a “Reply” button that lets them reply to the email.
    * ##### When the user clicks the “Reply” button, they will be taken to the email composition form.
    * ##### The composition form will be **Pre-filled** with the recipient field set to whoever sent the original email.
    * ##### The composition form will be **Pre-filled** with the subject line. If the original email had a subject line of *subject*, the new subject line will be Re: *subject*. (If the subject line already begins with Re: , it will not add it again.)
    * ##### The body of the email will be **Pre-filled** with a line like "On Jan 1 2020, 12:00 AM user@example.com wrote:" followed by the original text of the email.