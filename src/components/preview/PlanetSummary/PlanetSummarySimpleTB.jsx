import React, { useMemo } from 'react';
import "./PlanetSummary.css"

const SummaryAspect = ({ SummaryData, Aspect }) => {
  const formatAspect = (data) => {
    if (data?.IsWithRaKe) {
      return `<span class='rake'><span>${data?.Aspect}</span><span>⦿</span></span>`;
    } else if (data?.Aspect === 0 && data?.IsAspect) {
      return `<span class='neutral'>${data?.Aspect}</span>`;
    } else if (data?.IsPositive) {
      return `<span class='positive'>${data?.Aspect}</span>`;
    } else if (data?.IsAspect) {
      return `<span class='negative'>${data?.Aspect}</span>`;
    }
    return '';
  };

  const planetClass = {
    ketu: "ketu",
    venus: "venus",
    sun: "sun",
    moon: "moon",
    mars: "mars",
    rahu: "rahu",
    jupiter: "jupiter",
    saturn: "saturn",
    mercury: "mercury",
    uranus: "uranus",
    neptune: "neptune",
    pluto: "pluto"
  };

  const shorthandMap = {
    Ke: planetClass.ketu,
    Ve: planetClass.venus,
    Su: planetClass.sun,
    Mo: planetClass.moon,
    Ma: planetClass.mars,
    Ra: planetClass.rahu,
    Ju: planetClass.jupiter,
    Sa: planetClass.saturn,
    Me: planetClass.mercury,
    Ur: planetClass.uranus,
    Ne: planetClass.neptune,
    Pl: planetClass.pluto
  };

  const highlightText = (value) => {
    const abbreviation = value.trim().slice(0, 2);
    const fullName = shorthandMap[abbreviation];

    return (
      <span className={`pl-${fullName} row-title font-ea-sb`} key={abbreviation}>
        {value}
      </span>
    );
  };

  const { headerNames, rows } = useMemo(() => {
    const headerNames = Aspect === "P"
      ? ['Planet', 'Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury', 'Urans', 'Neptune', 'Pluto']
      : ['House', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

    const rows = SummaryData.map((planet, rowIndex) => ({
      id: rowIndex + 1,
      RowTitle: planet.RowTitle,
      aspects: planet.Aspect.map((data) => formatAspect(data))
    }));

    return { headerNames, rows };
  }, [SummaryData, Aspect]);

  return (
    <div className='summary-aspect-container rounded-md' style={{ width: '900px', maxWidth: '900px', overflowX: 'auto' }}>
      <table className="summary-aspect-table" style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0' }}>
        <thead>
          <tr>
            {headerNames.map((headerName, index) => (
              <th 
                key={index}
                className="rowheader bg-primary px-3 text-start"
                style={{
                  textAlign: index === 0 ? 'left' : 'center',
                  minWidth: index === 0 ? '70px' : '50px',
                  width: index === 0 ? '70px' : 'auto'
                }}
              >
                {headerName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td style={{ textAlign: 'left' }}>
                {highlightText(row.RowTitle)}
              </td>
              {row.aspects.map((aspect, index) => (
                <td key={index} style={{ textAlign: 'center' }}>
                  <span 
                    className="summaryTxt font-ea-sb" 
                    dangerouslySetInnerHTML={{ __html: aspect }} 
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

    <style jsx>{`
      .summary-aspect-container {
        border: 1px solid var(--border-color);
        border-radius: 8px;
        overflow: hidden;
        background: var(--card-bg, #fff);
      }

      .summary-aspect-table {
        font-family: inherit;
        border-collapse: separate;
        border-spacing: 0;
        width: 100%;
      }

      th{
        height: 38px;
      }

      td{
        height: 29px;
        padding-left: 10px;
        padding-right: 10px;
      }

      /* Remove outer cell borders for header only so container border is the frame */
      .summary-aspect-table thead th {
        border: none !important;
        vertical-align: middle;
      }

      /* Horizontal separators between rows (drawn on cells) */
      .summary-aspect-table tbody td {
        border-bottom: 1px solid var(--border-color) !important;
        vertical-align: middle;
      }

      /* Remove bottom border on last row so container border is visible */
      .summary-aspect-table tbody tr:last-child td {
        border-bottom: none !important;
      }

      /* Vertical separators between columns */
      .summary-aspect-table tbody td + td {
        border-left: 1px solid var(--border-color) !important;
      }

      /* Alternate row colors */
      .summary-aspect-table tbody tr:nth-child(odd) {
        background-color: #ffffff; /* white */
      }

      .summary-aspect-table tbody tr:nth-child(even) {
        background-color: #f5f5f5; /* light gray */
      }

    `}</style>
    </div>
  );
};

export default SummaryAspect;