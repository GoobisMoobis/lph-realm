/*
 * password-protected.js
 * A simple script to password-protect any HTML page.
 *
 * Usage:
 * 1. Include this script in the <head> of your HTML file:
 *    <script src="password-lock.js" data-password="<BASE64_PASSWORD>"></script>
 *    Replace <BASE64_PASSWORD> with your base64-encoded password.
 *
 * How it works:
 * - Hides the page content initially.
 * - Prompts the user to enter the password (decoded from base64).
 * - Reveals the content only when the correct password is entered.
 * - Keeps prompting until the correct password is entered or the user cancels.
 */

(function() {
  // Hide everything until unlocked
  document.documentElement.style.display = 'none';

  // Get the <script> element that loaded this file
  var script = document.currentScript || (function() {
    var scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1];
  })();

  // Read the base64-encoded password from data-password attribute
  var base64Pwd = script.getAttribute('data-password') || '';
  try {
    var password = atob(base64Pwd);
  } catch (e) {
    console.error('Invalid base64 password provided.');
    return;
  }

  // Prompt the user repeatedly until correct password or cancelled
  var userInput;
  while (true) {
    userInput = prompt('Please enter the password to view this page:');
    if (userInput === null) {
      // User clicked 'Cancel'; keep page hidden and exit
      return;
    }
    if (userInput === password) {
      // Correct password: reveal page
      document.documentElement.style.display = '';
      return;
    }
    alert('Incorrect password. Please try again.');
  }
})();
