export interface Node {
  id?: string;
  provider?: string;
  providerName?: string;
  providerWallet?: string;
  name?: string;
  type?: string;
  cost?: number;
  firstPrePaidMinutes?: number;
  firstVerificationsNeeded?: number;
  subsequentPrePaidMinutes?: number;
  subsequentVerificationsNeeded?: number;
  allowRefunds?: boolean;
  downloadSpeed?: number;
  uploadSpeed?: number;
  proxy?: [
    {
      port?: string;
      endpoint?: string;
      country_name?: string;
      country_code?: string;
      city?: string;
      continent_code?: string;
    }
  ];
  vpn?: any; // needs to be checked later when we have values for this object
  mSpeed?: number;
  mStability?: number;
  disable?: boolean;
  hash?: string;
}
