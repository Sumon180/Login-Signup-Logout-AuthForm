import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const Home = () => {
    const [auth, setAuth] = useState(false)
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')

    axios.defaults.withCredentials = true;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:8081");
                if (res.data.Status === "Success") {
                    setAuth(true);
                    setName(res.data.name)
                } else {
                    setAuth(false);
                    setMessage(res.data.Msg);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [])

    const handleLogOut = () => {
        axios.get("http://localhost:8081/logout")
            .then((res) => {
                if (res.data.Status === "Success") {
                    location.reload()
                } else {
                    alert("error")
                }
            })
            .catch(err => console.log(err)
            )
    }


    return (
        <div>
            {
                auth ?
                    (
                        <div>
                            <h3 className="text-3xl text-white my-5">You are Authorized {name}</h3>
                            <button onClick={handleLogOut} className="bg-rose-700 text-white hover:bg-rose-500 py-2 px-5 rounded-md">Logout</button>
                        </div>
                    )
                    :
                    (
                        <div>
                            <h3 className="text-white">{message}</h3>
                            <h3 className="text-3xl text-white my-5">Login Now</h3>
                            <Link to={"/login"} className="bg-yellow-600 hover:bg-yellow-500 py-2 px-5 rounded-md">Login</Link>
                        </div>
                    )
            }
        </div>
    )
}

export default Home
