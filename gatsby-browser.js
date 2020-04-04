import "firebase/app"
import "firebase/firestore"
import "@styles/index.scss"

/**
 * Reload application when there's an updated version deployed
 */
export const onServiceWorkerUpdateReady = () => {
	const answer = window.confirm(
		`This application has been updated. ` +
			`Reload to display the latest version?`,
	)
	if (answer === true) {
		window.location.reload()
	}
}
