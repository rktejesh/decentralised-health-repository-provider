import { Doc } from '../../../models/index.js';
import { errorHelper, getText, logger, signAccessToken, signRefreshToken } from '../../../utils/index.js';
import uploadEhrLedger from './contracts/upload-ehr-ledger.js';

export default async (req, res) => {
  console.log(req.body);
  // console.log(req.file);
  
  await Doc.updateOne(
    { filepath: req.body.path },
    {
      $set: {
        grantAccess: true
      },
    }
  ).catch((err) => {
    logger("00035", user._id, getText("en", "00035"), err, req, req.body.mobile);
    return res.status(500).json(errorHelper("00057", req, err.message));
  });

  return res.status(200).json({
    resultMessage: { en: getText("en", "00035"), tr: getText("tr", "00035") },
    resultCode: "00035",
  });
};
