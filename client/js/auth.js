HDT.getCurrentUser().then(user => {
    if (user) {
        window.location = "/";
    }
});

$("#tab-login").on("click", () => {
    $("#window-content-login").removeClass("hidden");
    $("#tab-login").addClass("active");
    $("#window-content-register").addClass("hidden");
    $("#tab-register").removeClass("active");
    window.location.hash = "#login";
    document.title = "로그인";
});

$("#tab-register").on("click", () => {
    $("#window-content-login").addClass("hidden");
    $("#tab-login").removeClass("active");
    $("#window-content-register").removeClass("hidden");
    $("#tab-register").addClass("active");
    window.location.hash = "#register";
    document.title = "계정 등록";
});

$("#input-register-password2").on("change", () => {
    if ($("#input-register-password").val() != $("#input-register-password2").val()) {
        $("#input-register-password2")[0].setCustomValidity("비밀번호가 일치하지 않습니다.");
    } else {
        $("#input-register-password2")[0].setCustomValidity("");
    }
})

$("#input-login-password").on("keypress", (e) => {
    if (e.key === "Enter") {
        $("#button-login").trigger("click");
    }
})

$("#button-login").on("click", () => {
    // Get the email and password
    let email = $("#input-login-email").val();
    let password = $("#input-login-password").val();

    // Validate the email and password
    $("#form-login").addClass("validated");
    if (!$("#form-login")[0].reportValidity()) {
        return;
    }

    // Fire ajax request
    $A.post("/api/auth/login", { body: { email: email, password: password } })
        .then(async res => {
            if (res.status === 200) {
                let data = await res.json();
                // TODO: Save the user data(meta) to local storage
                window.location = "/projects";
            } else if (res.status === 401) {
                alert("이메일 또는 비밀번호가 잘못되었습니다.");
            } else {
                // TODO: more proper error handling
                alert(res.error);
            }
        })
});

$("#button-register").on("click", () => {
    // Get email, name, password, and password confirmation
    let email = $("#input-register-email").val();
    let name = $("#input-register-name").val();
    let password = $("#input-register-password").val();
    let passwordConfirmation = $("#input-register-password2").val();

    // Validate the email, name, password, and password confirmation
    $("#form-register").addClass("validated");
    if (!$("#form-register")[0].reportValidity()) {
        return;
    }

    // Fire ajax request
    $A.post("/api/auth/register", { body: { email: email, name: name, password: password } })
        .then(async res => {
            if (res.status === 200) {
                console.log("OK!");
            } else if (res.status === 400) {
                let data = await res.json();
                alert("계정 등록 실패: " + data.error);
            } else {
                alert(res.error);
            }
        })
});

// Check the hash and set the tab
$(window).on("hashchange", () => {
    if (location.hash == "#register") {
        $("#tab-register").trigger("click");
    } else if (location.hash == "#login") {
        $("#tab-login").trigger("click");
    }
});

if (location.hash == "#register") {
    $("#tab-register").trigger("click");
}

HDT.fileLoaded("auth.js");