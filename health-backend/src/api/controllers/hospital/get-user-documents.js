import { User, Doc } from '../../../models/index.js';
import { errorHelper, logger, getText } from '../../../utils/index.js';

export default async (req, res) => {
    //   const user = await User.findById(req.user._id).catch(err => {
    //     return res.status(500).json(errorHelper('00088', req, err.message));
    //   });

    // Doc.find({}, (err, docs) =>
    //     res.send(docs.reduce((userMap, item) => {
    //         userMap[item.id] = item
    //         return userMap
    //     }, {})),
    // );

    Doc.find({}, (err, docs) => {
        if (err) {
            // Handle error
            console.error(err);
            res.status(500).send("Internal Server Error");
            return;
        }
        
        const filteredItems = docs.map(item => item);
    
        res.send(filteredItems);
    });

    // logger('00089', req.user._id, getText('en', '00089'), 'Info', req);
};