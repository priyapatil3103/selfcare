declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module 'react-native-upi-payment' {
  interface PaymentDetails {
    vpa: string;
    payeeName: string;
    amount: string;
    transactionRef: string;
  }

  interface PaymentSuccessResponse {
    status: string;
    approvalRefNo: string;
    responseCode: string;
    transactionId: string;
    transactionRef: string;
  }

  interface PaymentFailureResponse {
    status: string;
    responseCode: string;
    errorMessage: string;
  }

  export function initializePayment(
    paymentDetails: PaymentDetails,
    onSuccess: (successResponse: PaymentSuccessResponse) => void,
    onFailure: (failureResponse: PaymentFailureResponse) => void,
  ): void;
}
