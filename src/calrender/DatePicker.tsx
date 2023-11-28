import {useState} from "react"
import ReactDatePicker, { CalendarContainerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useBearState } from "./Store";

  /**
   * https://v5-0-6.mui.com/components/date-picker/
   * mui 로 가야하나??
   * */ 

export const ReactDatePickerTest = ({onChange}:{onChange:(date:Date)=>void}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dateStr = useBearState()
    const MyContainer = ({...props}:CalendarContainerProps) => {
      return <>@@@###{props.children}</>
    }
    return (
      <div style={{position:"absolute",zIndex:99999}}>
        
        <button onClick={() => setIsOpen(true)}>Open</button>
      <ReactDatePicker
        //calendarContainer={MyContainer}

       // isClearable={true}
        open={isOpen}
        shouldCloseOnSelect={true}
        //inline 
        selected={dateStr.date}
        onChange={(date,e) => {
          e?.preventDefault();

        //  if( date ) dateStr.setDate(date)
          if( date ){
            dateStr.setDate(date)
            onChange(date)
            setIsOpen(false)
          }
         
        }}
        onSelect={()=>{}}
        
        dateFormat="yyyy-MM-dd"
        excludeDates={[
          new Date("2023-09-01")
        ]}
        // excludeDates={[
        //   1661990400000, 1664582400000, 1667260800000, 1672531200000,
        // ]}
        showMonthYearPicker
        //showFullMonthYearPicker

        renderCustomHeader={({
          date,
          decreaseYear,
          increaseYear,
        }) => (
          <div
            style={{
              margin: 10,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button
              className="btn_month btn_month-prev"
              onClick={decreaseYear}
            >
              이전연도
            </button>
            <div className="month-day">
              {date.toString()}
            </div>
      
            <button
              className="btn_month btn_month-next"
              onClick={increaseYear}
             
            >
              다음연도
            </button>
          </div>
        )}
      >


        
  <div className="button-container">
    <div className="btn_ctrl btn_ctrl-cancel" >
      취소
    </div>
    <div className="btn_ctrl btn_ctrl-confirm" >
      선택
    </div>
  </div>

      </ReactDatePicker>
      </div>
    );
  };
  