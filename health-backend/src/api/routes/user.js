import { Router } from 'express';
import { appointment, checkUserExists, deleteUser, editUser, forgotPassword, createEHR, getUser, sendOtp, logout, refreshToken, register, sendVerificationCode, verifyEmail, verifyMobile, profile} from '../controllers/user/index.js';
import { auth, imageUpload } from '../middlewares/index.js';
import temp from '../controllers/user/register-user-ledger-old.js'
import multer from 'multer';
import {upload} from '../../utils/index.js';
// const upload = multer({ dest: './uploads' })

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
router.get('/check-user', checkUserExists);
router.get('/profile', auth, profile);
router.post('/createEHR', upload.single('files'), auth, createEHR);
router.post('/createAppointment', auth, appointment);

// EDIT
// router.post('/change-password', auth, changePassword);
// router.put('/', auth, imageUpload, editUser);
// router.get('/', auth, getUser);
// router.delete('/', auth, deleteUser);

export default router