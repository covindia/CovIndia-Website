import React, { useEffect } from "react";
import { MDBCol, MDBContainer, MDBRow } from "mdbreact";
import useSWR from "swr";
import {
  CuredTitle,
  DeathTitle,
  DeathValue,
  InfectedTitle,
  StatCard,
  StatImage,
  StatTitle,
  StatWrapper
} from "./WorldStatsStyles";

const WorldStats = () => {
  const { data: generalDetails } = useSWR(
    "https://covid19.mathdro.id/api/",
    url => fetch(url).then(_ => _.json())
  );
  useEffect(() => {
    console.log(generalDetails);
  }, [generalDetails]);
  return (
    <>
      {generalDetails !== undefined ? (
        <MDBContainer>
          <MDBRow>
            <MDBCol sm="4">
              <StatCard>
                <StatTitle>Total Cases</StatTitle>
                <StatWrapper>
                  <InfectedTitle>
                    {generalDetails.confirmed.value}
                  </InfectedTitle>
                  <StatImage
                    src={`${process.env.PUBLIC_URL}/img/infected.png`}
                  />
                </StatWrapper>
              </StatCard>
            </MDBCol>
            <MDBCol sm="4">
              {" "}
              <StatCard>
                <StatTitle>Total Saved</StatTitle>
                <StatWrapper>
                  <CuredTitle>{generalDetails.recovered.value}</CuredTitle>
                  <StatImage src={`${process.env.PUBLIC_URL}/img/cured.png`} />
                </StatWrapper>
              </StatCard>
            </MDBCol>
            <MDBCol sm="4">
              <StatCard>
                <DeathTitle>Total Deaths</DeathTitle>
                <StatWrapper>
                  <DeathValue>{generalDetails.deaths.value}</DeathValue>
                </StatWrapper>
              </StatCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
};

export default WorldStats;
