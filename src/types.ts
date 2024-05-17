export type DocData =
  | {
      name: string;
      type: string;
      fees: number;
      currency: string;
      patients: number;
      experience: number;
      ratings: number;
      timeSlots: [number];
      about: string;
    }
  | undefined;

export type RootStackParamList = {
  splash: undefined;
  start: undefined;
  userDetails: undefined;
  signIn: undefined;
  signUp: undefined;
  thankyou: undefined;
  otp: undefined;
  main: undefined;
};

export type HomeStackParamList = {
  home: undefined;
  doctorDetails: {id: number};
  appointmentConfirm: {
    docData: DocData;
  };
};

export type BottomTabParamsList = {homeTab: undefined; user: undefined};
