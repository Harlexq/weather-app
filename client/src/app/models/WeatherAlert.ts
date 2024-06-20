export interface WeatherAlert {
  country_code: string;
  lon: number;
  timezone: string;
  lat: number;
  alerts: {
    regions: string[];
    ends_utc: string;
    effective_local: string;
    onset_utc: string;
    expires_local: string;
    expires_utc: string;
    ends_local: string;
    uri: string;
    onset_local: string;
    effective_utc: string;
    severity: string;
    title: string;
    description: string;
  }[];
  city_name: string;
  state_code: string;
}
