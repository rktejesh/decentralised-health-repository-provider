import { Doc, DocRequest } from '../../../models/index.js';
import { errorHelper, getText, logger, signAccessToken, signRefreshToken } from '../../../utils/index.js';

export default async (req, res) => {
  console.log(req.body);
  // console.log(req.file);

  const docRecord = Doc.findOne({ _id: req.body.docId });

  let docRequest = new DocRequest({
    doctorId: req.user.eth_id,
    docId: req.body.docId,
    patientId: docRecord.patientId,
    requestAccess: true,
    grantAccess: false,
  });

  docRequest = await docRequest.save().catch((err) => {
    return res.status(500).json(errorHelper("00034", req, err.message));
  });

  return res.status(200).json({
    resultMessage: { en: getText("en", "00035"), tr: getText("tr", "00035") },
    resultCode: "00035",
  });
};
