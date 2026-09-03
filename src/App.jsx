import { useState } from "react";
import "./App.css";

const workouts = [
  {
    name: "Big Toe Stretch",
    detail: "30 seconds",
    tag: "01",
    videos: ["big toe stretch ATG", "big toe mobility exercise"],
  },
  {
    name: "Sit on heels",
    detail: "30 seconds",
    tag: "02",
    videos: ["sit on heels ATG", "ankle mobility sit on heels"],
  },
  {
    name: "Lateral band walk",
    detail: "30 seconds",
    tag: "02",
    videos: ["lateral band walk ATG", "lateral band walk tutorial"],
  },
  {
    name: "90, 90, whole circuit",
    detail: "Each side 30 seconds",
    tag: "04",
    videos: ["90 90 hip stretch ATG", "90 90 hip mobility circuit"],
  },
  {
    name: "Reverse Plank",
    detail: "2 sets of 5",
    tag: "05",
    videos: ["reverse plank ATG", "reverse plank exercise tutorial"],
  },
  {
    name: "Side Plank Leg Lift",
    detail: "4 reps of 10 seconds",
    tag: "05",
    videos: ["side plank leg lift ATG", "side plank leg lift tutorial"],
  },
  {
    name: "Wall Pull Over",
    detail: "10 reps",
    tag: "06",
    videos: ["wall pullover ATG", "wall pullover shoulder mobility"],
  },
  {
    name: "Trap 3 raises on floor",
    detail: "10 reps",
    tag: "07",
    videos: ["trap 3 raise on floor", "trap 3 raise exercise tutorial"],
  },
  {
    name: "Couch Stretch",
    detail: "1 minute per side",
    tag: "08",
    videos: ["couch stretch ATG", "couch stretch tutorial"],
  },
  {
    name: "QL Extension at wall",
    detail: "2 sets of 15",
    tag: "03",
    videos: ["QL extension at wall", "quadratus lumborum wall stretch"],
  },
  {
    name: "Single Leg RDL",
    detail: "100 yards each",
    tag: "10",
    videos: ["single leg RDL", "single leg Romanian deadlift tutorial"],
  },
  {
    name: "Forward and Backward Running",
    detail: "100 yards each",
    tag: "10",
    videos: ["forward backward running drill", "running drills tutorial"],
  },
];

function WorkoutVideo({ workout }) {
  const videoQuery = encodeURIComponent(workout.videos[0]);

  return (
    <div className="video-panel" aria-label={`${workout.name} video guide`}>
      <div className="video-frame">
        <iframe
          src={`https://www.youtube.com/embed?listType=search&list=${videoQuery}`}
          title={`${workout.name} form video`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  );
}

function App() {
  const [completed, setCompleted] = useState([]);
  const [openVideos, setOpenVideos] = useState([]);
  const completedCount = completed.length;
  const isFinished = completedCount === workouts.length;

  function toggleWorkout(index) {
    setCompleted((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index],
    );
  }

  function refreshScreen() {
    window.location.reload();
  }

  function toggleVideo(index) {
    setOpenVideos((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index],
    );
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand-mark" aria-label="ATG Checklist home">
          ATG<span>/</span>10
        </div>
        <div className="day-label">
          <span className="status-dot" /> DAILY CIRCUIT
        </div>
      </header>
      <section className="intro" aria-labelledby="page-title">
        <p className="eyebrow">ATHLETIC TRAINING / FOUNDATION</p>
        <h1 id="page-title">
          Build your
          <br />
          <em>base.</em>
        </h1>
        <p className="intro-copy">
          Ten movements. One daily practice.
          <br />
          Move well, then move further.
        </p>
      </section>
      <section className="progress-panel" aria-label="Workout progress">
        <div className="progress-meta">
          <span>YOUR PROGRESS</span>
          <strong>
            {String(completedCount).padStart(2, "0")} <small>/ 10</small>
          </strong>
        </div>
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${completedCount * 10}%` }}
          />
        </div>
        <p>
          {isFinished
            ? "Circuit complete."
            : `${10 - completedCount} movements remaining today.`}
        </p>
      </section>
      <section className="workout-list" aria-label="ATG workouts">
        <div className="list-heading">
          <span>THE CIRCUIT</span>
          <span>CHECK OFF AS YOU GO</span>
        </div>
        <div className="workouts">
          {workouts.map((workout, index) => {
            const isCompleted = completed.includes(index);
            const isVideoOpen = openVideos.includes(index);
            return (
              <article className="workout-card" key={workout.name}>
                <div className="workout-line">
                  <button
                    className={`workout-row ${isCompleted ? "is-complete" : ""}`}
                    type="button"
                    onClick={() => toggleWorkout(index)}
                    aria-pressed={isCompleted}
                  >
                    <span className="workout-number">{workout.tag}</span>
                    <span className="workout-name">
                      <strong>{workout.name}</strong>
                      <small>{workout.detail}</small>
                    </span>
                    <span className="check-box" aria-hidden="true">
                      {isCompleted ? "✓" : ""}
                    </span>
                  </button>
                  <button
                    className={`video-toggle ${isVideoOpen ? "is-open" : ""}`}
                    type="button"
                    onClick={() => toggleVideo(index)}
                    aria-expanded={isVideoOpen}
                    aria-label={`${isVideoOpen ? "Hide" : "Show"} ${workout.name} form video`}
                  >
                    <span aria-hidden="true">⌄</span>
                  </button>
                </div>
                {isVideoOpen && <WorkoutVideo workout={workout} />}
              </article>
            );
          })}
        </div>
      </section>
      {isFinished && (
        <section className="completion" aria-live="polite">
          <p>CONGRATULATIONS</p>
          <h2>
            Congrats you completed the ATG circuit today.
            <br />
            See you tomorrow.
          </h2>
          <button
            className="reset-button"
            type="button"
            onClick={refreshScreen}
          >
            Start a new circuit <span>↗</span>
          </button>
        </section>
      )}
      <footer>
        <span>ATG CHECKLIST</span>
        <span>SHOW UP. MOVE BETTER.</span>
      </footer>
    </main>
  );
}

export default App;
