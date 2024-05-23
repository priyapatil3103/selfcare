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
  doctorDetails: {
    id: number;
    selectedDate: string | undefined;
    selectedSlot: number | undefined;
    appointmentId?: number;
  };
  appointmentConfirm: {
    docData: DocData;
    selectedDate: string;
    selectedSlot: number;
  };
  payment: {id: number; selectedDate: string; selectedSlot: number};
  thankyou: undefined;
};

export type BottomTabParamsList = {homeTab: undefined; user: undefined};

export type Location = {lat: string; lng: string; name: string};
