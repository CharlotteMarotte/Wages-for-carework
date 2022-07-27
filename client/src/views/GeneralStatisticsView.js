import React, { useEffect, useState } from 'react';
import Api from '../helpers/Api';
import ShowAverages from '../components/ShowAverages';

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
      let response = await Api.getContent('/invoices/total');
      if (response.ok) {
        let sum = response.data;
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
      let response = await Api.getContent('/invoices/total-hours');
      if (response.ok) {
        let sum = response.data;
        setTotalHours(sum);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  async function getTotalAverageOfAll() {
    try {
      let response = await Api.getContent('/invoices/averages');
      if (response.ok) {
        let averages = response.data;
        setAverageAll(averages);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  return (
    <div className="genStatistics col-6 offset-3 mb-4">
      <ShowAverages
        countInvoices={props.countInvoices}
        totalOfAll={totalOfAll}
        totalHours={totalHours}
        averageAll={averageAll}
        general={true}
      />
    </div>
  );
}
