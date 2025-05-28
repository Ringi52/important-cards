// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide icons
  if (typeof lucide !== "undefined") {
    lucide.createIcons()
  }

  // Set up language switcher
  const languageSelect = document.getElementById("language-select")
  if (languageSelect) {
    languageSelect.addEventListener("change", function () {
      setLanguage(this.value)
    })
  }

  // Update page language on load
  updatePageLanguage()
})

// Utility functions
function showToast(message, type = "info") {
  // Simple toast notification
  const toast = document.createElement("div")
  toast.className = `alert alert-${type}`
  toast.style.position = "fixed"
  toast.style.top = "20px"
  toast.style.right = "20px"
  toast.style.zIndex = "1000"
  toast.style.maxWidth = "300px"
  toast.textContent = message

  document.body.appendChild(toast)

  setTimeout(() => {
    toast.remove()
  }, 3000)
}

function playSound(url, volume = 0.2) {
  try {
    const audio = new Audio(url)
    audio.volume = volume
    audio.play().catch((e) => console.error("Error playing sound:", e))
  } catch (e) {
    console.error("Error creating audio:", e)
  }
}

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)]
}

function saveToLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.error("Error saving to localStorage:", e)
  }
}

function loadFromLocalStorage(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (e) {
    console.error("Error loading from localStorage:", e)
    return defaultValue
  }
}

// Copy to clipboard function
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text)
    showToast(t("copySuccess") || "Copied to clipboard!", "success")
    return true
  } catch (err) {
    console.error("Failed to copy text: ", err)
    showToast(t("copyError") || "Failed to copy text", "error")
    return false
  }
}

// Paste from clipboard function
async function pasteFromClipboard() {
  try {
    const text = await navigator.clipboard.readText()
    return text
  } catch (err) {
    console.error("Failed to paste text: ", err)
    showToast(t("pasteError") || "Failed to paste text. Use Ctrl+V instead.", "error")
    return null
  }
}

// Dummy functions to avoid errors.  These would normally be defined elsewhere.
function setLanguage(lang) {
  console.log("setLanguage called with:", lang)
}

function updatePageLanguage() {
  console.log("updatePageLanguage called")
}

function t(key) {
  console.log("t called with:", key)
  return key // Return the key itself as a placeholder translation
}
