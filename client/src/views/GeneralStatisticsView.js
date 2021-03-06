import React, { useEffect } from 'react';
import ShowAverages from '../components/ShowAverages';
import PieChart from '../components/PieChart';
import { Link } from 'react-router-dom';


export default function GeneralStatisticsView(props) {
  // get all of this information on rendering of App to display it
  useEffect(() => {
    props.getUnfilteredAveragesCb();
  }, []);

  return (
    <div className="genStatistics col-6 offset-3 mb-4">
      <Link
        className="btn btn-outline-dark btn-signup text-uppercase"
        to="/filter-statistics"
      >
        Filter statistics
      </Link>
      <PieChart data={props.averagesAll.averages} />
      <ShowAverages
        countInvoices={props.countInvoices}
        generalData={props.averagesAll}
        averagesAll={props.averagesAll.averages}
        general={true}
      />
    </div>
  );
}
