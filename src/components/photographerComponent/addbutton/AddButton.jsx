import "./addButton.css"
import { useNavigate } from "react-router-dom";
 

export default function AddButton({buttonType}) {
  const navigate = useNavigate();

  const handelClick = () =>{
    navigate('form');
  }
  return (
    <div >
        <div className="addButton">
          <div className="inputButton">
            <input type="submit"  value="Add" onClick={handelClick} />
          </div>
        </div>
    </div>
  )
}
