import {Area, AreaChart, CartesianGrid, Label, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import React from "react";
import styled from 'styled-components';


const ToolTipWrapper = styled.div`
    color:black;
    background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);
`;

const GradCard = styled.div`
  border-radius: 25px;
  background: linear-gradient(#20033c 0%, #303 100%);
  box-shadow: 5px 5px 7px rgba(0, 0, 0, 0.53);  
  height: 320px;
  display: flex;
  align-items: center;
  flex-direction: column;
  align-items: center !important;
  justify-content: center !important;
`;

const CustomTooltip = ({ active, payload, label }) => {
    console.log(label,payload);
    if (active) {
        return (
            <ToolTipWrapper className={"custom-tooltip"}>
                <p className="label">{`Date : ${label}`}</p>
                <p className={"desc"}> {payload[0].value}</p>
            </ToolTipWrapper>
        );
    }

    return null;
};

const GraphTile = (props)=>{
    return(
        <GradCard>
        <ResponsiveContainer height={300}>
            <AreaChart
                data={props.data}
                >
                <defs>
                    <linearGradient id="colorDeath" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#958686" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#958686" stopOpacity={0.2}/>
                    </linearGradient>
                    <linearGradient id="colorInfected" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#eada0a" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#eada0a" stopOpacity={0.2}/>
                    </linearGradient>
                    <linearGradient id="colorCured" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00ef00" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#00ef00" stopOpacity={0.2}/>
                    </linearGradient>
                </defs>
                {/*<CartesianGrid strokeDasharray="4 4"/>*/}
                <XAxis dataKey={"reportDate"} value="Date"  stroke="white" />
                <Label value="Date" offset={0} position="insideBottom" />
                <YAxis stroke="white" />
                <Area type="monotone" dataKey={props.dataKey} fillOpacity={1} stroke={props.stroke} fill={`url(#${props.fill})`}/>
                <Tooltip  content={CustomTooltip} />
            </AreaChart>
        </ResponsiveContainer>
        </GradCard>
    );
};

export  default GraphTile;