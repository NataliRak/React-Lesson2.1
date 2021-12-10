import SearchStatus from "./searchStatus";
import User from "./user";

function Users({ users, renderPhrase, ...props }) {
  return (
    <>
      {users.length === 0 ? (
        <SearchStatus phrase={renderPhrase} length={users.length} />
      ) : (
        <div>
          <SearchStatus phrase={renderPhrase} length={users.length} />
          <table className="table table-dark table-hover">
            <thead>
              <tr>
                <th scope="col">Имя</th>
                <th scope="col">Качества</th>
                <th scope="col">Профессия</th>
                <th scope="col">Встретился, раз</th>
                <th scope="col">Оценка</th>
                <th scope="col">Избранное</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <User key={user._id} user={user} {...props} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default Users;
