let firstNameRegExp = /^[a-zA-Z]{2,20}$/;
let secondNameRegExp = /^[a-zA-Z]{2,20}$/;
let emailRegExp = /^[a-zA-Z][0-9a-zA-Z_.-]{2,21}@[a-zA-Z]{2,12}\.[a-zA-Z]{2,12}/i;
let passRegExp =/^[a-zA-Z0-9._-]{4,16}$/;

let getSel = selector => document.querySelector(selector);
 
let signUpForm = document.forms.signUp;
let signInForm = document.forms.signIn;
let signOutForm = document.forms.signOut;

let testFname = firstNameRegExp.test(signUpForm.firstName.value);
let testSname = secondNameRegExp.test(signUpForm.secondName.value);
let testEmail = emailRegExp.test(signUpForm.email.value);
let testPassword = passRegExp.test(signUpForm.password.value);

function checkInput(){
    if(signUpForm.firstName.validity.valid && signUpForm.secondName.validity.valid && signUpForm.email.validity.valid
        && signUpForm.password.validity.valid){
        signUpForm.submit.disabled = false;
        console.log('yes');
    }
    else{
        signUpForm.submit.disabled = true;
        console.log('no');
    }
}

signUpForm.firstName.addEventListener('input', () =>{
    let testFname = firstNameRegExp.test(signUpForm.firstName.value);
    if(testFname){
        signUpForm.firstName.style.border = '2px solid green';
        getSel('.uncorrect-fname').style.display = 'none'
    }
    else{
        signUpForm.firstName.style.border = '2px solid red';
        getSel('.uncorrect-fname').style.display = 'block';
    }
    checkInput();
});
signUpForm.secondName.addEventListener('input', () =>{
    let testSname = secondNameRegExp.test(signUpForm.secondName.value);
    if(testSname){
        signUpForm.secondName.style.border = '2px solid green';
        getSel('.uncorrect-sname').style.display = 'none';
       
    }
    else{
        signUpForm.secondName.style.border = '2px solid red';
        getSel('.uncorrect-sname').style.display = 'block';
    }
    checkInput();
});
signUpForm.email.addEventListener('input', () =>{
    let testEmail = emailRegExp.test(signUpForm.email.value);
    getSel('.exist-email').style.display = 'none';
    if(testEmail){
        signUpForm.email.style.border = '2px solid green';
        getSel('.uncorrect-email').style.display = 'none';
    }
    else{
        signUpForm.email.style.border = '2px solid red';
        getSel('.uncorrect-email').style.display = 'block';
    }
    checkInput();
});
signUpForm.password.addEventListener('input', () =>{
    let testPassword = passRegExp.test(signUpForm.password.value);
    if(testPassword){
        signUpForm.password.style.border = '2px solid green';
        getSel('.uncorrect-pass').style.display = 'none';
    }
    else{
        signUpForm.password.style.border = '2px solid red';
        getSel('.uncorrect-pass').style.display = 'block';
    }
    checkInput();
});

let userArr = [];
function addUser(){
    let userObj = {
        firstName : signUpForm.firstName.value,
        secondName: signUpForm.secondName.value,
        password: signUpForm.password.value,
        email: signUpForm.email.value
    }
    userArr.push(userObj);
    signUpForm.submit.disabled = true;
    signUpForm.firstName.style.border = 'none';
    signUpForm.secondName.style.border = 'none';
    signUpForm.email.style.border = 'none';
    signUpForm.password.style.border = 'none';
    signUpForm.reset();
}

signUpForm.submit.addEventListener('click', ()=>{
    if(localStorage.length > 0 && localStorage.getItem('userArr')){
        userArr = JSON.parse(localStorage.getItem('userArr'));
    }
    if(!userArr.some(login => login.email === signUpForm.email.value)){
        addUser();
    }
    else if(userArr.some(login => login.email === signUpForm.email.value)){
        getSel('.exist-email').style.display = 'block';
        signUpForm.email.style.border = '2px solid red';
    }
    localStorage.setItem('userArr', JSON.stringify(userArr));
    console.log(userArr);
});
// document.getElementById('start').addEventListener('click', ()=>{
//     signUpForm.submit.disabled = true;
//     signUpForm.firstName.style.border = 'none';
//     signUpForm.secondName.style.border = 'none';
//     signUpForm.email.style.border = 'none';
//     signUpForm.password.style.border = 'none';
//     signUpForm.reset();
// });

getSel('.signInLink').addEventListener('click', function(){
    getSel('.signUp-block').style.display = 'none';
    getSel('.signIn-block').style.display = 'block';
});

getSel('.signUpLink').addEventListener('click', function(){
    getSel('.signUp-block').style.display = 'block';
    getSel('.signIn-block').style.display = 'none';
});

signInForm.enterProfile.addEventListener('click', function(){
    userArr = JSON.parse(localStorage.getItem('userArr'));
    console.log(userArr)
    userArr.forEach(function(userEmail, i){
        if(localStorage.length === 0){
            getSel('.no-profile').innerText = 'local storage is empty';
            getSel('.no-profile').style.display = 'block';
        }
        if(signInForm.signInEmail.value === userEmail.email && signInForm.signInPassword.value === userEmail.password){
            console.log(userEmail.email, userEmail.password, userEmail.firstName, userEmail.secondName);
            getSel('.signIn-block').style.display = 'none';
            getSel('.container_profile').style.display = 'block';
            getSel('.name_account').innerText = userEmail.firstName + " " + userEmail.secondName;
            getSel('.email_account').innerText = userEmail.email;
        }
        else if(signInForm.signInEmail.value != userEmail.email && signInForm.signInPassword.value !=userEmail.password){
            getSel('.no-profile').innerText = 'Incorrect email or password';
            getSel('.no-profile').style.display = 'block';
        }
    });
});

signOutForm.out.addEventListener('click', function(){
    getSel('.signIn-block').style.display = 'block';
    getSel('.container_profile').style.display = 'none';
    getSel('.no-profile').style.display = 'none';
    signInForm.reset();
})