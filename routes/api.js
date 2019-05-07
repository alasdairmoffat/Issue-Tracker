/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

/* eslint-disable camelcase */

const { expect } = require('chai');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const CONNECTION_STRING = process.env.MONGO_URI;

mongoose
  .connect(CONNECTION_STRING, { useNewUrlParser: true, useFindAndModify: false })
  .then(console.log('MongoDB connected'))
  .catch(err => console.log(err));

const { Schema } = mongoose;

const issueSchema = new Schema({
  issue_title: {
    type: String,
    required: true,
  },
  issue_text: {
    type: String,
    required: true,
  },
  created_by: {
    type: String,
    required: true,
  },
  assigned_to: String,
  status_text: String,
  created_on: {
    type: Date,
    default: Date.now,
  },
  updated_on: {
    type: Date,
    default: Date.now,
  },
  open: {
    type: Boolean,
    default: true,
  },
});

module.exports = (app) => {
  app
    .route('/api/issues/:project')

    .get((req, res) => {
      const { project } = req.params;
      const Issue = mongoose.model(project, issueSchema);

      Issue.find(req.query, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          res.json(data);
        }
      });
    })

    .post((req, res) => {
      const { project } = req.params;
      const Issue = mongoose.model(project, issueSchema);

      const {
        issue_title, issue_text, created_by, assigned_to, status_text,
      } = req.body;

      if (!(issue_title && issue_text && created_by)) {
        res.send('missing inputs');
      } else {
        const newIssue = new Issue({
          issue_title,
          issue_text,
          created_by,
        });

        if (assigned_to) newIssue.assigned_to = assigned_to;
        if (status_text) newIssue.status_text = status_text;

        newIssue.save((err, data) => {
          if (err) {
            console.log(err);
          } else {
            res.json(data);
          }
        });
      }
    })

    .put((req, res) => {
      const { project } = req.params;
      const Issue = mongoose.model(project, issueSchema);

      const {
        _id, issue_title, issue_text, created_by, assigned_to, status_text, open,
      } = req.body;

      const dataToUpdate = { updated_on: Date.now(), open };
      if (issue_title) dataToUpdate.issue_title = issue_title;
      if (issue_text) dataToUpdate.issue_text = issue_text;
      if (created_by) dataToUpdate.created_by = created_by;
      if (assigned_to) dataToUpdate.assigned_to = assigned_to;
      if (status_text) dataToUpdate.status_text = status_text;

      if (Object.keys(dataToUpdate).length < 3 && !open) {
        res.send('no updated field sent');
      } else {
        Issue.findByIdAndUpdate(_id, dataToUpdate, { new: true }, (err, data) => {
          if (err) {
            if (err.kind === 'ObjectId') {
              res.send(`could not update ${_id}`);
            } else {
              console.log(err);
            }
          } else {
            res.json(data);
          }
        });
      }
    })

    .delete((req, res) => {
      const { project } = req.params;
      const Issue = mongoose.model(project, issueSchema);

      const { _id } = req.body;

      if (!_id) {
        res.send('_id error');
      } else {
        Issue.findByIdAndDelete(_id, (err) => {
          if (err) {
            if (err.kind === 'ObjectId') {
              res.send(`could not delete ${_id}`);
            } else {
              console.log(err);
            }
          } else {
            res.send(`deleted ${_id}`);
          }
        });
      }
    });
};
