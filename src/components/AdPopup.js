import React, { useState, useEffect, useRef, useCallback } from "react";
import "./AdPopup.css";

const ADS = [
    { url: "https://clipperandscissors.com", name: "Clipper and Scissor" },
    { url: "https://sachinkhatri.web.app", name: "Sachin Khatri" },
    { url: "https://ketaharu.web.app", name: "Ketaharu" },
    { url: "https://attenai.com", name: "AttenAI" },
];

const AD_INTERVAL = 5 * 60 * 1000; // 5 minutes in milliseconds
const TIMER_DURATION = 20; // 20 seconds
const CLICK_THRESHOLD = 20; // Number of clicks to trigger popup

export default function AdPopup() {
    // Load ad enabled state from localStorage, default to true
    const [adEnabled, setAdEnabled] = useState(() => {
        const saved = localStorage.getItem('harmonix_ad_enabled');
        return saved !== null ? saved === 'true' : true;
    });
    const [isVisible, setIsVisible] = useState(false);
    const [currentAdIndex, setCurrentAdIndex] = useState(0);
    const [timer, setTimer] = useState(TIMER_DURATION);
    const [closeAttempts, setCloseAttempts] = useState(0);
    const [canClose, setCanClose] = useState(false);
    const [clickCount, setClickCount] = useState(0);
    const intervalRef = useRef(null);
    const timerRef = useRef(null);
    const adIntervalRef = useRef(null);
    const clickCountRef = useRef(0);
    const isVisibleRef = useRef(false);

    // Save ad enabled state to localStorage when it changes
    useEffect(() => {
        localStorage.setItem('harmonix_ad_enabled', adEnabled.toString());
    }, [adEnabled]);

    // Update ref when isVisible changes
    useEffect(() => {
        isVisibleRef.current = isVisible;
    }, [isVisible]);

    // Function to show the popup
    const showPopup = useCallback(() => {
        if (isVisibleRef.current) return; // Don't show if already visible
        setIsVisible(true);
        setCloseAttempts(0);
        setCanClose(false);
        setTimer(TIMER_DURATION);
        clickCountRef.current = 0; // Reset click count
        setClickCount(0);
    }, []);

    // Track clicks on the document (only if ads are enabled)
    useEffect(() => {
        if (!adEnabled) return;

        const handleClick = (e) => {
            // Don't count clicks on the popup itself or buttons
            if (e.target.closest('.ad-popup-overlay') || 
                e.target.closest('button') || 
                e.target.closest('a') ||
                e.target.tagName === 'BUTTON' ||
                e.target.tagName === 'A') {
                return;
            }

            if (!isVisibleRef.current) {
                clickCountRef.current += 1;
                setClickCount(clickCountRef.current);

                // Show popup if click threshold is reached
                if (clickCountRef.current >= CLICK_THRESHOLD) {
                    showPopup();
                }
            }
        };

        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [showPopup, adEnabled]);

    // Set up time-based popup trigger (only if ads are enabled)
    useEffect(() => {
        if (!adEnabled) {
            // Clear any existing timeout if ads are disabled
            if (adIntervalRef.current) {
                clearTimeout(adIntervalRef.current);
                adIntervalRef.current = null;
            }
            return;
        }

        // Clear any existing timeout
        if (adIntervalRef.current) {
            clearTimeout(adIntervalRef.current);
        }

        // Show first ad after 5 minutes (only if not already visible)
        if (!isVisible) {
            adIntervalRef.current = setTimeout(() => {
                if (!isVisibleRef.current && adEnabled) {
                    showPopup();
                }
            }, AD_INTERVAL);
        }

        return () => {
            if (adIntervalRef.current) clearTimeout(adIntervalRef.current);
            if (intervalRef.current) clearInterval(intervalRef.current);
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isVisible, showPopup, adEnabled]);

    useEffect(() => {
        if (isVisible) {
            // Start countdown timer
            timerRef.current = setInterval(() => {
                setTimer((prev) => {
                    if (prev <= 1) {
                        setCanClose(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => {
                if (timerRef.current) clearInterval(timerRef.current);
            };
        }
    }, [isVisible]);

    const handleClose = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (!canClose) return;

        // Check if this is the X button (direct close) or the regular close button
        const isXButton = e.target.classList.contains('ad-popup-x') || 
                          e.target.closest('.ad-popup-x');

        if (isXButton) {
            // X button: close directly
            setIsVisible(false);
            setCloseAttempts(0);
            setCanClose(false);
            setTimer(TIMER_DURATION);
            clickCountRef.current = 0; // Reset click count
            setClickCount(0);

            // Move to next ad
            setCurrentAdIndex((prev) => (prev + 1) % ADS.length);

            // Schedule next ad
            if (adIntervalRef.current) {
                clearTimeout(adIntervalRef.current);
            }
            adIntervalRef.current = setTimeout(() => {
                if (!isVisibleRef.current) {
                    showPopup();
                }
            }, AD_INTERVAL);
        } else if (closeAttempts === 0) {
            // First click on regular button: open the link
            window.open(ADS[currentAdIndex].url, "_blank");
            setCloseAttempts(1);
        } else {
            // Second click on regular button: close the popup
            setIsVisible(false);
            setCloseAttempts(0);
            setCanClose(false);
            setTimer(TIMER_DURATION);
            clickCountRef.current = 0; // Reset click count
            setClickCount(0);

            // Move to next ad
            setCurrentAdIndex((prev) => (prev + 1) % ADS.length);

            // Schedule next ad
            if (adIntervalRef.current) {
                clearTimeout(adIntervalRef.current);
            }
            adIntervalRef.current = setTimeout(() => {
                if (!isVisibleRef.current) {
                    showPopup();
                }
            }, AD_INTERVAL);
        }
    };

    const handleAdClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        // Clicking the ad itself opens the link
        window.open(ADS[currentAdIndex].url, "_blank");
    };

    const toggleAdEnabled = () => {
        setAdEnabled(prev => !prev);
        // If disabling, close any open popup
        if (adEnabled && isVisible) {
            setIsVisible(false);
            setCloseAttempts(0);
            setCanClose(false);
            setTimer(TIMER_DURATION);
            clickCountRef.current = 0;
            setClickCount(0);
        }
    };

    // Don't render popup if ads are disabled
    if (!adEnabled && !isVisible) {
        return (
            <button
                type="button"
                className="ad-toggle-btn"
                onClick={toggleAdEnabled}
                title={adEnabled ? "Disable Ads" : "Enable Ads"}
                aria-label={adEnabled ? "Disable Ads" : "Enable Ads"}
            >
                {adEnabled ? "🔔" : "🔕"}
            </button>
        );
    }

    if (!isVisible) {
        return (
            <>
                <button
                    type="button"
                    className="ad-toggle-btn"
                    onClick={toggleAdEnabled}
                    title={adEnabled ? "Disable Ads" : "Enable Ads"}
                    aria-label={adEnabled ? "Disable Ads" : "Enable Ads"}
                >
                    {adEnabled ? "🔔" : "🔕"}
                </button>
            </>
        );
    }

    const currentAd = ADS[currentAdIndex];

    return (
        <>
            {/* Ad Toggle Button - Fixed position */}
            <button
                type="button"
                className="ad-toggle-btn"
                onClick={toggleAdEnabled}
                title={adEnabled ? "Disable Ads" : "Enable Ads"}
                aria-label={adEnabled ? "Disable Ads" : "Enable Ads"}
            >
                {adEnabled ? "🔔" : "🔕"}
            </button>
            <div className="ad-popup-overlay">
                <div className="ad-popup-container">
                <div className="ad-popup-header" onClick={(e) => e.stopPropagation()}>
                    {canClose && (
                        <button
                            type="button"
                            className="ad-popup-x"
                            onClick={handleClose}
                            aria-label="Close Popup"
                            title="Close"
                        >
                            ×
                        </button>
                    )}
                    <div className="ad-popup-timer">
                        {canClose ? (
                            <span className="ad-timer-ready">Ready to close</span>
                        ) : (
                            <span className="ad-timer-countdown">Please wait {timer}s</span>
                        )}
                    </div>
                    <button
                        type="button"
                        className={`ad-popup-close ${canClose ? "enabled" : "disabled"}`}
                        onClick={handleClose}
                        disabled={!canClose}
                        aria-label={closeAttempts === 0 ? "Visit Site" : "Close Popup"}
                    >
                        {closeAttempts === 0 ? "Visit Site" : "Close"}
                    </button>
                </div>
                <div className="ad-popup-content" onClick={handleAdClick}>
                    <div className="ad-popup-badge">Advertisement</div>
                    <h3 className="ad-popup-title">{currentAd.name}</h3>
                    <p className="ad-popup-url">{currentAd.url}</p>
                    <div className="ad-popup-click-hint">Click to visit website</div>
                </div>
            </div>
        </div>
        </>
    );
}

