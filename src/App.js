import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Autocomplete from './Autocomplete'
import { setUsers } from './redux/usersSlice';

function App() {
  const dispatch = useDispatch();
  const {users} = useSelector((state)=> state.users)

  //Get only usernames from users array
  const extractUserNames = (usersArray) => {
    return usersArray.map(function (user) {return user.username;});
  }

  const uri = "https://jsonplaceholder.typicode.com/users";

  useEffect(() => {
    const fetchUsers = () => {
      axios.get(uri)
      .then(response => dispatch(setUsers(response.data)))
      .catch(function (err) {
        console.log("Couldnt get users: " + err)
      })
    }

    fetchUsers();
  }, [dispatch])

  return (
    <div className="App">
      <Autocomplete data={extractUserNames(users)} />
    </div>
  );
}

export default App;
