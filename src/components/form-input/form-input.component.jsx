import React,{useState,useEffect} from 'react';
import './form-input.styles.scss';


const FormInput = ({label,isTextArea=false,...props}) => {
  const [id,setId] = useState(0);

  useEffect(()=>{
    setId(Math.floor(Math.random()*10));
  },[])
  return(
    <div className="form-input">
      <label htmlFor={id}>{label.toUpperCase()}</label>
      <br/>
      {
        !isTextArea?
        <input type="text" id={id}  {...props} />
        :<textarea rows="7" {...props}></textarea>
      }
    </div>
  )
}

export default FormInput;