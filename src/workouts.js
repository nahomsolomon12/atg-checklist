const workouts = [
  {
    name: "Elephant Walks",
    detail: "30 seconds",
    tag: "01",
    videoLink: "",
  },
  {
    name: "Quadruped Donkey Kick",
    detail: "10 reps per side",
    tag: "02",
    videoLink: "",
  },
  {
    name: "Quadruped Fire Hydrant",
    detail: "10 reps per side",
    tag: "03",
    videoLink: "",
  },
  {
    name: "Hip Flexor Squeeze and Stretch",
    detail: "30 seconds per side",
    tag: "04",
    videoLink: "",
  },
  {
    name: "Wall Pullover",
    detail: "10 reps",
    tag: "05",
    videoLink: "",
  },
  {
    name: "Trap Three Raises",
    detail: "10 reps",
    tag: "06",
    videoLink: "",
  },
  {
    name: "External Shoulder Rotation",
    detail: "10 reps per side",
    tag: "07",
    videoLink: "",
  },
  {
    name: "QL by the Wall",
    detail: "2 sets of 15",
    tag: "08",
    videoLink: "",
  },
  {
    name: "Two Pushups (Full)",
    detail: "2 reps",
    tag: "09",
    videoLink: "",
  },
];

const workoutSplit = [
  {
    day: "Day 1",
    focus: "Upper Body",
    workoutTags: ["05", "06", "07", "08", "09"],
  },
  {
    day: "Day 2",
    focus: "Hip Flexor and Glutes",
    workoutTags: ["01", "02", "03", "04"],
  },
  {
    day: "Day 3",
    focus: "Upper Body + Hip Flexor and Glutes",
    workoutTags: ["01", "02", "03", "04", "05", "06", "07", "08", "09"],
  },
];

export { workoutSplit, workouts };
