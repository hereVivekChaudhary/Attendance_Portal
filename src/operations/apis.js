const BASE_URL=process.env.REACT_APP_BASE_URL;

export const authendpoints={
    SEND_OTP:BASE_URL+'/authentication/sendOtp',
    SIGNUP:BASE_URL+'/authentication/signup',
    LOGIN:BASE_URL+'/authentication/login',
    CHANGE_PASSWORD:BASE_URL+'/authentication/changePassword',
    FORGOT_PASSWORD:BASE_URL+'/authentication/forgotPassword',
    RESET_PASSWORD:BASE_URL+'/authentication/resetPassword',
}

export const userendpoints={
    CREATE_CLASS:BASE_URL+'attendance/createClass',
    SHOW_ALL_CLASSES:BASE_URL+'attendance/showAllClasses',
    SHOW_SINGLE_CLASS:BASE_URL+'attendance/studentTable',
    MARK_ATTENDENCE:BASE_URL+'attendance/submitAttendence',
    UPDATE_ATTENDENCE:BASE_URL+'attendance/updateAttendence',
}
