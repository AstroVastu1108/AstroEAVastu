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
    <div style={{ width: '975px', maxWidth: '975px', overflowX: 'auto' }}>
      <table className="summary-aspect-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {headerNames.map((headerName, index) => (
              <th 
                key={index}
                className="rowheader bg-primary"
                style={{
                  textAlign: index === 0 ? 'left' : 'center',
                  minWidth: index === 0 ? '100px' : '60px',
                  width: index === 0 ? '100px' : 'auto'
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
        .summary-aspect-table {
          font-family: inherit;
          font-size: 0.875rem;
          table-layout: fixed;
        }
        
        .summary-aspect-table th,
        .summary-aspect-table td {
          border: 1px solid #e0e0e0;
          padding: 4px 8px;
          vertical-align: middle;
        }
        
        .summary-aspect-table th {
          background-color: #f5f5f5;
          font-weight: 600;
          height: 36px;
          white-space: nowrap;
        }
        
        .summary-aspect-table td {
          height: 24px;
        }
        
        .summary-aspect-table tbody tr:hover {
          background-color: #f9f9f9;
        }
        
        .summary-aspect-table td:first-child {
          font-weight: 500;
        }

        /* Aspect color styles */
        .summary-aspect-table .positive {
          color: #22c55e;
          font-weight: 600;
        }
        
        .summary-aspect-table .negative {
          color: #ef4444;
          font-weight: 600;
        }
        
        .summary-aspect-table .neutral {
          color: #3b82f6;
          font-weight: 600;
        }
        
        .summary-aspect-table .rake {
          color: #8b5cf6;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 2px;
        }

        /* Responsive adjustments */
        @media (max-width: 975px) {
          .summary-aspect-table {
            font-size: 0.8125rem;
          }
          
          .summary-aspect-table th,
          .summary-aspect-table td {
            padding: 3px 6px;
          }
          
          .summary-aspect-table th {
            height: 32px;
          }
          
          .summary-aspect-table td {
            height: 22px;
          }
        }
      `}</style>
    </div>
  );
};

export default SummaryAspect;