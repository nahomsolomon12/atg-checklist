const workouts = [
  {
    name: "Backward Walking",
    detail: "30 seconds",
    tag: "01",
    videoLink: "",
  },
  {
    name: "Big Toe Stretch",
    detail: "30 seconds",
    tag: "02",
    videoLink: "",
  },
  {
    name: "Heel Sit",
    detail: "30 seconds",
    tag: "03",
    videoLink: "",
  },
  {
    name: "Elephant Walks",
    detail: "30 seconds",
    tag: "04",
    videoLink: "",
  },
  {
    name: "Quadruped Donkey Kick",
    detail: "10 reps per side",
    tag: "05",
    videoLink: "",
  },
  {
    name: "Quadruped Fire Hydrant",
    detail: "10 reps per side",
    tag: "06",
    videoLink: "",
  },
  {
    name: "Hip Flexor Squeeze and Stretch",
    detail: "30 seconds per side",
    tag: "07",
    videoLink: "",
  },
  {
    name: "Wall Pullover",
    detail: "10 reps",
    tag: "08",
    videoLink: "",
  },
  {
    name: "Trap Three Raises",
    detail: "10 reps",
    tag: "09",
    videoLink: "",
  },
  {
    name: "External Shoulder Rotation",
    detail: "10 reps per side",
    tag: "10",
    videoLink: "",
  },
  {
    name: "QL by the Wall",
    detail: "2 sets of 15",
    tag: "11",
    videoLink: "",
  },
  {
    name: "Two Pushups (Full)",
    detail: "2 reps",
    tag: "12",
    videoLink: "",
  },
];

const workoutSplit = [
  {
    day: "Monday",
    focus: "Ankles and Calves",
    workoutTags: ["01", "02", "03"],
  },
  {
    day: "Tuesday",
    focus: "Hip Flexor and Glutes",
    workoutTags: ["04", "05", "06", "07"],
  },
  {
    day: "Wednesday",
    focus: "Ankles and Calves",
    workoutTags: ["01", "02", "03"],
  },
  {
    day: "Thursday",
    focus: "Hip Flexor and Glutes",
    workoutTags: ["04", "05", "06", "07"],
  },
  {
    day: "Friday",
    focus: "Upper Body",
    workoutTags: ["08", "09", "10", "11", "12"],
  },
  {
    day: "Saturday",
    focus: "Hip Flexor and Glutes",
    workoutTags: ["04", "05", "06", "07"],
  },
  {
    day: "Sunday",
    focus: "Upper Body",
    workoutTags: ["08", "09", "10", "11", "12"],
  },
];

export { workoutSplit, workouts };
