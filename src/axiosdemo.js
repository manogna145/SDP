import React from 'react';
import Axios from 'axios';

function callAxios()
{
    // Axios.get('https://sdp-b3o1.onrender.com/klef/test')
    //     .then(res => getData(res.data))
    //     .catch(err => console.log(err));

    Axios.post('https://sdp-b3o1.onrender.com/klef/cse')
        .then(res => getData(res.data))
        .catch(err => console.log(err));
}

function getData(data)
{
    alert(data);
}

function AxiosDemo()
{
    return(
        <div>
            <h3>Axios Demo</h3>
            <button onClick={callAxios}>Submit</button>
        </div>
    );
}

export default AxiosDemo;