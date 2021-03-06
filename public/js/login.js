const loginFormHandler = async (event) => {
    event.preventDefault();
    const email = document.querySelector('#email-field').value.trim();
    const hashedPassword = document.querySelector('#password-field').value.trim();

    // console.log({email});
    // console.log({hashedPassword});

    if (email && hashedPassword) {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ email,hashedPassword }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to log in.');
      }
    }
  };
  
  const signupFormHandler = async (event)=>{
    event.preventDefault();
    console.log('clicked me');
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const hashedPassword = document.querySelector('#password-signup').value.trim();

    console.log(username);
    console.log(email);
    console.log(hashedPassword);

    if(username && email && hashedPassword){
      const response = await fetch('/api/user',{
        method:"POST",
        body:JSON.stringify({username,email,hashedPassword}),
        headers: { 'Content-Type': 'application/json' },
      })
      console.log(response);
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to sign up.');
      }
    }

  }
  document.querySelector('#createAccount').addEventListener('submit',signupFormHandler)
  document.querySelector('#login').addEventListener('submit',loginFormHandler)

  // $('#login').submit(loginFormHandler);
//   $('#createAccount').submit(signupFormHandler)