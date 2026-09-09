import { useState } from "react";
import "./App.css";
import { workoutSplit, workouts } from "./workouts";

function getEmbedUrl(link) {
  if (!link) {
    return "";
  }

  try {
    const url = new URL(link);
    if (url.hostname === "youtu.be") {
      return `https://www.youtube.com/embed/${url.pathname.slice(1)}`;
    }
    if (url.hostname.includes("youtube.com")) {
      const videoId = url.searchParams.get("v");
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
      if (url.pathname.startsWith("/embed/")) {
        return url.toString();
      }
    }
    return url.toString();
  } catch {
    return "";
  }
}

function WorkoutVideo({ workout, videoLink, onVideoLinkChange, onSave }) {
  const embedUrl = getEmbedUrl(videoLink);

  return (
    <div className="video-panel" aria-label={`${workout.name} video guide`}>
      <form className="video-link-form" onSubmit={onSave}>
        <label htmlFor={`video-link-${workout.tag}`}>PASTE A VIDEO LINK</label>
        <div className="video-link-controls">
          <input
            id={`video-link-${workout.tag}`}
            type="url"
            value={videoLink}
            onChange={(event) => onVideoLinkChange(event.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            aria-label={`Video link for ${workout.name}`}
          />
          <button type="submit">Load video</button>
        </div>
      </form>
      {embedUrl ? (
        <div className="video-frame">
          <iframe
            src={embedUrl}
            title={`${workout.name} form video`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      ) : (
        <p className="video-empty">
          Add a specific form video for this movement.
        </p>
      )}
    </div>
  );
}

function App() {
  const todayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
  const [selectedDay, setSelectedDay] = useState(todayIndex);
  const [completedByDay, setCompletedByDay] = useState({});
  const [openVideos, setOpenVideos] = useState([]);
  const [videoLinks, setVideoLinks] = useState(() =>
    Object.fromEntries(
      workouts.map((workout) => [workout.tag, workout.videoLink]),
    ),
  );
  const [loadedVideoLinks, setLoadedVideoLinks] = useState(() =>
    Object.fromEntries(
      workouts.map((workout) => [workout.tag, workout.videoLink]),
    ),
  );
  const selectedSchedule = workoutSplit[selectedDay];
  const dayWorkouts = selectedSchedule.workoutTags.map((tag) =>
    workouts.find((workout) => workout.tag === tag),
  );
  const completed = completedByDay[selectedSchedule.day] ?? [];
  const completedCount = completed.length;
  const isFinished = completedCount === dayWorkouts.length;

  function toggleWorkout(tag) {
    setCompletedByDay((current) => {
      const dayCompleted = current[selectedSchedule.day] ?? [];
      const nextCompleted = dayCompleted.includes(tag)
        ? dayCompleted.filter((item) => item !== tag)
        : [...dayCompleted, tag];

      return { ...current, [selectedSchedule.day]: nextCompleted };
    });
  }

  function resetDay() {
    setCompletedByDay((current) => ({
      ...current,
      [selectedSchedule.day]: [],
    }));
  }

  function toggleVideo(index) {
    setOpenVideos((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index],
    );
  }

  function updateVideoLink(tag, value) {
    setVideoLinks((current) => ({ ...current, [tag]: value }));
  }

  function loadVideoLink(event, tag) {
    event.preventDefault();
    setLoadedVideoLinks((current) => ({
      ...current,
      [tag]: videoLinks[tag].trim(),
    }));
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand-mark" aria-label="ATG Checklist home">
          ATG<span>/</span>12
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
          A focused split. One daily practice.
          <br />
          Move well, then move further.
        </p>
      </section>
      <section className="day-picker" aria-label="Choose a workout day">
        {workoutSplit.map((schedule, index) => (
          <button
            className={selectedDay === index ? "is-selected" : ""}
            type="button"
            key={schedule.day}
            onClick={() => setSelectedDay(index)}
            aria-pressed={selectedDay === index}
          >
            <span>{schedule.day.slice(0, 3)}</span>
            <small>{schedule.focus}</small>
          </button>
        ))}
      </section>
      <section className="progress-panel" aria-label="Workout progress">
        <div className="progress-meta">
          <span>YOUR PROGRESS</span>
          <strong>
            {String(completedCount).padStart(2, "0")}{" "}
            <small>/ {dayWorkouts.length}</small>
          </strong>
        </div>
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${(completedCount / dayWorkouts.length) * 100}%` }}
          />
        </div>
        <p>
          {isFinished
            ? `${selectedSchedule.day} complete.`
            : `${dayWorkouts.length - completedCount} movements remaining today.`}
        </p>
      </section>
      <section className="workout-list" aria-label="ATG workouts">
        <div className="list-heading">
          <span>
            {selectedSchedule.day.toUpperCase()} /{" "}
            {selectedSchedule.focus.toUpperCase()}
          </span>
          <span>CHECK OFF AS YOU GO</span>
        </div>
        <div className="workouts">
          {dayWorkouts.map((workout) => {
            const isCompleted = completed.includes(workout.tag);
            const isVideoOpen = openVideos.includes(workout.tag);
            return (
              <article className="workout-card" key={workout.name}>
                <div className="workout-line">
                  <button
                    className={`workout-row ${isCompleted ? "is-complete" : ""}`}
                    type="button"
                    onClick={() => toggleWorkout(workout.tag)}
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
                    onClick={() => toggleVideo(workout.tag)}
                    aria-expanded={isVideoOpen}
                    aria-label={`${isVideoOpen ? "Hide" : "Show"} ${workout.name} form video`}
                  >
                    <span aria-hidden="true">⌄</span>
                  </button>
                </div>
                {isVideoOpen && (
                  <WorkoutVideo
                    workout={workout}
                    videoLink={loadedVideoLinks[workout.tag]}
                    onVideoLinkChange={(value) =>
                      updateVideoLink(workout.tag, value)
                    }
                    onSave={(event) => loadVideoLink(event, workout.tag)}
                  />
                )}
              </article>
            );
          })}
        </div>
      </section>
      {isFinished && (
        <section className="completion" aria-live="polite">
          <p>CONGRATULATIONS</p>
          <h2>
            Congrats, you completed your {selectedSchedule.day} workout.
            <br />
            See you tomorrow.
          </h2>
          <button className="reset-button" type="button" onClick={resetDay}>
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
