import React,{useState} from 'react'
import { callApi, errorResponse, setSession } from './main';

const popupwindowstyle={width:'320px',height:'450px', background:'white'};
const logodivstyle={height: '100px'}
const space={height:'10px'}


function Login(){
    const [passwordText, setPasswordText] = useState('');
    window.onload = function(){
        var login = document.getElementById('login');
        login.style.display="block";
        
    }
    

    function validate()
    {
        var T1=document.getElementById('T1');
        var T2=document.getElementById('T2');

        var url = "https://sdp-b3o1.onrender.com/login/signin";
        var data = JSON.stringify({
            emailid : T1.value,
            pwd : T2.value
        });
        callApi("POST", url, data, loginSuccess, errorResponse);
    }

    function loginSuccess(res)
    {
        var data = JSON.parse(res);
        if(data === 1)
        {
            var T1=document.getElementById('T1');
            setSession("sid", T1.value, (24 * 60));
            window.location.replace("/home");
        }
        else
            alert("Invalid Credentials!");
    }

    function registration(){
        var T1 = document.getElementById('T1');
        var T2 = document.getElementById('T2');
        T1.value="";
        T2.value="";
        
        var reg = document.getElementById('registration');
        var login = document.getElementById('login');
        login.style.display = "none";
        reg.style.display = "block";
    }

    function register(){
        

    // Function to handle onFocus event for password field
    
        var RT1 = document.getElementById('RT1');
        var RT2 = document.getElementById('RT2');
        var RT3 = document.getElementById('RT3');
        var RT4 = document.getElementById('RT4');
        var RT5 = document.getElementById('RT5');
        var RT6 = document.getElementById('RT6');
        RT1.style.border="";
        RT2.style.border="";
        RT3.style.border="";
        RT4.style.border="";
        RT5.style.border="";
        RT6.style.border="";
        if(RT1.value==="")
        {
            RT1.style.border = "1px solid red";
            RT1.focus();
            return;
        }
        if(RT2.value==="")
        {
            RT2.style.border = "1px solid red";
            RT2.focus();
            return;
        }
        if(RT3.value==="")
        {
            RT3.style.border = "1px solid red";
            RT3.focus();
            return;
        }
        if(RT4.value==="")
        {
            RT4.style.border = "1px solid red";
            RT4.focus();
            return;
        }
        if(RT5.value==="")
        {
            RT5.style.border = "1px solid red";
            RT5.focus();
            return;
        }
        if(RT6.value==="")
        {
            RT6.style.border = "1px solid red";
            RT6.focus();
            return;
        }
        if(RT5.value!==RT6.value)
        {
            alert("Password and Re-type Password must be same");
            RT5.style.border="1px solid red";
            RT5.focus();
            return;
        }

        var url = "https://sdp-b3o1.onrender.com/registration/signup";
        var data = JSON.stringify({
            firstname : RT1.value,
            lastname : RT2.value,
            contactno : RT3.value,
            emailid : RT4.value,
            pwd : RT5.value
        });
        callApi("POST", url,  data, registeredSuccess, errorResponse);
        //alert("Registered successfullty...");

        RT1.value="";
        RT2.value="";
        RT3.value="";
        RT4.value="";
        RT5.value="";
        RT6.value="";

        var login = document.getElementById('login');
        var registration = document.getElementById('registration');
        registration.style.display = 'none';
        login.style.display = 'block';
        if (RT5.classList.contains('touched')) {
            setPasswordText('Password must contain 8 characters, one digit, one uppercase, one lowercase, and one special character');
        }
        console.log(passwordText); 
    }

    function registeredSuccess(res)
    {
        
        var data = JSON.parse(res);
        alert(data);
    }

function handlePasswordFocus() {
        setPasswordText('Password must contain 8 characters, one digit, one uppercase, one lowercase, and one special character');
    }

    return(
        <div className='full-height'>
            <div id='header' className='loginheader'>Weather APP</div>
            <div id='content' className='logincontent'>
                <div id='login' className='popup'>
                    <div id='popupwindow' className='popupwindow' style={popupwindowstyle} >
                        <div className='loginstyle1'>Login</div>
                        <div className='loginstyle2'>
                            <div style={logodivstyle}>
                            </div>
                            <div>Username*</div>
                            <div><input type='text' id='T1' className='txtbox' /></div>
                            <div style={space}></div>
                            <div>Password*</div>
                            <div><input type='password' id='T2' className='txtbox' /></div>
                            <div style={space}></div>
                            <div style={space}></div>
                            <div><button className='btn' onClick={validate}>Sign In</button></div>
                            <div style={space}></div>
                            <div style={space}></div>
                            <div style={space}></div>
                            <div>New user? <label className='linklabel' onClick={registration}>Register here</label></div>
                        </div>
                    </div>
                </div>
                <div id='registration' className='popup'>
                    <div id='registrationwindow' className='popupwindow'  style={popupwindowstyle}>
                        <div className='loginstyle1'>New Registration</div>
                        <div className='loginstyle2'>
                            <div>First Name*</div>
                            <div><input type='text' id='RT1' className='txtbox' /></div>
                            <div style={space}></div>
                            <div>Last Name*</div>
                            <div><input type='text' id='RT2' className='txtbox' /></div>
                            <div style={space}></div>
                            <div>Contact Number*</div>
                            <div><input type='text' id='RT3' className='txtbox' /></div>
                            <div style={space}></div>
                            <div>Email ID*</div>
                            <div><input type='text' id='RT4' className='txtbox' /></div>
                            <div style={space}></div>
                            <div>Password*</div>
                            <div><input type='password' id='RT5' className='txtbox touched' onFocus={handlePasswordFocus} /><p style={{color:'red'}}>{passwordText}</p></div>
                            <div style={space}></div>
                            <div>Re-type Password*</div>
                            <div><input type='password' id='RT6' className='txtbox' /></div>
                            <div style={space}></div>
                            <div><button className='btn' onClick={register}>Register</button></div>
                        </div>
                    </div>
                </div>
            </div>
            <div id='footer' className='loginfooter'></div>
        </div>
    );
}

export default Login;