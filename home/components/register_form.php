
<form id="contact" name="contact"  autocomplete="off">
    <div class="input_row">
        <div class="reg_form_div">
            <label class="reg_label" for ="reg_nickname">Nickname</label>
            <input placeholder="Nickname" maxlength="30" type="text" name="nickname" id="reg_nickname" tabindex="2" autofocus />
        </div>
        <div id="name-error" class="error"></div>
    </div>
    <div class="input_row">
    <div class="reg_form_div">
        <label  class="reg_label" for = "reg_email">Email</label>
        <input placeholder="Email" type="email" name="email" id="reg_email" tabindex="3" autofocus />

    </div>
    <div id="email-error" class="error"></div>
    </div>
    <div class="input_row">
        <div class="reg_form_div">
            <label  class="reg_label" for = "reg_occupation">Occupation</label>
            <input placeholder="Occupation" maxlength="40" type="text" name="occupation" id="reg_occupation" tabindex="4" autofocus />
        </div>
    </div>
    <div class="input_row">
        <div class="reg_form_div">
            <label  class="reg_label" for="reg_about_me">About me</label>
            <textarea placeholder="About me" maxlength="120" name="about_me" id="reg_about_me" tabindex="5" autofocus></textarea>
        </div>
    </div>
    <div class="input_row">
    <div class="reg_form_div">
        <label class="reg_label"  for="password">Password</label>
        <input type="password" name="password" id="password" />

    </div>
    <div id="password-error" class="error"></div>
    </div>
    <div class="input_row">
    <div class="reg_form_div">
        <label class="reg_label"  for="confirm_password">Confirm Password</label>
        <input type="password" name="confirm_password" id="confirm_password" />

    </div>
    <div id="confirm_password-error" class="error"></div>
    </div>
    <div class="input_row">
        <div class="reg_form_div">
            <button type="submit" name="submit" id="reg_submit" tabindex="10">Send</button>
        </div>
    </div>
</form>

