import useSWR from "swr";
import React from "react";
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";
import GraphTile from "./GraphTile";

const WorldGraphs = () => {
    const {data: dailyData} = useSWR(
        "https://covid19.mathdro.id/api/daily",
        url => fetch(url).then(_ => _.json())
    );
    const confirmCount = (x) => {
        return x.confirmed.total;
    };

    const deathCount = (x) => {
        return x.deaths.total;
    };

    const recoveredCount = (x) => {
        return x.recovered.total;
    };

    return (
        <MDBContainer>
            {dailyData !== undefined ?
                <MDBRow>
                    <MDBCol>
                        <h3>Total Confirmed Cases</h3>
                        <GraphTile
                            data={dailyData}
                            dataKey={confirmCount}
                            stroke={"eada0a"}
                            fill={"colorInfected"}
                        />
                    </MDBCol>

                    <MDBCol>
                        <h3>Total Deaths</h3>
                        <GraphTile
                            data={dailyData}
                            dataKey={deathCount}
                            stroke={"958686"}
                            fill={"colorDeath"}
                        />
                    </MDBCol>
                </MDBRow> : null}
        </MDBContainer>
    );
};

export default WorldGraphs;