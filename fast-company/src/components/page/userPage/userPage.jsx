import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../../api";
import Qualities from "../../ui/qulities";

const UserPage = () => {
  const [user, setUser] = useState();
  const { userId } = useParams();
  // const history = useHistory();
  // const { pathname } = useLocation();

  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data));
  }, []);
  // const handleClick = () => {
  //   history.push(`${pathname}/edit`);
  // };

  if (user) {
    return (
      <div className="container">
        <div className="card w-25 mt-3 shadow p-4 bg-dark text-white p-2">
          <div className="card-body ">
            <h1 className="card-title">{user.name}</h1>
            <h3 className="card-subtitle mb-2 text-muted">Профессия: {user.profession.name}</h3>
            <p className="card-text">
              <Qualities qualities={user.qualities} />
            </p>
            <p className="card-text">
              Встретился <span className="fw-bold">{user.completedMeetings}</span> раз
            </p>
            <h5 className="card-subtitle mb-3 fw-normal">
              Оценка: <span className="fw-bold">{user.rate}</span>
            </h5>
            <Link to={`/users/${user._id}/edit`}>
              <button className="btn rounded-pill btn-warning"> Изменить</button>
            </Link>
            <div className="mt-4">
              <Link className="btn rounded-pill btn-info" type="button" to="/users">
                Все пользователи
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <h1 className="loader-text"></h1>
      </div>
    );
  }
};

export default UserPage;
