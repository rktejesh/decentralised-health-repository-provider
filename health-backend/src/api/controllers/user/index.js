// AUTH
export { default as register } from './auth/register.js'
export { default as sendOtp } from './auth/send-otp.js'
export { default as logout } from './auth/logout.js'
export { default as verifyEmail } from './auth/verify-email.js'
export { default as verifyMobile } from './auth/verify-mobile.js'
export { default as refreshToken } from './auth/refresh-token.js'
export { default as forgotPassword } from './auth/forgot-password.js'
export { default as checkUserExists } from './auth/check-user.js'
export { default as sendVerificationCode } from './auth/send-verification-code.js'

// EDIT
export { default as changePassword } from './edit/change-password.js'
export { default as editUser } from './edit/edit-user.js'

// OTHER
export { default as getUser } from './get-user.js'
export { default as deleteUser } from './delete-user.js'
export { default as profile } from './profile.js'
export { default as createEHR } from './upload-ehr.js'
export { default as appointment } from './create-appointment.js'
export { default as grantAccessList } from './grant-access-list.js'
export { default as grantAccess } from './grant-access.js'
export { default as getAppointments } from './get-appointment.js'