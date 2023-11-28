import moment from "moment";
import { useState, useEffect } from "react";
import { Event } from "react-big-calendar";

export const useEvents = () => {
  const [data, setData] = useState<Event[]>();
  //https://dummyapi.io/explorer
  const fetchData = () => {
    console.log('---fetchData---')
    fetch(
      "https://dummyapi.io/data/v1/post"
   , {
    headers:{
      "App-Id":"6563747a46118f1534d8b5a9"
    }
   } )
      .then((response) => response.json())
      .then (response => {
        console.log("response 2:", response)
        setData(response.data.map(rowToCalenderRow))
      })
      .catch((error) => console.log("error:", error));
  };
  
  const rowToCalenderRow = (row:any):Event=>{
    /**
     {
        "id": "60d21b4667d0d8992e610c85",
        "image": "https://img.dummyapi.io/photo-1564694202779-bc908c327862.jpg",
        "likes": 43,
        "tags": [
            "animal",
            "dog",
            "golden retriever"
        ],
        "text": "adult Labrador retriever",
        "publishDate": "2020-05-24T14:53:17.598Z",
        "owner": {
            "id": "60d0fe4f5311236168a109ca",
            "title": "ms",
            "firstName": "Sara",
            "lastName": "Andersen",
            "picture": "https://randomuser.me/api/portraits/women/58.jpg"
        }
    }
     */
    const date = moment(row.publishDate)
    date.set("year", 2023)
    date.set("month", 10)
    return {
     // id:row.id ,
      title:row.text ,
      start:date.toDate() ,
      end:date.add(2, 'days').toDate()
    }
  }
  useEffect(() => {
    return () => { fetchData() };
  }, []);

  return {
    data,
  };
};
