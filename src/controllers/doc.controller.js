const useUtils = require("../util/functions");
const util = useUtils();

const Document = require("../models/Document");
const RequiredDocs = require("../models/RequiredDocs");

/* Auth check:
Guest: ❎
Member: ✅ own document
Admin: ✅
*/
exports.getOneDocument = (req, res) => {
  if (req.auth.userId !== document.userId && req.auth.role !== "admin")
    return res.status(401).json({ error: "Unauthorized" });

  util.LogInfo(`Getting document '${req.params.id}'`);
  Document.findOne({ _id: req.params.id })
    .then((document) => res.status(200).json(document))
    .catch((error) => res.status(404).json({ error }));
};

/* Auth check:
Guest: ❎
Member: ✅ own document
Admin: ✅
*/
exports.deleteDocument = (req, res) => {
  Document.findOne({ _id: req.params.id })
    .then((document) => {
      if (req.auth.userId !== document.userId && req.auth.role !== "admin")
        return res.status(401).json({ error: "Unauthorized" });

      util.LogInfo(`Deleting document '${req.params.id}'`);
      Document.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Document deleted!" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(404).json({ error }));
};

/* Auth check:
Guest: ❎
Member: ✅
Admin: ✅
*/
exports.createDocument = (req, res) => {
  if (req.auth.role === "guest")
    return res.status(401).json({ error: "Unauthorized" });
  if (!req.file) return res.status(400).json({ error: "No file provided" });

  util.LogInfo(
    `Creating document '${req.body.docId}' for user '${req.auth.userId}'`
  );
  const document = new Document({
    ...req.body,
    userId: req.auth.userId,
    docUrls: [
      `${req.protocol}://${req.get("host")}/documents/${req.file.filename}`,
    ],
  });
  document
    .save()
    .then(() => res.status(201).json({ message: "Document created!" }))
    .catch((error) => res.status(400).json({ error }));
};

/* Auth check:
Guest: ❎
Member: ✅ own document
Admin: ✅
*/
exports.updateDocument = (req, res) => {
  Document.findOne({ _id: req.params.id })
    .then((document) => {
      if (
        req.auth.role === "guest" ||
        (req.auth.userId !== document.userId && req.auth.role !== "admin")
      ) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      util.LogInfo(`Updating document '${req.params.id}'`);
      let docObject = { ...req.body, userId: req.auth.userId };
      if (req.file) {
        docObject.docUrls = document.docUrls.push(
          `${req.protocol}://${req.get("host")}/documents/${req.file.filename}`
        );
      }
      Document.updateOne(
        { _id: req.params.id },
        {
          ...docObject,
        }
      )
        .then(() => res.status(200).json({ message: "Document updated!" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(404).json({ error }));
};

/* Auth check:
Guest: ❎
Member: ✅
Admin: ✅
*/
exports.getAllRequiredDocs = (req, res) => {
  if (req.auth.role === "guest")
    return res.status(401).json({ error: "Unauthorized" });
  util.LogInfo("Getting all required documents");
  RequiredDocs.find()
    .then((requiredDocs) => res.status(200).json(requiredDocs))
    .catch((error) => res.status(400).json({ error }));
};

/* Auth check:
Guest: ❎
Member: ❎
Admin: ✅
*/
exports.createRequiredDoc = (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file provided" });
  if (req.auth.role !== "admin")
    return res.status(401).json({ error: "Unauthorized" });

  util.LogInfo("Creating required document");
  const requiredDoc = new RequiredDocs({
    ...req.body,
    userId: req.auth.userId,
    reqDocUrl: `${req.protocol}://${req.get("host")}/documents/${
      req.file.filename
    }`,
  });
  requiredDoc
    .save()
    .then(() => res.status(201).json({ message: "Required document created!" }))
    .catch((error) => res.status(400).json({ error }));
};

/* Auth check:
Guest: ❎
Member: ❎
Admin: ✅
*/
exports.updateRequiredDoc = (req, res) => {
  if (req.auth.role !== "admin")
    return res.status(401).json({ error: "Unauthorized" });

  util.LogInfo("Updating required document");
  let docObject = { ...req.body, userId: req.auth.userId };
  if (req.file) {
    docObject.reqDocUrl = `${req.protocol}://${req.get("host")}/documents/${
      req.file.filename
    }`;
    RequiredDocs.updateOne(
      { _id: req.params.id },
      {
        ...docObject,
      }
    )
      .then(() =>
        res.status(200).json({ message: "Required document updated!" })
      )
      .catch((error) => res.status(400).json({ error }));
  }
};

/* Auth check:
Guest: ❎
Member: ❎
Admin: ✅
*/
exports.deleteRequiredDoc = (req, res) => {
  util.LogInfo("Deleting required document");
  if (req.auth.role !== "admin")
    return res.status(401).json({ error: "Unauthorized" });
  RequiredDocs.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Required document deleted!" }))
    .catch((error) => res.status(400).json({ error }));
};

/* Auth check:
Guest: ❎
Member: ✅ own documents
Admin: ❎ not implemented
*/
exports.getAllUserDocs = (req, res) => {
  if (req.auth.role === "guest")
    return res.status(401).json({ error: "Unauthorized" });

  util.LogInfo(`Getting all documents for user '${req.auth.userId}'`);

  Document.find({ userId: req.auth.userId })
    .then(async (documents) => {
      let resObj = [];
      let promises = documents.map(async (doc) => {
        const requiredDoc = await RequiredDocs.findOne({ _id: doc.docId });
        resObj.push({
          docId: doc._id,
          reqDoc: {
            docId: requiredDoc._id,
            title: requiredDoc.title,
            description: requiredDoc.description,
          },
          docUrls: doc.docUrls,
          status: doc.status,
        });
      });
      await Promise.all(promises);
      return res.status(200).json(resObj);
    })
    .catch((error) => res.status(400).json({ error }));
};


/* Auth check:
Guest: ❎
Member: ❎
Admin: ✅
*/
exports.getUserDocsForAdmin = (req, res) => {
  if (req.auth.role !== "admin"){
    return res.status(401).json({ error: "Unauthorized" });
  }

  util.LogInfo(`Getting all documents for user '${req.params.id}'`);

  Document.find({ userId: req.params.id })
    .then(async (documents) => {
      let resObj = [];
      let promises = documents.map(async (doc) => {
        const requiredDoc = await RequiredDocs.findOne({ _id: doc.docId });
        resObj.push({
          docId: doc._id,
          reqDoc: {
            docId: requiredDoc._id,
            title: requiredDoc.title,
            description: requiredDoc.description,
          },
          docUrls: doc.docUrls,
          status: doc.status,
        });
    })
    await Promise.all(promises);
    return res.status(200).json(resObj);
  })
  .catch((error) => res.status(400).json({ error }));   
};

/* Auth check:
Guest: ❎
Member: ❎
Admin: ✅
*/
exports.getAllUserDocsForAdmin = (req, res) => {
  if (req.auth.role !== "admin"){
    return res.status(401).json({ error: "Unauthorized" });
  }

  util.LogInfo(`Getting all documents for every user`);

  Document.find()
    .then(async (documents) => {
      let resObj = [];
      let promises = documents.map(async (doc) => {
        const requiredDoc = await RequiredDocs.findOne({ _id: doc.docId });
        resObj.push({
          docId: doc._id,
          reqDoc: {
            docId: requiredDoc._id,
            title: requiredDoc.title,
            description: requiredDoc.description,
          },
          docUrls: doc.docUrls,
          status: doc.status,
        });
    })
    await Promise.all(promises);
    return res.status(200).json(resObj);
  })
  .catch((error) => res.status(400).json({ error }));   
};

/* Auth check:
Guest: ❎
Member: ✅ own documents
Admin: ❎ not implemented
*/
exports.getUncompleteUserDocs = (req, res) => {
  if (req.auth.role === "guest")
    return res.status(401).json({ error: "Unauthorized" });

  util.LogInfo(`Getting all incomplete documents for user '${req.auth.userId}'`);

  RequiredDocs.find()
    .then(async (requiredDocs) => {
      let resObj = [];
      let promises = requiredDocs.map(async (reqDoc) => {
        const document = await Document.findOne({userId: req.auth.userId, docId: reqDoc._id});
        if (!document || document.status == "rejected"){
          resObj.push({
            docId: reqDoc._id,
            title: reqDoc.title,
            description: reqDoc.description,
            reqDocUrl: reqDoc.reqDocUrl,
            status: document ? document.status : "0",
            rejectionReason: document.status == "rejected" ? document.rejectionReason : ""
          });
        }
      });
      await Promise.all(promises);
      return res.status(200).json(resObj);
    })
    .catch((error) => res.status(400).json({ error }));
};

/* Auth check:
Guest: ❎
Member: ✅ own documents
Admin: ❎ not implemented
*/
exports.getUserDocsSentOrNot = (req, res) => {
  if (req.auth.role === "guest")
    return res.status(401).json({ error: "Unauthorized" });

  util.LogInfo(`Getting all documents (sent and not sent) regarding user '${req.auth.userId}'`);

  RequiredDocs.find()
    .then(async (requiredDocs) => {
      let resObj = [];
      let promises = requiredDocs.map(async (reqDoc) => {
        const document = await Document.findOne({userId: req.auth.userId, docId: reqDoc._id});
        if (!document){
          resObj.push({
            docId: reqDoc._id,
            title: reqDoc.title,
            description: reqDoc.description,
            reqDocUrl: reqDoc.reqDocUrl,
            status: "0"
          });
        } else {
          resObj.push({
            docId: document._id,
            title: reqDoc.title,
            description: reqDoc.description,
            reqDocUrls: document.docUrls,
            status: document.status,
            rejectionReason: document.status == "rejected" ? document.rejectionReason : ""
          });
        }
      });
      await Promise.all(promises);
      return res.status(200).json(resObj);
    })
    .catch((error) => res.status(400).json({ error }));
};