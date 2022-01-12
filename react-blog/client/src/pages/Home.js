import React, {useEffect, useState} from 'react';
import axios from 'axios';

function Home() {

    const [entryList, setEntryList] = useState([]);

    useEffect(() => {
    axios.get('/entries').then( res => {
        setEntryList(res.data);
    });
    }, []);


    return (
        <div>
            {entryList.map((value, key) => {
            return (
            <div className="entry">
                <div className="title">{value.title}</div>
                <div className="body">{value.body}</div>
                <dive className="footer">{value.username}</dive>
            </div>
            )})}

        </div>
    )
}

export default Home
