import React, { useState } from 'react'
import "./NakshtraSummary.css"
import EventModel from '@/components/EventModel/eventModel';

function NakshtraSummarySimpleTB({ SummaryData, Aspect, symbols, SelectedEventVal }) {

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
            <div className={`pl-${fullName} row-title font-ea-sb`} key={abbreviation}>
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
                        <div className='flex' key={index}>
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
                        <div className='flex' key={index}>
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

    const [selectedRowId, setSelectedRowId] = useState(null);
    const [open, setOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState([]);
    const [selectedTitle, setSelectedTitle] = useState("");

    const handleAddClose = () => {
        setOpen(false);
    }

    const handleEvent = (type, house, title, data) => {
        setSelectedTitle(house + " 🡒 " + title);
        setOpen(true);
        setSelectedEvent(data);
    }

    const renderPlanetCell = (item) => {
        const { IsRetro, IsExalted, IsDebilitated, IsCombust, IsUntenanted, IsSelfStar, IsExchange } = item;
        const activeSymbols = [
            IsExalted && symbols.IsExalted,
            IsDebilitated && symbols.IsDebilitated,
            IsCombust && symbols.IsCombust,
            IsExchange && symbols.IsExchange,
            IsUntenanted && symbols.IsUntenanted,
            IsSelfStar && symbols.IsSelfStar,
            IsRetro && symbols.IsRetro,
        ].filter(Boolean).join(" ");

        return (
            <div className="planet-col-title cursor-pointer font-ea-sb">
                {highlightText(item.Planet)}
                {activeSymbols && <span className='rashiDiv' style={{ fontSize: "16px" }}>{activeSymbols}</span>}
            </div>
        );
    };

    const renderSignCell = (item) => {
        const Rashi = item?.Rashi?.slice(0, 3) || "";
        const Degree = item?.Degree?.split(":")[0] || "";
        const Min = item?.Degree?.split(":")[1] || "";

        return (
            <div className="planet-col-sign flex justify-between cursor-pointer">
                <div className='signDiv'>{Rashi}.</div>
                <span className='degreeDiv'>{Degree}° {Min}'</span>
            </div>
        );
    };

    const renderNakshatraCell = (item) => {
        return (
            <div className="planet-col-nakshatra flex justify-between cursor-pointer">
                <div>{item.Nakshatra}</div>
                <span>{item.NakshatraPada}</span>
            </div>
        );
    };

    const renderScriptCell = (scriptData) => {
        const planetName = scriptData?.Planet?.slice(0, 3) || "";
        const Occupancy = scriptData?.Occupancy || "";
        const OwnershipArray = scriptData?.Ownership || [];

        return (
            <div className="planet-col-script flex justify-between cursor-pointer">
                {highlightText(planetName)}
                <div className="degreeDiv">
                    {applyOccupancyColor(Occupancy)}
                    {OwnershipArray.length ? <span style={{ display: "flex" }}>&nbsp;/&nbsp;{applyOwnerShipColor(OwnershipArray)}</span> : ""}
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="nakshatra-table-container" style={{ width: '975px', overflowX: 'auto' }}>
                <table className="nakshatra-table" style={{ width: '975px', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            {Aspect === 'P' ? (
                                <th className="rowheader bg-primary" style={{ width: '90px' }}>Planet</th>
                            ) : (
                                <th className="rowheader bg-primary" style={{ width: '45px', textAlign: 'center' }}>#</th>
                            )}
                            <th className="rowheader bg-primary" style={{ width: '95px' }}>Sign</th>
                            <th className="rowheader bg-primary" style={{ width: '110px' }}>Nakshatra</th>
                            <th className="rowheader bg-primary" style={{ width: '90px' }}>Devta</th>
                            <th className="rowheader bg-primary" style={{ width: '100px' }}>
                                PL <span className="planet-col-title-small">(Source)</span>
                            </th>
                            <th className="rowheader bg-primary nl-column-cell" style={{ width: '100px' }}>
                                NL <span className="planet-col-title-small">(Result)</span>
                            </th>
                            <th className="rowheader bg-primary" style={{ width: '95px' }}>
                                SL <span className="planet-col-title-small">(Verifier)</span>
                            </th>
                            <th className="rowheader bg-primary" style={{ width: '70px' }}>PH</th>
                            <th className="rowheader bg-primary nlsl-column-cell" style={{ width: '100px' }}>
                                NL-SL <span className="planet-col-title-small">(InnerSelf)</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {SummaryData?.map((item, index) => (
                            <tr
                                key={index}
                                className={selectedRowId === index ? 'Mui-selected' : ''}
                                onClick={() => setSelectedRowId(index)}
                                style={{ height: '20px' }} // reduced row height
                            >
                                {Aspect === 'P' ? (
                                    <td>{renderPlanetCell(item)}</td>
                                ) : (
                                    <td style={{ textAlign: 'center' }}>
                                        <div className="planet-col-title cursor-pointer">
                                            <div className='planet-row font-ea-sb'>{index + 1}</div>
                                        </div>
                                    </td>
                                )}
                                <td>{renderSignCell(item)}</td>
                                <td>{renderNakshatraCell(item)}</td>
                                <td>
                                    <div className="plDiv cursor-pointer">
                                        <div className='signDiv'>{item.EnergyField}</div>
                                    </div>
                                </td>
                                <td onDoubleClick={() => handleEvent("cell", "PL", `${item?.PL?.Planet || ""} ${item?.PL?.ScriptFull || ""}`, `${item?.PL?.Planet || ""} ${item?.PL?.ScriptFull || ""}`)}>
                                    {renderScriptCell(item.PL)}
                                </td>
                                <td className="nl-column-cell" onDoubleClick={() => handleEvent("cell", "NL", `${item?.NL?.Planet || ""} ${item?.NL?.ScriptFull || ""}`, `${item?.NL?.Planet || ""} ${item?.NL?.ScriptFull || ""}`)}>
                                    {renderScriptCell(item.NL)}
                                </td>
                                <td onDoubleClick={() => handleEvent("cell", "SL", `${item?.SL?.Planet || ""} ${item?.SL?.ScriptFull || ""}`, `${item?.SL?.Planet || ""} ${item?.SL?.ScriptFull || ""}`)}>
                                    {renderScriptCell(item.SL)}
                                </td>
                                <td>
                                    <span className='planet-col-ph cursor-pointer'>{item.PHScriptFull}</span>
                                </td>
                                <td className="nlsl-column-cell" onDoubleClick={() => handleEvent("cell", "NLSL", `${item?.NLSL?.Planet || ""} ${item?.NLSL?.ScriptFull || ""}`, `${item?.NLSL?.Planet || ""} ${item?.NLSL?.ScriptFull || ""}`)}>
                                    {renderScriptCell(item.NLSL)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <style jsx>{`
  .nakshatra-table {
    font-family: inherit;
    font-size: 0.8rem; /* smaller font */
  }

  .nakshatra-table th,
  .nakshatra-table td {
    border: 1px solid #e0e0e0;
    padding: 2px 6px; /* reduced padding */
    vertical-align: middle;
  }

  .nakshatra-table th {
    background-color: #f5f5f5;
    font-weight: 600;
    text-align: left;
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .nakshatra-table tbody tr {
    cursor: pointer;
  }

  .nakshatra-table tbody tr:hover {
    background-color: #f5f5f5;
  }

  .nakshatra-table tbody tr.Mui-selected {
    background-color: #e3f2fd;
  }

  .planet-col-title-small {
    font-size: 0.7rem;
    font-weight: normal;
  }
`}</style>

        </>
    )
}

export default NakshtraSummarySimpleTB

