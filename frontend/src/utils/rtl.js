// RTL Support Utilities
export const RTL_LANGUAGES = ['ar', 'he', 'fa', 'ps']

export const isRTL = (lang) => {
    return RTL_LANGUAGES.includes(lang)
}

export const updateRTLSettings = (lang) => {
    const isRTL = RTL_LANGUAGES.includes(lang)
    document.body.dir = isRTL ? 'rtl' : 'ltr'
    document.body.style.direction = isRTL ? 'rtl' : 'ltr'
    document.body.style.textAlign = isRTL ? 'right' : 'left'
    
    // Add/remove RTL class to body
    if (isRTL) {
        document.body.classList.add('rtl')
    } else {
        document.body.classList.remove('rtl')
    }

    // Store the current language and RTL state
    localStorage.setItem('lang', lang)
    localStorage.setItem('isRTL', isRTL)
}

// Initialize RTL based on current language
export const initRTL = () => {
    const currentLang = localStorage.getItem('lang') || 'en'
    const isRTL = localStorage.getItem('isRTL') === 'true'
    
    // Apply RTL settings
    document.body.dir = isRTL ? 'rtl' : 'ltr'
    document.body.style.direction = isRTL ? 'rtl' : 'ltr'
    document.body.style.textAlign = isRTL ? 'right' : 'left'
    
    if (isRTL) {
        document.body.classList.add('rtl')
    } else {
        document.body.classList.remove('rtl')
    }
}

// Watch for language changes
export const watchLanguageChanges = () => {
    // Listen for storage events (changes from other tabs/windows)
    window.addEventListener('storage', (e) => {
        if (e.key === 'lang' || e.key === 'isRTL') {
            initRTL()
        }
    })

    // Listen for language changes in the current window
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'dir') {
                const isRTL = document.body.dir === 'rtl'
                localStorage.setItem('isRTL', isRTL)
            }
        })
    })

    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['dir']
    })
} 