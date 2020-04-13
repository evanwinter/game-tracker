// Import required firebase modules
import "firebase/app"
import "firebase/auth"
import "firebase/firestore"

// Detect current device characteristics
import "current-device"

// Import global styles
import "@styles/index.scss"

/**
 * Reload application when there's an updated version deployed
 */
export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    `There's fresh data to show. Reload to display the latest version?`
  )
  if (answer === true) {
    window.location.reload()
  }
}
