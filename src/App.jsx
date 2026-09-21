import { useEffect, useState } from "react";
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

const hygienePillars = [
  {
    id: "shower",
    number: "01",
    name: "Shower + exfoliate",
    detail: "Clean skin, refreshed and ready for the day.",
  },
  {
    id: "oral-care",
    number: "02",
    name: "Brush + floss",
    detail: "Keep the basics sharp, morning and night.",
  },
  {
    id: "cologne",
    number: "03",
    name: "Cologne",
    detail: "One or two sprays. Leave a quiet impression.",
  },
];

function HygienePage({ onNavigate }) {
  const [completed, setCompleted] = useState([]);
  const completedCount = completed.length;
  const isFinished = completedCount === hygienePillars.length;

  function togglePillar(id) {
    setCompleted((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  function resetPillars() {
    setCompleted([]);
  }

  return (
    <main className="app-shell hygiene-shell">
      <header className="topbar">
        <button
          className="brand-mark brand-button"
          type="button"
          onClick={() => onNavigate("/")}
        >
          ATG<span>/</span>12
        </button>
        <nav className="page-nav" aria-label="Primary navigation">
          <button
            className="page-nav-link is-active"
            type="button"
            onClick={() => onNavigate("/hygiene")}
          >
            HYGIENE
          </button>
          <button
            className="page-nav-link"
            type="button"
            onClick={() => onNavigate("/")}
          >
            TRAINING
          </button>
        </nav>
      </header>
      <section className="intro hygiene-intro" aria-labelledby="hygiene-title">
        <p className="eyebrow">DAILY STANDARD / PERSONAL CARE</p>
        <h1 id="hygiene-title">
          Keep your
          <br />
          <em>edge.</em>
        </h1>
        <p className="intro-copy">
          Clean details. Quiet confidence.
          <br />
          Take care of the basics every day.
        </p>
      </section>
      <section className="hygiene-progress" aria-label="Hygiene progress">
        <div className="progress-meta">
          <span>YOUR STANDARD</span>
          <strong>
            {String(completedCount).padStart(2, "0")} <small>/ 03</small>
          </strong>
        </div>
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{
              width: `${(completedCount / hygienePillars.length) * 100}%`,
            }}
          />
        </div>
        <p>
          {isFinished
            ? "Standard met. Show up ready."
            : `${hygienePillars.length - completedCount} pillars remaining today.`}
        </p>
      </section>
      <section className="hygiene-list" aria-label="Hygiene pillars">
        <div className="list-heading">
          <span>THE DAILY STANDARD</span>
          <span>CHECK OFF AS YOU GO</span>
        </div>
        {hygienePillars.map((pillar) => {
          const isCompleted = completed.includes(pillar.id);
          return (
            <article className="hygiene-card" key={pillar.id}>
              <button
                className={`hygiene-row ${isCompleted ? "is-complete" : ""}`}
                type="button"
                onClick={() => togglePillar(pillar.id)}
                aria-pressed={isCompleted}
              >
                <span className="workout-number">{pillar.number}</span>
                <span className="hygiene-name">
                  <strong>{pillar.name}</strong>
                  <small>{pillar.detail}</small>
                </span>
                <span className="check-box" aria-hidden="true">
                  {isCompleted ? "✓" : ""}
                </span>
              </button>
            </article>
          );
        })}
      </section>
      <section
        className="non-negotiable"
        aria-labelledby="non-negotiable-title"
      >
        <p className="eyebrow">NON-NEGOTIABLE</p>
        <div className="non-negotiable-content">
          <h2 id="non-negotiable-title">Brush and floss before bed.</h2>
          <p>Even on the days when everything else slips.</p>
        </div>
      </section>
      {isFinished && (
        <section className="completion" aria-live="polite">
          <p>STANDARD COMPLETE</p>
          <h2>You handled the details. Carry that feeling forward.</h2>
          <button className="reset-button" type="button" onClick={resetPillars}>
            Reset standard <span>↗</span>
          </button>
        </section>
      )}
      <footer>
        <span>ATG CHECKLIST</span>
        <span>SHOW UP. FEEL READY.</span>
      </footer>
    </main>
  );
}

function App() {
  const [page, setPage] = useState(() => window.location.pathname);
  const todayIndex = new Date().getDay() % workoutSplit.length;
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

  useEffect(() => {
    function handlePopState() {
      setPage(window.location.pathname);
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  function navigate(path) {
    window.history.pushState({}, "", path);
    setPage(path);
  }

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

  if (page === "/hygiene") {
    return <HygienePage onNavigate={navigate} />;
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <button
          className="brand-mark brand-button"
          type="button"
          onClick={() => navigate("/")}
        >
          ATG<span>/</span>12
        </button>
        <nav className="page-nav" aria-label="Primary navigation">
          <button
            className="page-nav-link"
            type="button"
            onClick={() => navigate("/hygiene")}
          >
            HYGIENE
          </button>
          <div className="day-label">
            <span className="status-dot" /> THREE DAY SPLIT
          </div>
        </nav>
      </header>
      <section className="intro" aria-labelledby="page-title">
        <p className="eyebrow">ATHLETIC TRAINING / FOUNDATION</p>
        <h1 id="page-title">
          Build your
          <br />
          <em>base.</em>
        </h1>
        <p className="intro-copy">
          A focused split for stronger movement.
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
            See you on your next training day.
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
