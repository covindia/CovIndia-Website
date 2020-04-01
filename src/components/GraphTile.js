import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import React from "react";

const GraphTile = (props)=>{
    return(
        <ResponsiveContainer height={400}>
            <AreaChart
                data={props.data}
                >
                <defs>
                    <linearGradient id="colorDeath" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#958686" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#958686" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorInfected" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#eada0a" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#eada0a" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorCured" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00ef00" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#00ef00" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3"/>
                <XAxis dataKey={"reportDate"}/>
                <YAxis />
                {/*<Area type="monotone" dataKey={confirmCount} stackId="1" stroke="#8884d8" fill="#8884d8" />*/}
                <Area type="monotone" dataKey={props.dataKey} fillOpacity={1} stroke={props.stroke} fill={`url(#${props.fill})`}/>
                <Tooltip />
                {/*<Area type="monotone" dataKey={recoveredCount} stackId="1" stroke="#ffc658" fill="#ffc658" />*/}
            </AreaChart>
        </ResponsiveContainer>
    );
};

export  default GraphTile;