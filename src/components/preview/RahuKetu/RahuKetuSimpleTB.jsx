import React from 'react'

function RahuKetuSimpleTB({ RahuData, KetuData, SelectedEventVal }) {

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
      <div className={`pl-${fullName} planetName`} key={abbreviation}>
        {value}
      </div>
    );
  };

  const applyOccupancyColor = (Occupancy) => {
    if (SelectedEventVal) {
      const positive = SelectedEventVal.Positive?.split(", ").map(Number) || [];
      const negative = SelectedEventVal.Negative?.split(", ").map(Number) || [];
      const occupancyNumber = Number(Occupancy);

      if (positive.includes(occupancyNumber)) {
        return <div className='bg-[var(--green-bg-color)] px-[2px]'>
          <span className="text-[var(--green-text-color)] font-ea-sb">{occupancyNumber}</span>
        </div>
      } else if (negative.includes(occupancyNumber)) {
        return <div className='bg-[var(--red-bg-color)] px-[2px]'>
          <span className="text-[var(--red-text-color)] font-ea-sb">{occupancyNumber}</span>
        </div>
      }
    }
    return Occupancy;
  };

  const applyOwnerShipColor = (OwnershipArray) => {
    const formattedOwnership = OwnershipArray.map((ownershipItem, index) => {
      const ownershipNumber = Number(ownershipItem);

      if (SelectedEventVal) {
        const positiveValues = SelectedEventVal.Positive.split(', ').map(Number);
        const negativeValues = SelectedEventVal.Negative.split(', ').map(Number);

        if (positiveValues.includes(ownershipNumber)) {
          return (
            <div className="flex" key={index}>
              <div className='bg-[var(--green-bg-color)] px-[2px]'>
                <span className="text-[var(--green-text-color)] font-ea-sb">
                  {ownershipItem}
                </span>
              </div>
              {index < OwnershipArray.length - 1 && <span>,&nbsp;</span>}
            </div>
          );
        } else if (negativeValues.includes(ownershipNumber)) {
          return (
            <div className="flex" key={index}>
              <div className='bg-[var(--red-bg-color)] px-[2px]'>
                <span className="text-[var(--red-text-color)] font-ea-sb">
                  {ownershipItem}
                </span>
              </div>
              {index < OwnershipArray.length - 1 && <span>,&nbsp;</span>}
            </div>
          );
        }
      }
      return (
        <span key={index}>
          {ownershipItem}
          {index < OwnershipArray.length - 1 && <span>,&nbsp;</span>}
        </span>
      );
    });
    return formattedOwnership;
  }

  const renderScriptCell = (dataValue) => {
    if (Array.isArray(dataValue)) {
      return (
        <>
          {dataValue.map((element, index) => (
            <div className="valueData flex" key={index}>
              {highlightText(element?.Planet)}
              <div className="degreeDiv">
                {applyOccupancyColor(element?.Occupancy)}
                {element?.Ownership?.length ? <span style={{ display: "flex" }}>&nbsp;/&nbsp;{applyOwnerShipColor(element?.Ownership)}</span> : ""}
              </div>
            </div>
          ))}
        </>
      );
    } else {
      const Occupancy = dataValue?.Occupancy || "";
      const OwnershipArray = dataValue?.Ownership || [];
      return (
        <div className="valueData flex">
          {highlightText(dataValue?.Planet)}
          <div className="degreeDiv">
            {applyOccupancyColor(Occupancy)}
            {OwnershipArray.length ? <span style={{ display: "flex" }}>&nbsp;/&nbsp;{applyOwnerShipColor(OwnershipArray)}</span> : ""}
          </div>
        </div>
      );
    }
  };

  const rows = [
    { id: 'conjunction', label: 'Conjunction', rahuData: RahuData.Conjunction, ketuData: KetuData.Conjunction },
    { id: 'aspect', label: 'Vedic Aspect', rahuData: RahuData.Aspect, ketuData: KetuData.Aspect },
    { id: 'nakshatra', label: 'Nakshatra', rahuData: RahuData.NL, ketuData: KetuData.NL },
    { id: 'sign', label: 'Sign', rahuData: RahuData.RL, ketuData: KetuData.RL },
  ];

  const getRowHeight = (rahuData, ketuData) => {
    const rahuLength = Array.isArray(rahuData) ? rahuData.length : 0;
    const ketuLength = Array.isArray(ketuData) ? ketuData.length : 0;
    const maxLength = Math.max(rahuLength, ketuLength);
    return maxLength > 0 ? 22 * maxLength : 22;
  };

  return (
    <div style={{ display: 'flex', gap: '16px', width: '875px', maxWidth: '100%' }}>
      {/* Rahu Table */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <table className="rahu-ketu-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th className="rowheader bg-primary" style={{ width: '120px' }}>Rahu</th>
              <th className="rowheader bg-primary">{RahuData.ScriptFull}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} style={{ height: `${getRowHeight(row.rahuData, row.ketuData)}px` }}>
                <td>
                  <div className='rahuHeader font-ea-sb'>{row.label}</div>
                </td>
                <td>
                  {renderScriptCell(row.rahuData)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Ketu Table */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <table className="rahu-ketu-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th className="rowheader bg-primary" style={{ width: '120px' }}>Ketu</th>
              <th className="rowheader bg-primary">{KetuData.ScriptFull}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} style={{ height: `${getRowHeight(row.rahuData, row.ketuData)}px` }}>
                <td>
                  <div className='rahuHeader font-ea-sb'>{row.label}</div>
                </td>
                <td>
                  {renderScriptCell(row.ketuData)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .rahu-ketu-table {
          font-family: inherit;
          font-size: 0.875rem;
        }
        
        .rahu-ketu-table th,
        .rahu-ketu-table td {
          border: 1px solid #e0e0e0;
          padding: 4px 8px;
          vertical-align: middle;
        }
        
        .rahu-ketu-table th {
          background-color: #f5f5f5;
          // font-weight: 600;
          text-align: left;
          height: 32px;
        }
        
        .rahu-ketu-table td {
          min-height: 22px;
        }
        
        .rahu-ketu-table tbody tr:hover {
          background-color: #f9f9f9;
        }
        
        .valueData {
          gap: 8px;
          align-items: center;
          line-height: 1.4;
        }
        
        .degreeDiv {
          display: flex;
          align-items: center;
          gap: 2px;
        }

        @media (max-width: 875px) {
          .rahu-ketu-table {
            font-size: 0.8125rem;
          }
          
          .rahu-ketu-table th,
          .rahu-ketu-table td {
            padding: 3px 6px;
          }
        }
      `}</style>
    </div>
  )
}

export default RahuKetuSimpleTB
