import axios from "axios";
import { useEffect, useState } from "react";

export default function Index(){
    const token = localStorage.getItem('token');
    const [hello, setHello] = useState("");

    useEffect(() => {
        const fetchHello = async() =>{
            try{
                const response = await axios.get('https://frozen-dusk-10243-6bbfc1b3a39e.herokuapp.com/api/lobbies/hello', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
    
                console.log(response.data);

                setHello(response.data.info + '👋');
            }catch(error){
                console.error('Error:', error);
                setHello("Error occurred while fetching data");
            }    
        }

        if (token) {
            fetchHello(); // Invoke fetchHello function to make the API request
        } else {
            setHello("Unauthorized :(");
        }

    }, [token])

    

    return(
        <div className="index">
            <h1>{hello}</h1>
        </div>
    )
}