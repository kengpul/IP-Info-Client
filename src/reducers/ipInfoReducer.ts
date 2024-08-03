import { Reducer } from "react";
import IpInfo from "../types/IpInfo";

export enum IpInfoMethod {
  GET,
  ADD,
}

type IpInfoAction =
  | { type: IpInfoMethod.GET; payload: IpInfo[] }
  | { type: IpInfoMethod.ADD; payload: IpInfo };

type State = IpInfo[];

const ipInfoReducer: Reducer<State, IpInfoAction> = (state, action) => {
  switch (action.type) {
    case IpInfoMethod.GET: {
      return action.payload;
    }
    case IpInfoMethod.ADD: {
      return [action.payload, ...state];
    }
  }
};

export default ipInfoReducer;
