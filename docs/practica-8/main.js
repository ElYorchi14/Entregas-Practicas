const d = document;
const $form = d.querySelector("#register-form");
const $nameInput = d.querySelector("#name");
const $nameError = d.querySelector("#name-error");
const $emailInput = d.querySelector("#email");
const $emailError = d.querySelector("#email-error");
const $passwordInput = d.querySelector("#password");
const $passwordError = d.querySelector("#password-error");
const $confirmPasswordInput = d.querySelector("#confirm-password");
const $confirmPasswordError = d.querySelector("#confirm-password-error");
const $successMessage = d.querySelector("#success-message");
const $errorsMessages = d.querySelectorAll(".error");
const $loader = d.querySelector("#loader");

// Función de Validación del Formulario
function validateForm(e) {
  e.preventDefault();
  $errorsMessages.forEach((el) => (el.textContent = ""));
  let isValid = true;

  // Validar Nombre (solo letras y espacios)
  let namePattern = /^[A-Za-z\s]+$/;
  if ($nameInput.value.trim() === "") {
    $nameError.textContent = "El nombre es obligatorio";
    isValid = false;
  } else if (!namePattern.test($nameInput.value.trim())) {
    $nameError.textContent = "El nombre solo puede contener letras y espacios";
    isValid = false;
  }

  // Validar Correo
  let emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if ($emailInput.value.trim() === "") {
    $emailError.textContent = "El correo es obligatorio";
    isValid = false;
  } else if (!emailPattern.test($emailInput.value.trim())) {
    $emailError.textContent = "El formato del correo es inválido";
    isValid = false;
  }

  // Validar Contraseña
  let passwordPattern =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if ($passwordInput.value.trim() === "") {
    $passwordError.textContent = "La contraseña es obligatoria";
    isValid = false;
  } else if (!passwordPattern.test($passwordInput.value.trim())) {
    $passwordError.textContent =
      "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial";
    isValid = false;
  }

  // Validar Confirmación de Contraseña
  if ($confirmPasswordInput.value.trim() === "") {
    $confirmPasswordError.textContent = "Debe confirmar la contraseña";
    isValid = false;
  } else if (
    $confirmPasswordInput.value.trim() !== $passwordInput.value.trim()
  ) {
    $confirmPasswordError.textContent = "Las contraseñas no coinciden";
    isValid = false;
  }

  // Enviar Formulario con Loader
  if (isValid) {
    $loader.style.display = "block";
    setTimeout(() => {
      $loader.style.display = "none";
      $successMessage.textContent = "Formulario enviado exitosamente";
      $form.reset();
      setTimeout(() => {
        $successMessage.textContent = "";
      }, 3000);
    }, 5000);
  }
}

$form.addEventListener("submit", validateForm);
