import { InjectedConnector } from "@web3-react/injected-connector";

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [5, 11155111],
});
