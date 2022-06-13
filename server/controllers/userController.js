const { Job, Room } = require("../models");

module.exports = {
  getJobs(req, res) {
    Job.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  getSingleJob(req, res) {
    Job.findOne({ _id: req.params.jobId })
      .select("-__v")
      .populate("rooms")
      .then((job) =>
        !job
          ? res.status(404).json({ message: "No job with that ID" })
          : res.json(job)
      )
      .catch((err) =>{ console.log(err);
        res.status(500).json(err)});
  },

  createUser(req, res) {
    Job.create(req.body)
      .then((job) => res.json(job))
      .catch((err) => res.status(500).json(err));
  },

  deleteJob(req, res) {
    User.findOneAndRemove({ _id: req.params.jobId })
      .then((job) =>
        !job
          ? res.status(404).json({ message: "No job with that ID" })
          : Room.deleteMany({ _id: { $in: job.rooms } })
      )
      .then(() => res.json({ message: "Job and job's rooms deleted" }))
      .catch((err) => res.status(500).json(err));
  },

  updateJob(req, res) {
    Job.findOneAndUpdate({ _id: req.params.jobId }, { $set: req.body })
      .then((job) =>
        !job
          ? res.status(404).json({ message: "No job with that ID" })
          : res.json(job)
      )
      .catch((err) => res.status(500).json(err));
  },

  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    ).then((user) =>
      !user
        ? res.status(404).json({ message: "No user with that ID" })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err))
  },

  removeFriend(req, res) {
    User.findOneAndUpdate(
       { _id: req.params.userId },
       { $pull: { friends: req.params.friendId } },
       { runValidators: true, new: true })
       .then((user) =>
          !user
             ? res.status(404).json({ message: 'No such user exists' })
             : res.json(user)
       )
       .catch((err) => {
          console.log(err);
          res.status(500).json(err);
       });
 },
};
