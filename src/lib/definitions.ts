import { i18n } from "../../i18n-config";

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string;
};

export type Report = {
  filename: string;
  url: string;
};

export type TeamMember = {
  firstName: string;
  lastName: string;
  username: string;
  profileImage: string;
};

export type Activity = {
  firstName: string;
  lastName: string;
  action: "COMMENT" | "ACTIVATE" | "STOP";
  ts: number;
};

export type Smartphone = {
  id: number;
  brand_name: string;
  model: string;
  screen_size: number;
  price: number;
  release_year: number;
  operating_system: string;
  battery_capacity: number;
  ram: number;
  storage: number;
  camera_mp: number;
  front_camera_mp: number;
  refresh_rate: number;
  weight: number;
  thickness: number;
  body_material: string;
  chipset: string;
  gpu: string;
  dual_sim: string;
  network_support: string;
  bluetooth_version: string;
  wifi_version: string;
  usb_type: string;
  fast_charging: string;
  fingerprint_sensor: string;
};

export type Locale = (typeof i18n)["locales"][number];
