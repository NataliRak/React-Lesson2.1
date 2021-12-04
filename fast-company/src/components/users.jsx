import React,{useState} from "react";
import api from "../api"

const Users = () => {

    const rate ="/5"
    const formatCount =()=> {
        if (count === 2 || count === 3 || count === 4) return count +" " + "человека тусуется с тобой сегодня"
        return count === 0?"никто не тусуется с тобой сегодня": count + " " + "человек тусуется с тобой сегодня"
    }
      
    const getBageClasses =()=> {
        let classes = "badge "
        classes+=count === 0 ?"bg-danger" : "bg-primary"
        return classes
    }
    
     const [users, setUsers] = useState(api.users.fetchAll())
     const [count, setCount] = useState(users.length)

     const handleDelete =(id) => {
        setCount((prevState)=>prevState -1)
        setUsers((prevState)=>prevState.filter((user)=>user !== id)) 
    }

     const renderBadgesQalities = (qualities) => {
        return qualities.map((quality) => (
          <span key={quality._id} className={`badge bg-${quality.color} m-1 `}>
            {quality.name}
          </span>
        ));
    };
    

    return (
        <>
            <h2>
                 <span className ={getBageClasses()}>{formatCount()}</span>
            </h2>
           
            <table className="table table-dark table-hover">

        <thead>
            <tr >
                <th scope="col">Имя</th>
                <th scope="col">Качества</th>
                <th scope="col">Профессия</th>
                <th scope="col">Встретился, раз</th>
                <th scope="col">Оценка</th>
                <th scope="col"></th>
            </tr>

        </thead>
        <tbody>
            
            {users.map((user)=> 
                (<tr key={user._id} >
                   <td>{user.name}</td> 
                   <td> {renderBadgesQalities(user.qualities)}</td>
                   <td>{user.profession.name}</td> 
                   <td>{user.completedMeetings}</td> 
                   <td>{user.rate}{rate}</td>
                   <td> <button className = "btn btn-danger btn-sm" onClick = {()=>handleDelete(user)}>delete</button></td>    
                </tr>)
            )}
                
        </tbody>
        </table>

        </>
    )
}


export default Users