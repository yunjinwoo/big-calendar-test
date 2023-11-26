import {useState} from "react"
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useBearState } from "./Store";

  
export const ReactDatePickerTest = () => {
    const [startDate, setStartDate] = useState<Date>();
    const dateStr = useBearState()

    return (
      <ReactDatePicker
        selected={dateStr.date}
        onChange={(date) => date && dateStr.setDate(date)}
        dateFormat="MM/yyyy"
        // excludeDates={[
        //   1661990400000, 1664582400000, 1667260800000, 1672531200000,
        // ]}
        showMonthYearPicker
      />
    );
  };
  