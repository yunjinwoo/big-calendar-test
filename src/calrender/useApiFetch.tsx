import { useEffect, useState } from "react";

  //https://dummyapi.io/explorer
const ApiList = {
  port: "https://dummyapi.io/data/v1/post",
  user: "https://dummyapi.io/data/v1/user",
};
type ApiName = keyof typeof ApiList;
export const useApiFetch = (name: ApiName) => {
  const [data, setData] = useState<any[]>();

  const fetchData = () => {
    console.log("---fetchData---");
    fetch(ApiList[name], {
      headers: {
        "App-Id": "6563747a46118f1534d8b5a9",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("response 2:", response);
        setData(response.data);
      })
      .catch((error) => console.log("error:", error));
  };

  useEffect(() => {
    return () => {
      fetchData();
    };
  }, []);

  return {
    data,
    fetchData
  };
};
