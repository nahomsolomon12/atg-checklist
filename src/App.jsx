import { useState } from "react";
import "./App.css";

const workouts = [
  { name: "Big Toe Stretch", detail: "30 seconds", tag: "01" },
  { name: "Sit on heels", detail: "30 seconds", tag: "02" },
  { name: "QL Extension at wall", detail: "2 sets of 15", tag: "03" },
  { name: "90, 90, whole circuit", detail: "Each side 30 seconds", tag: "04" },
  { name: "Seated Good Morning Form", detail: "2 sets of 5", tag: "05" },
  { name: "Wall Pull Over", detail: "10 reps", tag: "06" },
  { name: "Trap 3 raises on floor", detail: "10 reps", tag: "07" },
  { name: "Couch Stretch", detail: "1 minute per side", tag: "08" },
  { name: "Backward Walking", detail: "2 minutes", tag: "09" },
  { name: "Forward and Backward Running", detail: "100 yards each", tag: "10" },
];

function App() {
  const [completed, setCompleted] = useState([]);
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
            return (
              <button
                className={`workout-row ${isCompleted ? "is-complete" : ""}`}
                key={workout.name}
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
