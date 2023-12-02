import ReactSelect from "react-select";
import { useUsers } from "./useUsers";

interface Props {
  tags?: string[];
  onChangeTag?:(r:string)=>void
}
const appendSelect = (r?:any[])=>{
  if( !r ) return undefined
  return [{value:"",label:"Select"}, ...r]
}
export const Search = ({ tags , onChangeTag}: Props) => {
  const { data: users } = useUsers();

  const tagsOption = appendSelect(tags?.map((r) => {
    return {
      value: r,
      label: r,
    };
  }));

  const options = appendSelect(users?.map((r) => {
    return {
      value: r.id,
      label: r.firstName,
    };
  }));

  console.log("useUsers - users", users);
  console.log("useUsers - options", options);
  
  return (
    <div>
      <div style={{ float: "right", width: 150 , position:"relative",zIndex:99999}}>
        <ReactSelect options={tagsOption} onChange={(r)=>{
          if(onChangeTag && r ) onChangeTag(r.value)
        }}/>
      </div>
      <div style={{ float: "right", width: 150 , position:"relative",zIndex:99999}}>
        <ReactSelect  options={options}/>
      </div>
    </div>
  );
};
