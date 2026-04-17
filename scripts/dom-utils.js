/**
 * UI Component templates
 */

export function createEmptyState(title, decs){
  return`
    <section class="banner">
        <div>
            <h1>${title}</h1>
        </div>
    </section>
    <section class="container empty-state-container">
        <section class="empty-state-content">
            <i class="fa-solid fa-triangle-exclamation fa-5x" style="color: var(--color-primary-orange); opacity: 0.7;"></i>
            <p>${decs}</p>
            <button type="button" class="btn-secondary" data-link="exercises">Try Again</button>
        </section>
    </section>
`;
}

export function createLoadingState(decs){
  return`
    <section class="container empty-state-content">
      <i class="fa-solid fa-spinner fa-spin fa-5x" style="color: var(--color-primary-orange); opacity: 0.7;"></i>
      <p>${decs}</p>
    </section>
    `

}


export function createNavItem(item) {
  return `
      <li class="nav-item">
        <a href="${item.link || "#"}" aria-label="${item.tooltipTxt}" data-link="${item.id}">
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

export function createExerciseCard(exercise) {
  return `
      <article class="exercise-card">
        <figure class="exercise-image">
          <img src="./media/images/exercises/${exercise.muscle}.png" alt="Muscle that exercise will impact on it." />
          <figcaption class="exercise-badge">${exercise.difficulty}</figcaption>
        </figure>
        <div class="actions">
          <i class="fa-solid fa-plus fa-large"></i>
          <i class="fa-solid fa-heart fa-large"></i>
        </div>
        <h3>${exercise.name}</h3>
        <p>${exercise.muscle}</p>
        <button aria-label="View ${exercise.name} details" class="btn-secondary" data-link="details">
          View Exercise
        </button>
      </article>
    `;
}
