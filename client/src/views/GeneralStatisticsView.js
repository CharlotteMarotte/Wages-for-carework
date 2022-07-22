import React, { useEffect, useState } from 'react';

export default function GeneralStatisticsView(props) {
  const [totalOfAll, setTotalOfAll] = useState(0); // holds value of total of all all invoice totals (amount)
  const [totalHours, setTotalHours] = useState(0); // holds value of total of all all invoice totals (hours)
  const [averageAll, setAverageAll] = useState([]); // holds average hours, rate, amount for all invoice items

  // get all of this information on rendering of App to display it
  useEffect(() => {
    getTotalOfAll();
    getTotalHoursOfAll();
    getTotalAverageOfAll();
  }, []);

  async function getTotalOfAll() {
    try {
      let response = await fetch('/invoices/total'); // does GET by default
      if (response.ok) {
        let sum = await response.json();
        setTotalOfAll(sum);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  async function getTotalHoursOfAll() {
    try {
      let response = await fetch('/invoices/total-hours'); // does GET by default
      if (response.ok) {
        let sum = await response.json();
        setTotalHours(sum);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  async function getTotalAverageOfAll() {
    let averages = [];
    // calcualtes average for each category
    for (let c of props.billCatsFromApp) {
      try {
        let response = await fetch(`/invoices/average/${c.id}`); // does GET by default
        if (response.ok) {
          let average = await response.json();
          averages.push(average);
        } else {
          console.log(
            `Server error: ${response.status} ${response.statusText}`
          );
        }
      } catch (err) {
        console.log(`Server error: ${err.message}`);
      }
    }
    setAverageAll(averages);
  }

  return (
    <div className="genStatistics col-6 offset-3 mb-4">
      <p>
        Currently {props.invoicesFromApp.length} invoices have been created!
      </p>
      <p>
        All users combined have worked {totalHours} h for free with a monetary
        value of {totalOfAll} €.
      </p>

      {averageAll.map((a, index) => (
        <section key={index}>
          <h3>{a.catName}</h3>
          <p>On average users spent {a.avgHour}h on this task.</p>
          <p>On average users set their rate to {a.avgRate}€ for this task.</p>
          <p>On average the monetary value for this task would have been {a.avgAmount}€.</p>
        </section>
      ))}

      
    </div>
  );
}