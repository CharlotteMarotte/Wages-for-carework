import React from 'react';

import ShowAverages from '../components/ShowAverages';
import { Link } from 'react-router-dom';
import PieChart from '../components/PieChart';

export default function SpecificStatisticsView(props) {
  return (
    <div className="genStatistics col-6 offset-3 mb-4">
      <Link
        to="/filter-statistics"
        className="btn btn-outline-dark m-2 btn-block btn-signup text-uppercase offset-4 mb-5"
      >
        Back to Filter
      </Link>
      <PieChart data={props.averagesAll} />
      <ShowAverages averagesAll={props.averagesAll} />
    </div>
  );
}
