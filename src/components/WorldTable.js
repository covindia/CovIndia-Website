import React, { useEffect, useState } from "react";
import { MDBDataTable, MDBContainer, MDBRow, MDBCol } from "mdbreact";
import useSWR from "swr";

const WorldTable = () => {
  const {
    data: covidCases,
    error: covidCasesError
  } = useSWR("https://covid19.mathdro.id/api/confirmed", url =>
    fetch(url).then(_ => _.json())
  );
  const [tableData, setTableData] = useState();
  useEffect(() => {
    const columns = [
      {
        label: "Country",
        field: "combinedKey",
        sortable: true
      },
      {
        label: "Confirmed",
        field: "confirmed",
        sortable: true
      },
      {
        label: "Recovered",
        field: "recovered",
        sortable: true
      },
      {
        label: "Deaths",
        field: "deaths",
        sortable: true
      }
    ];
    console.table(covidCases);
    setTableData({ columns: columns, rows: covidCases });
  }, [covidCases]);
  return (
    <>
      <MDBContainer>
        <MDBRow>
          <MDBCol>
            <MDBDataTable
              responsive
              theadTextWhite
              tbodyTextWhite
              striped
              data={tableData}
            />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
};

export default WorldTable;
