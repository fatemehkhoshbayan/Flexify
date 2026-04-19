export const getPlanView = `
    <section class="banner"></section> 
    <section class="container get-plan" id="get-plan">
        <form>
            <fieldset>
                <section class="grouped">
                    <div class="form-group">
                        <label for="name">Full Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            placeholder="John Smith"
                        />
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
                    </div>
                </section>
                <section class="grouped">
                    <div class="form-group">
                    <label for="weight">Weight:</label>
                    <input
                        type="text"
                        id="weight"
                        name="weight"
                        required
                        placeholder="45 kg"
                    />
                    </div>
                    <div class="form-group">
                    <label for="height">height:</label>
                    <input
                        type="height"
                        id="height"
                        name="height"
                        required
                        placeholder="170 cm"
                    />
                    </div>
                </section>
                <section class="grouped">
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
                </section>
                <div class="form-group">
                <label for="note">Your Note:</label>
                <textarea
                    id="note"
                    name="note"
                    placeholder="Let me know what you think!"
                ></textarea>
                </div>
                <button type="submit" class="btn-primary medium">Submit</button>
            </fieldset>
        </form>
    </section>
`;