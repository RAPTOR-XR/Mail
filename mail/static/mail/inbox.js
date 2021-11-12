document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);
  document.querySelector('#compose-form').addEventListener('submit', send_email);

  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';
  document.querySelector('#email-view').style.display= 'none';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#email-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
  fetch('/emails/' + mailbox)
  .then(response => response.json())
  .then(emails => {
    emails.forEach(email => {
      const divv = document.createElement('div');
      divv.className = email['read'] ? "email-list-item-read":"email-list-item-unread";
      divv.innerHTML = `
        <span><b>${email['sender']}</b></span>
        <span><b>${email['subject']}</b></span>
        <span><b>${email['timestamp']}</b></span>
      `;
      divv.addEventListener('click', () => load(email['id']));
      document.querySelector('#emails-view').appendChild(divv);
    });
  })
}

function send_email(event){
  event.preventDefault()
  fetch('/emails',{method: 'POST', body: JSON.stringify({
    recipients: document.querySelector('#compose-recipients').value,
    subject: document.querySelector('#compose-subject').value,
    body: document.querySelector('#compose-body').value})
  })
  .then(response => load_mailbox('sent'));
}
 
function load(id){
  fetch('/emails/' + id)
  .then(response => response.json())
  .then(email => {
    document.querySelector('#emails-view').style.display = 'none';
    document.querySelector('#compose-view').style.display = 'none';
    document.querySelector('#email-view').style.display = 'block';

    document.querySelector('#email-view').innerHTML = `
      <ul>
        <li><b>From:</b> <span>${email['sender']}</span></li>
        <li><b>To:</b> <span>${email['recipients']}</span></li>
        <li><b>Subject:</b> <span>${email['subject']}</span></li>
        <li><b>Time:</b> <span>${email['timestamp']}</span></li>
      </ul>
      <p>${email['body']}</p>
    `;
    
    const reply = document.createElement('button');
    reply.className="btn btn-primary";
    reply.innerHTML="Reply";
    reply.addEventListener('click', function () {
      
      compose_email();
      document.querySelector('#compose-recipients').value = email['sender'];

      if (email['subject'].split(" ", 1)[0] != "Re:"){
        email['subject'] = "Re: " + email['subject']
      } //collected from Stackoverflow
      
      document.querySelector('#compose-subject').value = email['subject']
      document.querySelector('#compose-body').value = `On ${email['timestamp']}, ${email['sender']} wrote: ${email['body']}`;
    });
    document.querySelector('#email-view').appendChild(reply);

    const arch = document.createElement('button');
    arch.className = "btn btn-primary";
    arch.innerHTML = !email['archived'] ? 'Archive':'Unarchive';
    arch.addEventListener('click', () => {
      fetch('/emails/' + email['id'], {method: 'PUT', body: JSON.stringify({archived: !email['archived']})
      })
      .then(response => load_mailbox('inbox'))
    });
    document.querySelector('#email-view').appendChild(arch)
    
    const readed = document.createElement('button');
    readed.className = "btn btn-primary";
    readed.innerHTML = "Mark as unread"
    readed.addEventListener('click', () => {
      fetch('/emails/' + email['id'], {method: 'PUT', body: JSON.stringify({read: false})
      })
      .then(response => load_mailbox('inbox'))
    })
    document.querySelector('#email-view').appendChild(readed);

    if(!email['read']){
      fetch('/emails/' + email['id'],{method:'PUT', body: JSON.stringify({read:true})
      })
    }
  });
}
