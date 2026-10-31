// @ts-check

/**
 * @typedef {Object} SocialLinks
 * @property {string} [osuProfileUrl]
 * @property {string} [tiktokUrl]
 * @property {string} [xUrl]
 * @property {string} [discordTag]
 */

/**
 * @typedef {Object} ProfileConfig
 * @property {string} username
 * @property {string} [lastUpdate]
 * @property {string} [avatarUrl]
 * @property {string} [avatarFallback]
 * @property {SocialLinks} [socials]
 */

/**
 * @typedef {Object} TabletConfig
 * @property {string} device
 * @property {string} area
 * @property {string} driverName
 * @property {string} [driverDownloadUrl]
 * @property {string} [previewImage]
 * @property {string} [previewAlt]
 */

/**
 * @typedef {Object} KeyboardConfig
 * @property {string} device
 * @property {string} keybind
 * @property {string} actuationPoint
 * @property {string} rapidTrigger
 * @property {string} [previewImage]
 * @property {string} [previewAlt]
 */

/**
 * @typedef {Object} MonitorConfig
 * @property {string} device
 * @property {string} refreshRate
 * @property {string} resolution
 */

/**
 * @typedef {Object} AudioConfig
 * @property {string} device
 * @property {string} connector
 * @property {string} type
 */

/**
 * @typedef {Object} LabelValue
 * @property {string} label
 * @property {string} value
 */

/**
 * @typedef {Object} SkinSlide
 * @property {string} src
 * @property {string} [label]
 * @property {string} [alt]
 */

/**
 * @typedef {Object} SkinItem
 * @property {string} name
 * @property {boolean} [current]
 * @property {boolean} [isPlaceholder]
 * @property {string} [badgeText]
 * @property {string} [note]
 * @property {LabelValue[]} [details]
 * @property {string} downloadUrl
 * @property {SkinSlide[]} slides
 */

/**
 * @typedef {Object} SkinsConfig
 * @property {string} [driveFolderUrl]
 * @property {SkinItem[]} items
 */

/**
 * @typedef {Object} OverlayItem
 * @property {string} name
 * @property {string} [description]
 * @property {string} [downloadUrl]
 * @property {string} [videoPreviewUrl]
 * @property {string} [sourceRefUrl]
 * @property {string} [sourceRefName]
 * @property {LabelValue[]} [specs]
 * @property {string} [previewImg]
 * @property {string} [previewVideo]
 */

/**
 * @typedef {Object} OverlaysConfig
 * @property {string} [githubUrl]
 * @property {string} [tosuDownloadUrl]
 * @property {OverlayItem[]} items
 */

/**
 * @typedef {Object} SiteConfig
 * @property {ProfileConfig} profile
 * @property {TabletConfig} [tablet]
 * @property {KeyboardConfig} [keyboard]
 * @property {MonitorConfig} [monitor]
 * @property {AudioConfig} [audio]
 * @property {SkinsConfig} [skins]
 * @property {OverlaysConfig} [overlays]
 */

export {};
