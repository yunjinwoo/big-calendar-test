import { useEffect, useState } from "react";
import { useApiFetch } from "./useApiFetch";

class User{
  id:string=""
  title:string=""
  firstName:string=""
  lastName:string=""
  picture:string=""
  constructor(data:any){

  }
}
interface IUser{
  id:string
  title:string
  firstName:string
  lastName:string
  picture:string

}
export const useUsers = () => {
  const fetch = useApiFetch('user');
  const [data, setData] = useState<IUser[]>();
  
  useEffect(()=>{
    if( fetch.data ){
      setData(fetch.data.map(rowToCalenderRow))
    }
  },[fetch.data])

  const rowToCalenderRow = (row:any):IUser=>{
    /**
   {
    "id": "60d0fe4f5311236168a109ca",
    "title": "ms",
    "firstName": "Sara",
    "lastName": "Andersen",
    "picture": "https://randomuser.me/api/portraits/women/58.jpg"
}
     */
    return {
      id:row.id ,
      title:row.title ,
      firstName:row.firstName ,
      lastName:row.lastName ,
      picture:row.picture 
    }
  }

  return {
    data,
  };
};
