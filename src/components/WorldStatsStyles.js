import styled from "styled-components";

export const StatCard = styled.div`
  flex: 1;
  border-radius: 20px;
  background: linear-gradient(#20033c 0%, #070000 100%);
  box-shadow: 5px 5px 7px rgba(0, 0, 0, 0.53);
  margin: 10px;
  width: 272px;
`;
export const StatTitle = styled.span`
  font-weight: 400;
  font-size: 1.2rem;
  text-align: center;
  color: #fff;
  margin-top: 10px;
  margin-left: 15px;
  padding-top: 5px;
  justify-content: center;
  display: flex;
`;
export const InfectedTitle = styled.h2`
  flex: 1;
  font-weight: 300;
  text-align: center;
  color: #eada0a;
  opacity: 0.64;
  font-size: 3.2rem !important;
  flex: 1;
`;
export const CuredTitle = styled.span`
  flex: 1;
  font-weight: 300;
  text-align: center;
  color: #00ef00;
  opacity: 0.64;
  font-size: 3.2rem !important;
`;
export const StatWrapper = styled.div`
  display: flex;
  flex: 1;
  height: 80px;
`;
export const StatImage = styled.img`
  width: 80px;
  height: 80px;
  opacity: 0.65;
`;
export const DeathTitle = styled.span`
  flex: 1;
  font-weight: 600;
  font-size: 1.2rem;
  text-align: center;
  color: #958686;
  opacity: 0.69;
  margin-top: 10px;
  margin-left: 5px;
  padding-top: 5px;
  display: flex;
  justify-content: center;
`;
export const DeathValue = styled.h2`
  flex: 1;
  font-weight: 300;
  font-size: 3.2rem !important;
  text-align: center;
  color: #958686;
  opacity: 0.69;
`;