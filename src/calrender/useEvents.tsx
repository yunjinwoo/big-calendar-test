import moment from "moment";
import { useState, useEffect } from "react";
import { Event } from "react-big-calendar";
import { useApiFetch } from "./useApiFetch";
import { useBearState } from "./Store";
interface Item extends Event {
  tags?: string[];
}
export const useEvents = () => {
  const fetch = useApiFetch("port");
  const [dataApi, setDataApi] = useState<Item[]>();
  const [data, setData] = useState<Item[]>();
  const [tags, setTags] = useState<string[]>();
  const dateStr = useBearState();

  useEffect(() => {
    if (fetch.data) {
      let selectDate = moment(dateStr.date).toDate();
      const fetchData = fetch.data.map((row) => {
        return rowToCalenderRow(
          row,
          selectDate.getFullYear(),
          selectDate.getMonth()
        );
      });
      setDataApi(fetchData);
      setData(fetchData);
      let tags: string[] = [];
      fetchData.forEach((r) => {
        if (r?.tags) tags = [...tags, ...r.tags];
      });
      setTags([...new Set(tags)]);
    }
  }, [fetch.data, dateStr]);

  const rowToCalenderRow = (
    row: any,
    year: number = 2023,
    month: number = 11
  ): Item => {
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
    const date = moment(row.publishDate);
    date.set("year", year);
    date.set("month", month);
    return {
      // id:row.id ,
      tags: row.tags,
      title: row.text,
      start: date.toDate(),
      end: date.add(2, "days").toDate(),
    };
  };

  return {
    data,
    tags,
    dataUpdate: (tag: string) => {
      console.group("tag", tag);
      if (tag === "") {
        setData(dataApi);
      } else {
        setData(
          dataApi?.filter((r) => {
            if (r.tags) {
              console.log("tags", tags);
              return r.tags.includes(tag);
            }
            return false;
          })
        );
      }

      console.groupEnd();
    },
  };
};
