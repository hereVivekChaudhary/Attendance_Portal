import { useEffect, useState } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { showAllClasses } from './operations/attendenceApi';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-hot-toast";
import { addStudent } from "./operations/attendenceApi";

const Home = () => {
  const dispatch = useDispatch();
  const {user}=useSelector(state=>state.auth);
  const email = user.email;
  const [classes, setClasses] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data={email:email,gmail:"email"};
        const response = await dispatch(showAllClasses(data));
        setClasses(response.data.classes);
        console.log("res",response.data.classes);
      } catch (error) {
        toast.error('Error while fetching classes');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="flex flex-row flex-wrap">
        {classes.map((element, key) => (
          <Link to={`/Menu/${element._id}`} key={key}>
          <div className="m-2 p-2 rounded w-[10rem] bg-green-400" >
            <div className="text-white">
              <p>{`Class: ${element.standard}`}</p>
              <p>{`Time: ${element.startTime} to ${element.endTime}`}</p>
              <p>{`Subject: ${element.subject}`}</p>
            </div>
          </div>
          </Link>
        ))}
      </div>
      {/* plus icon */}
      <Link to="/addclass">
        <div className="fixed bottom-2 rounded-full bg-green-300 p-3 right-3 animate-bounce">
          <div className="text-zinc-50">
            {/* icon */}
            <AiFillPlusCircle className="text-[4rem]" />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Home;
