import { Doc } from '../../../models/index.js';


export default async (req, res) => {
  Doc.find({"requestAccess": true}, (err, docs) =>
    res.send(docs.reduce((userMap, item) => {
      userMap[item.id] = item
      return userMap
    }, {})),
  );
};