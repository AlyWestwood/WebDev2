import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {

    const [entryList, setEntryList] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
    axios.get('/entries').then( res => {
        setEntryList(res.data);
    });
    }, []);


    return (
        <div>
            {entryList.map((entry) => {
            return (
            <div key={entry.id} className="entry" onClick={() => {
                navigate(`/entry/${entry.id}`)
            }} >
                <div className="title">{entry.title}</div>
                <div className="body">{entry.body}</div>
                <div className="footer">{entry.username}</div>
            </div>
            )})}

        </div>
    )
}

export default Home
