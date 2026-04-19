/**
 * UI Component templates
 */

export function createEmptyState(decs, title) {
  return `
    ${
      title
        ? `
      <section class="banner">
        <div>
            <h1>${title}</h1>
        </div>
      </section>
    `
        : ""
    }
    <section class="empty-state-container">
        <section class="empty-state-content">
            <i class="fa-solid fa-triangle-exclamation fa-5x" style="color: var(--color-primary-orange); opacity: 0.7;"></i>
            <p>${decs}</p>
        </section>
    </section>
`;
}

export function createLoadingState(title, decs) {
  if (!title) {
    return `
      <section class="container loading">
        <i class="fa-solid fa-spinner fa-spin fa-5x" style="color: var(--color-primary-orange); opacity: 0.7;"></i>
        <p>searching...</p>
      </section>
    `;
  } else if (title === "home") {
    return `
      <section class="hero">
        <div>
          <h1>Build Your Perfect Routine with Flexify</h1>
          <p>Discover exercises tailored to your goals and muscle groups.</p>
          <button type="button" class="btn-primary" data-link="plans">Start Planning</button>
        </div>
      </section>
      <section class="container empty-state-content">
        <i class="fa-solid fa-spinner fa-spin fa-5x" style="color: var(--color-primary-orange); opacity: 0.7;"></i>
        <p>${decs}</p>
      </section>
      `;
  }
  return `
    <section class="banner">
      <div>
          <h1>${title}</h1>
      </div>
    </section>
    <section class="container loading">
      <i class="fa-solid fa-spinner fa-spin fa-5x" style="color: var(--color-primary-orange); opacity: 0.7;"></i>
      <p>${decs}</p>
    </section>
    `;
}

export function createNavItem(item) {
  return `
      <li class="nav-item">
        <a href="#" aria-label="${item.text}" data-link="${item.id}">
        <div class="nav-info">
          ${item.icon}
          ${item.text}
        </div>
        </a>
      </li>
    `;
}

export function createFeatureCard(feature) {
  return `
      <article class="feature-item">
        <figure class="feature-img">
          <img loading="lazy" src="${feature.img}" alt="${feature.title} icon" />
        </figure>
        <h3>${feature.title}</h3>
        <p>${feature.desc}</p>
      </article>
    `;
}

export function createExerciseCard(exercise, isFav = false) {
  // to-do: add functionality
  // <i class="fa-solid fa-plus fa-large"></i>
  return `
      <article class="exercise-card">
        <figure class="exercise-image">
          <img src="./media/images/exercises/${exercise.muscle}.png" alt="Muscle that exercise will impact on it." />
          <figcaption class="exercise-badge">${exercise.difficulty}</figcaption>
        </figure>
        <div class="actions">
          <i class="fa-solid fa-heart fa-large ${isFav ? "active" : ""} btn-favorite" data-name="${exercise.name}"></i>
        </div>
        <h3>${exercise.name}</h3>
        <p>${exercise.muscle}</p>
        <button 
          aria-label="View ${exercise.name} details" 
          class="btn-secondary" 
          data-link="details"
          data-name="${exercise.name}">
          View Exercise
        </button>
      </article>
    `;
}

export function createFilterPill(filter) {
  return `
    <button type="button" class="btn-filter" data-value=${filter}>
      ${filter.charAt(0).toUpperCase() + filter.slice(1)}
    </button>
    `;
}
