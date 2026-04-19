export const getPlanView = `
    <section class="banner"></section>
    <section class="container get-plan" id="get-plan" aria-label="Fitness plan request form">
        <form>
            <fieldset>
                <div class="grouped">
                    <div class="form-group">
                        <label for="name">Full Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            placeholder="John Smith"
                        />
                        <p class="error-message name-error" id="err-name" role="alert"></p>
                    </div>
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            placeholder="email@example.com"
                        />
                        <p class="error-message email-error" id="err-email" role="alert"></p>
                    </div>
                </div>
                <div class="grouped">
                    <div class="form-group">
                        <label for="weight">Weight:</label>
                        <input
                            type="text"
                            id="weight"
                            name="weight"
                            required
                            placeholder="70"
                        />
                        <p class="error-message weight-error" id="err-weight" role="alert"></p>
                    </div>
                    <div class="form-group">
                        <label for="height">Height:</label>
                        <input
                            type="text"
                            id="height"
                            name="height"
                            required
                            placeholder="170"
                        />
                        <p class="error-message height-error" id="err-height" role="alert"></p>
                    </div>
                </div>
                <div class="grouped">
                    <div class="form-group">
                    <label for="age">Age:</label>
                    <select id="age" name="age" required>
                        <option value="" selected disabled>
                        Please select your age
                        </option>
                        <option value="under-30">Under 30</option>
                        <option value="18-30">18 - 30</option>
                        <option value="30-45">30 - 45</option>
                        <option value="45-60">45 - 60</option>
                        <option value="above-60">Above 60</option>
                    </select>
                    </div>
                    <div class="form-group">
                    <label for="days per week">Days per week:</label>
                    <select id="days per week" name="days per week" required>
                        <option value="" selected disabled>
                        Please select the number of days
                        </option>
                        <option value="2-days">2 Days Per Week</option>
                        <option value="3-days">3 Days Per Week</option>
                        <option value="4-days">4 Days Per Week</option>
                        <option value="everyday">Everyday</option>
                    </select>
                    </div>
                </div>
                <div class="form-group">
                    <label for="note">Your Note:</label>
                    <textarea
                        id="note"
                        name="note"
                        required
                        placeholder="Let me know what you think!"
                    ></textarea>
                    <p class="error-message note-error" id="err-note" role="alert"></p>
                </div>
                <button type="submit" class="btn-primary medium">Submit</button>
            </fieldset>
        </form>
    </section>
`;
