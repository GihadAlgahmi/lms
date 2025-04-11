import { initRTL, watchLanguageChanges } from '@/utils/rtl'

export default {
    install(app) {
        // Initialize RTL on plugin installation
        initRTL()
        watchLanguageChanges()

        // Add RTL mixin to all components
        app.mixin({
            mounted() {
                // Ensure RTL is applied when component is mounted
                initRTL()
            }
        })
    }
} 