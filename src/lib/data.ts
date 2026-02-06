import { User, Report, TeamMember, Activity, Smartphone } from "@/lib/definitions";
import fs from "fs";
import path from "path";

export async function getUser(): Promise<User> {
  return new Promise((resolve) => {
    const user = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      profileImage:
        "https://images.unsplash.com/vector-1767626090408-a23fae603963?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    };

    setTimeout(() => resolve(user), 500);
  });
}

export async function getReports(): Promise<Report[]> {
  return new Promise((resolve) => {
    const reports: Report[] = [];

    setTimeout(() => resolve(reports), 500);
  });
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  return new Promise((resolve) => {
    const teamMembers: TeamMember[] = [
      {
        firstName: "Dries",
        lastName: "Vincent",
        username: "@driesvincent",
        profileImage:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        firstName: "Lindsay",
        lastName: "Walton",
        username: "@lindsaywalton",
        profileImage:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        firstName: "Courtney",
        lastName: "Henry",
        username: "@courtneyhenry",
        profileImage:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        firstName: "Whitney",
        lastName: "Francis",
        username: "@whitneyfrancis",
        profileImage:
          "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        firstName: "Leonard",
        lastName: "Krasner",
        username: "@leonardkrasner",
        profileImage:
          "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        firstName: "Floyd",
        lastName: "Miles",
        username: "@floydmiles",
        profileImage:
          "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        firstName: "Emily",
        lastName: "Selman",
        username: "@emilyselman",
        profileImage:
          "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    ];

    setTimeout(() => resolve(teamMembers), 500);
  });
}

export async function getActivities(): Promise<Activity[]> {
  return new Promise((resolve) => {
    const activities: Activity[] = [
      {
        firstName: "Dries",
        lastName: "Vincent",
        action: "COMMENT",
        ts: 1717514696008,
      },
      {
        firstName: "Whitney",
        lastName: "Francis",
        action: "COMMENT",
        ts: 1717427841000,
      },
      {
        firstName: "Floyd",
        lastName: "Miles",
        action: "ACTIVATE",
        ts: 1717340641000,
      },
      {
        firstName: "Emily",
        lastName: "Selman",
        action: "STOP",
        ts: 1717253241000,
      },
    ];

    setTimeout(() => resolve(activities), 500);
  });
}

export async function getSmartphones(): Promise<Smartphone[]> {
  return new Promise((resolve, reject) => {
    try {
      const csvPath = path.join(process.cwd(), "smartphones.csv");
      const fileContent = fs.readFileSync(csvPath, "utf-8");
      const lines = fileContent.split("\n");

      // Skip header and parse data
      const smartphones: Smartphone[] = [];
      for (let i = 1; i < lines.length && i <= 500; i++) { // Limit to first 500 records for performance
        const line = lines[i].trim();
        if (!line) continue;

        const values = line.split(",");
        if (values.length < 25) continue;

        smartphones.push({
          id: parseInt(values[0]),
          brand_name: values[1],
          model: values[2],
          screen_size: parseFloat(values[3]),
          price: parseInt(values[4]),
          release_year: parseInt(values[5]),
          operating_system: values[6],
          battery_capacity: parseInt(values[7]),
          ram: parseInt(values[8]),
          storage: parseInt(values[9]),
          camera_mp: parseInt(values[10]),
          front_camera_mp: parseInt(values[11]),
          refresh_rate: parseInt(values[12]),
          weight: parseInt(values[13]),
          thickness: parseFloat(values[14]),
          body_material: values[15],
          chipset: values[16],
          gpu: values[17],
          dual_sim: values[18],
          network_support: values[19],
          bluetooth_version: values[20],
          wifi_version: values[21],
          usb_type: values[22],
          fast_charging: values[23],
          fingerprint_sensor: values[24],
        });
      }

      resolve(smartphones);
    } catch (error) {
      console.error("Error reading smartphones.csv:", error);
      reject(error);
    }
  });
}
