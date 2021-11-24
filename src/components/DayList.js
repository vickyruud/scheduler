import React from "react";
import DayListItem from "./DayListItem";
//creates the list of days

export default function DayList(props) {
  
  const days = props.days.map(day => {
   
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.value }
        setDay={set => props.setDay(day.name)}
      />
    );
  });

  return <ul>{days}</ul>;
}