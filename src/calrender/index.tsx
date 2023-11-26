import  { Calendar, ToolbarProps, momentLocalizer }  from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Events } from "./events";
import { useEvents } from "./useEvents";
import { useBearState } from "./Store";
import { ReactDatePickerTest } from "./DatePicker";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const { data } = useEvents();
  console.log("useEvents - data", data);

  const dateStr = useBearState();
  
  return (
    <div>
      @{dateStr.date?.toString()}@
      <Calendar
        localizer={localizer}
        events={
          data ?? [
            {
              title: "Dinner",
              start: new Date("2023-11-12T11:00:00.000Z"),
              end: new Date("2023-11-15T12:00:00.000Z"),
            },
          ]
        }
        //startAccessor="start"
        endAccessor="end"
        startAccessor={(event) => {
          // https://stackoverflow.com/questions/57287782/typeerror-dateget-method-is-not-a-function-in-react-big-calendar
          //console.log("startAccessor={(event) => {  ", event);
          
          return event.start ? new Date(event.start) : new Date;
        }}
        style={{ height: 1000, width: 1000 }}
        components={{
          //event: EventComponent({ data, change }),
          //data as events array and change is custom method passed into component(for perform any functionality on parent state)
          toolbar: CustomToolbar,
        }}
      />
    </div>
  );
};
/* 
https://codesandbox.io/p/sandbox/react-big-calendar-example-ptt3h?file=%2Fsrc%2FCalendar1.js%3A92%2C5-92%2C18

class CustomToolbar extends Toolbar {
  render() {
    return (
      <div className='rbc-toolbar'>
        <span className="rbc-btn-group">
          <button type="button" onClick={() => this.navigate('TODAY')} >today</button>
          <button type="button" onClick={() => this.navigate('PREV')}>back</button>
          <button type="button" onClick={() => this.navigate('NEXT')}>next</button>
        </span>
        <span className="rbc-toolbar-label">{this.props.label}</span>
      </div>
    );
  }

  navigate = action => {
    console.log(action);
    
    this.props.onNavigate(action)
  }
} */


export interface ICustomToolbarProps {
  toolbar: ToolbarProps;  
}


const CustomToolbar = (toolbar: ToolbarProps)  => {
  
//function CustomToolbar(props:React.ComponentType<ToolbarProps<any>>) {
  //console.log('CustomToolbar - props', props.)
  //const today = () => this.navigate('TODAY')
  console.log('CustomToolbar - toolbar', toolbar)
  console.log('CustomToolbar - toolbar.date', toolbar.date)
  return (
    <div className="toolbar-container">
      <div className="back-next-buttons">
        <button className="btn btn-back" onClick={()=>toolbar.onNavigate("TODAY")}>ToDay</button>
        <button className="btn btn-back" onClick={()=>toolbar.onNavigate("PREV")}>Prev</button>
        <button className="btn btn-back" onClick={()=>toolbar.onNavigate("NEXT")}>Next</button>
        <label className="label-date"><ReactDatePickerTest /></label>
      </div>
      
      <div className="filter-container">
      <button className="btn btn-back" onClick={()=>toolbar.onView("day")}><span className="label-filter-off">Day</span></button>
      <button className="btn btn-back" onClick={()=>toolbar.onView("week")}><span className="label-filter-off">Week</span></button>
      <button className="btn btn-back" onClick={()=>toolbar.onView("month")}><span className="label-filter-off">Month</span></button>
      <button className="btn btn-back" onClick={()=>toolbar.onView("agenda")}><span className="label-filter-off">agenda</span></button>
      </div>
    </div>
  );
}


/***
 *  export function CustomToolbar({...props}:React.ComponentType<ToolbarProps<Event, TResource>> ) {
  const {
    date,
  } = props;

  const navigate = (action) => {
    props.onNavigate(action);
  };

  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        <button type="button" onClick={navigate.bind(null, 'TODAY')}>
          이번달
        </button>
        <button
          type="button"
          onClick={navigate.bind(null, 'PREV')}
        >
          이전
        </button>
        <span className="rbc-toolbar-label">{`${date.getFullYear()}년 ${date.getMonth() + 1}월`}</span>
        <button
          type="button"
          onClick={navigate.bind(null, 'NEXT')}
        >
          다음
        </button>
      </span>
    </div>
  );
}
 */
export default MyCalendar;
