let firstNameRegExp = /^[a-zA-Z]{2,20}$/;
let secondNameRegExp = /^[a-zA-Z]{2,20}$/;
let emailRegExp = /^[a-zA-Z][0-9a-zA-Z_.-]{2,21}@[a-zA-Z]{2,12}\.[a-zA-Z]{2,12}/i;
let passRegExp =/^[a-zA-Z]{8,15}$/;

let getSel = selector => document.querySelector(selector);
 
let signUpForm = document.forms.signUp;

let testFname = firstNameRegExp.test(signUpForm.firstName.value);
let testSname = secondNameRegExp.test(signUpForm.secondName.value);
let testEmail = emailRegExp.test(signUpForm.email.value);
let testPassword = passRegExp.test(signUpForm.password.value);

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
});
signUpForm.secondName.addEventListener('input', () =>{
    let testSname = secondNameRegExp.test(signUpForm.secondName.value);
    if(testSname){
        signUpForm.secondName.style.border = '2px solid green';
        getSel('.uncorrect-sname').style.display = 'none'
    }
    else{
        signUpForm.secondName.style.border = '2px solid red';
        getSel('.uncorrect-sname').style.display = 'block';
    }
});
signUpForm.email.addEventListener('input', () =>{
    let testEmail = emailRegExp.test(signUpForm.email.value);
    if(testEmail){
        signUpForm.email.style.border = '2px solid green';
        getSel('.uncorrect-email').style.display = 'none';
    }
    else{
        signUpForm.email.style.border = '2px solid red';
        getSel('.uncorrect-email').style.display = 'block';
    }
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
});
signUpForm.agree.addEventListener('click', ()=>{
    if(signUpForm.firstName.validity.valid && signUpForm.secondName.validity.valid && signUpForm.email.validity.valid
        && signUpForm.password.validity.valid && signUpForm.agree.checked){
        signUpForm.submit.disabled = false;
    }
    else{
        signUpForm.submit.disabled = true;
    }
});
signUpForm.submit.addEventListener('click', ()=>{
    getSel('.modal-block').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
})
document.getElementById('start').addEventListener('click', ()=>{
    getSel('.modal-block').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
    signUpForm.submit.disabled = true;
    signUpForm.firstName.style.border = 'none';
    signUpForm.secondName.style.border = 'none';
    signUpForm.email.style.border = 'none';
    signUpForm.password.style.border = 'none';
    signUpForm.reset();
});