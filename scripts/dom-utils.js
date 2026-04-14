/**
 * UI Component templates
 */

export function createNavItem(item) {
  return `
      <li class="nav-item">
        <a href="${item.link || "#"}" aria-label="${item.tooltipTxt}">
          ${item.icon}
        </a>
        <span class="tooltip" aria-hidden="true">
          ${item.tooltipTxt}
        </span>
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
