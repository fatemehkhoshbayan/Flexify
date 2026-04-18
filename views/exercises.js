export const exercisesView = `
    <section class="banner">
        <div>
            <h1>Exercises</h1>
            <div class="search-field">
                <i class="fa-solid fa-magnifying-glass fa-xl search-icon"></i>
                <input
                    type="search"
                    id="search"
                    placeholder="Search exercises..."
                    class="search-input"
                    />
            </div>
        </div>
    </section>
    <section class="container exercises-list">
        <section class="filter-container">
            <div class="filters"></div>
            <button type="button" class="btn-filter" id="btn-clear">Clear All</button>
        </section>
        <section class="exercises-container"></section>
    </section>
`;
