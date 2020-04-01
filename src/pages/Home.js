
import React from "react";
import WorldStats from "../components/WorldStats";
import WorldTable from "../components/WorldTable";
import WorldGraphs from "../components/WorldGraphs";

const Home = () =>{
    return(
        <>
            <WorldStats />
            <WorldGraphs/>
            <WorldTable />
        </>
    )
};

export default  Home;