import React, {useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

export default function PieChart(props) {
  useEffect(() => {
    formatData(props.data);
  }, [props.data]);

  const [data, setData] = useState({values: [], labels: []});

  function formatData(data) {
    let myData = {};
    myData.values = data.filter(e=> e.avgHour > 0).map((e) => e.avgHour);
    myData.labels = data.filter(e=> e.avgHour > 0).map((e) => e.catName);
    setData(myData);
  }

  if (!props.data) {
    return (
      <figure className="figure">
        <img
          src="/images/ErrorPage.jpg"
          className="figure-img img-fluid mb-0"
          alt="An error occurred"
        />
        <figcaption className="figure-caption text-center">
          <a href="https://www.vecteezy.com/vector-art/1384282-404-error-concept-for-landing-page-design">
            404 error concept for landing page design Vectors by Vecteezy
          </a>
        </figcaption>
      </figure>
    );
  }

  return (
    <div>
      <Plot
        data={[
          {
            values: data.values,
            labels: data.labels,
            type: 'pie',
          },
        ]}
        layout={{ height: 450, width: 550, title: 'Average hours by category', font: { family: 'Kosugi Maru, Helvetica, sans-serif', size: 14, color: 'black' } }}
      />
    </div>
  );
}
