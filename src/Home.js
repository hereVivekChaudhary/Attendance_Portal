import { AiFillPlusCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
const Home=()=>{
    const classes=[{
        class:"X",
        timing:"10-11"
        },
        {
          class:"IX",
          timing:"10-11"
          },
          {
            class:"XI",
            timing:"10-11"
            },
            {
              class:"XII",
              timing:"10-11"
              },
        
      ];

      return (
        <div>
        <div className="flex flex-row flex-wrap">
  {classes.map((element, key) => (
    <div className="m-2 p-2 rounded w-[10rem] bg-green-400" key={key}>
      {
        <div className=" text-white">
        <p>{element.class}</p>
        <p>{element.timing}</p>
        </div>
      }
    </div>
  ))}
</div>
{/* plus icon */}
<Link to="/addclass">
<div className=" fixed bottom-2 rounded-full bg-green-300 p-3 right-3 animate-bounce">
<div className=" text-zinc-50">
  {/* icon */}
<AiFillPlusCircle className=" text-[4rem] "/>
</div>
</div>
</Link>
</div>
      )
}
export default Home;