


export enum API_PATHS{
    // User Authentication
    USER_LOGIN="api/Authentication/Login",
    USER_SIGNUP="api/Authentication/signup",
    USER_LOGOUT="api/Authentication/Logout",
    USER_VERIFY="api/Authentication/VerifyToken",
    USER_ME="api/Authentication/user",
   
    // User Management
    USER_PROFILE="api/UserManagement/profile",
    USER_AVAILABILITY="api/UserManagement/availability",
    USER_LOCATION="api/UserManagement/locationManagement",
    USER_ROLE ="api/UserManagement/role",


    // Blood Request
    BLOOD_REQUEST_CREATE="api/BloodRequest/create",
    BLOOD_REQUEST_UPDATE="api/BloodRequest/update",
    BLOOD_REQUEST_DELETE="api/BloodRequest/delete",
    BLOOD_REQUEST_LIST="api/BloodRequest/list",
    BLOOD_REQUEST_CONFIRM="api/BloodRequest/confirm",
    BLOOD_REQUEST_CANCEL="api/BloodRequest/cancel",
    BLOOD_REQUEST_STATUS="api/BloodRequest/status",
    BLOOD_REQUEST_MANAGE="api/BloodRequest/manage",
}