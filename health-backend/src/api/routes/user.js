import { Router } from 'express';
import { changePassword, checkUserExists, deleteUser, editUser, forgotPassword, getUser, sendOtp, logout, refreshToken, register, sendVerificationCode, verifyEmail, verifyMobile} from '../controllers/user/index.js';
import { auth, imageUpload } from '../middlewares/index.js';

const router = Router();

// AUTH
router.post('/login', sendOtp);
router.post('/verify-mobile', verifyMobile);
router.post('/register', register);
router.post('/logout', auth, logout);
// router.post('/verify-email', verifyEmail);
router.post('/refresh-token', refreshToken);
// router.post('/forgot-password', auth, forgotPassword);
router.post('/send-verification-code', sendVerificationCode);
router.get('/check-user', checkUserExists)

// EDIT
router.post('/change-password', auth, changePassword);
router.put('/', auth, imageUpload, editUser);
router.get('/', auth, getUser);
router.delete('/', auth, deleteUser);

export default router