// Mobile Nav Menu

const mobMenu = document.querySelector(".mobMenu");
const mobMenuBtn = document.getElementById("mobmenuBtn");

mobMenuBtn.addEventListener("click", function mobMenubtoggle() {
  mobMenu.classList.toggle("show")
})

// Tools Dropdown Menu

const toolMenu = document.querySelector(".tools-dropdown-menu");
const toolMenuBtn = document.getElementById("tool-btn");

toolMenuBtn.addEventListener("click", function toolsMenubtoggle() {
  toolMenu.classList.toggle("show")
})

const contactform = document.querySelector('.contact-form');

if (contactform) {
  const contactnameInput = contactform.querySelector('#name');
  const contactphoneInput = contactform.querySelector('#phone');
  const contactemailInput = contactform.querySelector('#email');
  const contactmsgInput = contactform.querySelector('#msg');
  const contactNameerrorDiv = document.querySelector('.nameerror-message');
  const contactEmailerrorDiv = document.querySelector('.emailerror-message');
  const contactphoneerrorDiv = document.querySelector('.phoneerror-message');
  const contactmsgerrorDiv = document.querySelector('.msgerror-message');

  contactform.addEventListener('submit', (event) => {
    event.preventDefault();

    // Validate name
    if (contactnameInput.value === '') {
      contactNameerrorDiv.innerHTML = 'Please enter your name.';
      contactnameInput.focus();
      // displayError('Please enter your name.');
      return;
    } else {
      contactNameerrorDiv.innerHTML = '';
    }

    // Validate email
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(contactemailInput.value)) {
      contactEmailerrorDiv.innerHTML = 'Please enter a valid email address.';
      contactemailInput.focus();
      return;
    } else {
      contactEmailerrorDiv.innerHTML = '';
    }

    // Validate phone number
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(contactphoneInput.value)) {
      contactphoneerrorDiv.innerHTML = 'Please enter a valid phone number.';
      contactphoneInput.focus();
      return;
    } else {
      contactphoneerrorDiv.innerHTML = '';
    }

    // Validate message
    if (contactmsgInput.value === '') {
      contactmsgerrorDiv.innerHTML = 'Please enter a message.';
      contactmsgInput.focus();
      return;
    } else {
      contactmsgerrorDiv.innerHTML = '';
    }

    // Submit the form
    contactform.submit();
  });
}

// Edit Profile Notification Close Btn

const EditProfileNotif = document.querySelector('.edit-profile');

if (EditProfileNotif) {
const EditCloseBtn = document.querySelector('.edit-prf-close-btn');

EditCloseBtn.addEventListener('click', function() {
  EditProfileNotif.style.display = "none";
})}